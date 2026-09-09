import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite, type Transaction } from "@electric-sql/pglite";

/**
 * Spins up an in-process Postgres (pglite — WASM, no Docker) with a minimal
 * Supabase `auth` stub, then applies every migration in `supabase/migrations`
 * plus `supabase/seed.sql`. Used to validate the schema/RLS locally.
 *
 * It is NOT the hosted database and skips a few Supabase-managed pieces
 * (real auth.users columns, storage, the JWT). Enough to catch broken SQL,
 * bad constraints and RLS mistakes.
 *
 * `asUser` / `asAnon` run their callback inside a transaction with
 * `SET LOCAL ROLE` + a `SET LOCAL` JWT-sub GUC, so role context is scoped and
 * reverts automatically.
 */

const root = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../..",
);
const migrationsDir = path.join(root, "supabase", "migrations");
const seedPath = path.join(root, "supabase", "seed.sql");

const AUTH_STUB = `
create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  raw_user_meta_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

do $$
begin
  if not exists (select from pg_roles where rolname = 'anon') then create role anon; end if;
  if not exists (select from pg_roles where rolname = 'authenticated') then create role authenticated; end if;
  if not exists (select from pg_roles where rolname = 'service_role') then create role service_role; end if;
end
$$;

grant usage on schema auth to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;

-- Minimal stand-in for Supabase's auth.uid(): reads a session GUC.
create or replace function auth.uid()
returns uuid language sql stable
as $fn$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $fn$;
`;

type Runner = Pick<Transaction, "query" | "exec">;

export type TestDb = {
  pg: PGlite;
  /** Insert an auth.users row and return its id. */
  createUser(meta?: Record<string, unknown>): Promise<string>;
  /** Run a callback as `authenticated` with a given uid (transaction-scoped). */
  asUser<T>(uid: string, fn: (tx: Runner) => Promise<T>): Promise<T>;
  /** Run a callback as `anon` with no uid (transaction-scoped). */
  asAnon<T>(fn: (tx: Runner) => Promise<T>): Promise<T>;
  close(): Promise<void>;
};

async function applySql(pg: PGlite, label: string, sql: string) {
  try {
    await pg.exec(sql);
  } catch (error) {
    throw new Error(`${label} failed: ${(error as Error).message}`, {
      cause: error,
    });
  }
}

export async function createTestDb(): Promise<TestDb> {
  const pg = new PGlite();
  await applySql(pg, "auth stub", AUTH_STUB);

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    await applySql(
      pg,
      `migration ${file}`,
      readFileSync(path.join(migrationsDir, file), "utf8"),
    );
  }
  await applySql(pg, "seed.sql", readFileSync(seedPath, "utf8"));

  // On hosted Supabase, table privileges for anon/authenticated come from
  // schema default privileges. pglite has neither, and its ACL cache can drop
  // entries from the migrations' multi-table GRANTs under load — so re-assert
  // them here (RLS still does all the actual isolation).
  await applySql(
    pg,
    "test grants",
    `grant select, insert, update, delete on all tables in schema public to authenticated;
     grant select on all tables in schema public to anon;`,
  );

  function runAs<T>(
    role: "authenticated" | "anon",
    uid: string | null,
    fn: (tx: Runner) => Promise<T>,
  ): Promise<T> {
    return pg.transaction(async (tx) => {
      await tx.exec(`set local role ${role}`);
      await tx.query("select set_config('request.jwt.claim.sub', $1, true)", [
        uid ?? "",
      ]);
      return fn(tx);
    });
  }

  return {
    pg,
    async createUser(meta = {}) {
      const res = await pg.query<{ id: string }>(
        "insert into auth.users (raw_user_meta_data) values ($1) returning id",
        [JSON.stringify(meta)],
      );
      return res.rows[0]!.id;
    },
    asUser(uid, fn) {
      return runAs("authenticated", uid, fn);
    },
    asAnon(fn) {
      return runAs("anon", null, fn);
    },
    async close() {
      await pg.close();
    },
  };
}
