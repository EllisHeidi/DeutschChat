// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestDb, type TestDb } from "./harness";

/**
 * Structural validation of the migrations: they apply cleanly, every table has
 * RLS + a policy, enums and seed rows are correct, triggers and check
 * constraints work. Cross-user RLS *enforcement* is exercised separately by
 * `npm run db:validate` (`scripts/db/validate.ts`) — pglite's role switching is
 * unreliable inside the vitest worker.
 */

const EXPECTED_TABLES = [
  "chat_scenarios",
  "conversation_messages",
  "conversations",
  "grammar_examples",
  "grammar_points",
  "learner_profiles",
  "learning_observations",
  "lesson_item_grammar",
  "lesson_item_vocabulary",
  "lesson_items",
  "lessons",
  "levels",
  "message_corrections",
  "profiles",
  "skills",
  "units",
  "user_daily_activity",
  "user_grammar_progress",
  "user_lesson_progress",
  "user_skill_progress",
  "user_vocabulary_progress",
  "vocabulary",
] as const;

let db: TestDb;

beforeAll(async () => {
  db = await createTestDb();
}, 30_000);

afterAll(async () => {
  await db?.close();
});

describe("migrations apply cleanly", () => {
  it("creates exactly the expected public tables", async () => {
    const res = await db.pg.query<{ tablename: string }>(
      "select tablename from pg_tables where schemaname = 'public' order by tablename",
    );
    expect(res.rows.map((r) => r.tablename)).toEqual([...EXPECTED_TABLES]);
  });

  it("enables Row Level Security on every public table", async () => {
    const res = await db.pg.query<{ relname: string; rls: boolean }>(
      `select relname, relrowsecurity as rls
       from pg_class
       where relnamespace = 'public'::regnamespace and relkind = 'r'`,
    );
    const withoutRls = res.rows.filter((r) => !r.rls).map((r) => r.relname);
    expect(withoutRls).toEqual([]);
  });

  it("defines at least one policy for every public table", async () => {
    const res = await db.pg.query<{ tablename: string }>(
      "select distinct tablename from pg_policies where schemaname = 'public'",
    );
    const withPolicies = new Set(res.rows.map((r) => r.tablename));
    const missing = EXPECTED_TABLES.filter((t) => !withPolicies.has(t));
    expect(missing).toEqual([]);
  });

  it("registers the core enums with their values", async () => {
    const values = async (name: string) => {
      const res = await db.pg.query<{ enumlabel: string }>(
        `select e.enumlabel from pg_enum e
         join pg_type t on t.oid = e.enumtypid
         where t.typname = $1 order by e.enumsortorder`,
        [name],
      );
      return res.rows.map((r) => r.enumlabel);
    };
    expect(await values("cefr_level")).toEqual(["A1", "A2", "B1", "B2", "C1"]);
    expect(await values("vocab_status")).toEqual([
      "new",
      "learning",
      "known",
      "needs_review",
    ]);
    expect(await values("grammar_status")).toEqual([
      "new",
      "learning",
      "weak",
      "mastered",
    ]);
  });
});

describe("reference data", () => {
  it("seeds the five CEFR levels with A1 free and the rest premium", async () => {
    const res = await db.pg.query<{ code: string; is_free: boolean }>(
      "select code, is_free from public.levels order by sort_order",
    );
    expect(res.rows).toEqual([
      { code: "A1", is_free: true },
      { code: "A2", is_free: false },
      { code: "B1", is_free: false },
      { code: "B2", is_free: false },
      { code: "C1", is_free: false },
    ]);
  });

  it("seeds the six skills", async () => {
    const res = await db.pg.query<{ n: number }>(
      "select count(*)::int as n from public.skills",
    );
    expect(res.rows[0]!.n).toBe(6);
  });
});

describe("new-user bootstrap", () => {
  it("creates a profile and learner_profile when an auth user is inserted", async () => {
    const uid = await db.createUser({ display_name: "Sofia" });

    const profile = await db.pg.query<{ display_name: string }>(
      "select display_name from public.profiles where id = $1",
      [uid],
    );
    expect(profile.rows[0]?.display_name).toBe("Sofia");

    const learner = await db.pg.query<{ current_level: string }>(
      "select current_level from public.learner_profiles where id = $1",
      [uid],
    );
    expect(learner.rows[0]?.current_level).toBe("A1");
  });
});

describe("constraints and triggers", () => {
  it("rejects an out-of-range mastery strength", async () => {
    const uid = await db.createUser();
    const vocab = await db.pg.query<{ id: string }>(
      "select id from public.vocabulary limit 1",
    );
    await expect(
      db.pg.query(
        `insert into public.user_vocabulary_progress (user_id, vocabulary_id, strength)
         values ($1, $2, 150)`,
        [uid, vocab.rows[0]!.id],
      ),
    ).rejects.toThrow(/check constraint/i);
  });

  it("requires a learning_observation to reference a subject", async () => {
    const uid = await db.createUser();
    await expect(
      db.pg.query(
        `insert into public.learning_observations (user_id, source, result)
         values ($1, 'lesson', 'incorrect')`,
        [uid],
      ),
    ).rejects.toThrow(/learning_observations_has_subject/i);
  });

  it("rejects an unknown enum value", async () => {
    await expect(
      db.pg.query(
        "insert into public.units (level_code, slug, title, sort_order) values ('A0', 'x', 'X', 1)",
      ),
    ).rejects.toThrow();
  });

  it("bumps updated_at on update via the shared trigger", async () => {
    const before = await db.pg.query<{ updated_at: string }>(
      "select updated_at from public.levels where code = 'A1'",
    );
    await new Promise((r) => setTimeout(r, 5));
    await db.pg.query(
      "update public.levels set description = description where code = 'A1'",
    );
    const after = await db.pg.query<{ updated_at: string }>(
      "select updated_at from public.levels where code = 'A1'",
    );
    expect(new Date(after.rows[0]!.updated_at).getTime()).toBeGreaterThan(
      new Date(before.rows[0]!.updated_at).getTime(),
    );
  });
});
