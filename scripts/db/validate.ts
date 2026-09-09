/**
 * Deep local validation of supabase/migrations/* against an in-process Postgres
 * (pglite — no Docker). Applies every migration + seed, then checks structure
 * AND Row Level Security enforcement (cross-user isolation, anon access).
 *
 *   npm run db:validate
 *
 * This is NOT the hosted database. Once a project is linked, apply for real
 * with `npx supabase db push` and regenerate types with `npm run db:types`.
 */
import { createTestDb } from "../../tests/db/harness";

let failures = 0;

function check(label: string, ok: boolean, detail = "") {
  const mark = ok ? "  ok  " : " FAIL ";
  if (!ok) failures += 1;
  console.log(`[${mark}] ${label}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  console.log("Applying migrations to pglite…\n");
  const db = await createTestDb();

  // --- structure ---------------------------------------------------------
  const tables = (
    await db.pg.query<{ tablename: string }>(
      "select tablename from pg_tables where schemaname = 'public' order by tablename",
    )
  ).rows.map((r) => r.tablename);
  check(
    "22 public tables created",
    tables.length === 22,
    `${tables.length} tables`,
  );

  const noRls = (
    await db.pg.query<{ relname: string }>(
      `select relname from pg_class
       where relnamespace = 'public'::regnamespace and relkind = 'r'
         and not relrowsecurity`,
    )
  ).rows.map((r) => r.relname);
  check("RLS enabled on every table", noRls.length === 0, noRls.join(", "));

  const tablesWithPolicies = new Set(
    (
      await db.pg.query<{ tablename: string }>(
        "select distinct tablename from pg_policies where schemaname = 'public'",
      )
    ).rows.map((r) => r.tablename),
  );
  const missingPolicies = tables.filter((t) => !tablesWithPolicies.has(t));
  check(
    "policy defined for every table",
    missingPolicies.length === 0,
    missingPolicies.join(", "),
  );

  const policyCount = (
    await db.pg.query<{ n: number }>(
      "select count(*)::int as n from pg_policies where schemaname = 'public'",
    )
  ).rows[0]!.n;
  console.log(`         (${policyCount} policies total)\n`);

  // --- reference data ---------------------------------------------------
  const levels = (
    await db.pg.query<{ code: string; is_free: boolean }>(
      "select code, is_free from public.levels order by sort_order",
    )
  ).rows;
  check(
    "CEFR levels seeded, A1 free / A2–C1 premium",
    levels.length === 5 &&
      levels[0]?.code === "A1" &&
      levels[0]?.is_free === true &&
      levels.slice(1).every((l) => !l.is_free),
  );

  // --- curriculum seed (content/curriculum -> supabase/seed.sql) --------
  const counts = (
    await db.pg.query<{ tbl: string; n: number }>(
      `select 'vocabulary' as tbl, count(*)::int n from public.vocabulary
       union all select 'grammar_points', count(*)::int from public.grammar_points
       union all select 'grammar_examples', count(*)::int from public.grammar_examples
       union all select 'units', count(*)::int from public.units
       union all select 'lessons', count(*)::int from public.lessons
       union all select 'lesson_items', count(*)::int from public.lesson_items
       union all select 'lesson_item_vocabulary', count(*)::int from public.lesson_item_vocabulary
       union all select 'lesson_item_grammar', count(*)::int from public.lesson_item_grammar`,
    )
  ).rows;
  const c = Object.fromEntries(counts.map((r) => [r.tbl, r.n]));
  check(
    "A1.1 unit seeded with 4 published lessons",
    (
      await db.pg.query<{ n: number }>(
        `select count(*)::int n from public.lessons l
         join public.units u on u.id = l.unit_id
         where u.slug = 'erste-schritte' and l.is_published`,
      )
    ).rows[0]!.n === 4,
  );
  check("vocabulary seeded", (c.vocabulary ?? 0) >= 20, `${c.vocabulary} rows`);
  check(
    "grammar points seeded",
    (c.grammar_points ?? 0) === 4,
    `${c.grammar_points} rows`,
  );
  check(
    "grammar examples seeded",
    (c.grammar_examples ?? 0) >= 8,
    `${c.grammar_examples} rows`,
  );
  check(
    "lesson items seeded",
    (c.lesson_items ?? 0) >= 30,
    `${c.lesson_items} rows`,
  );
  check(
    "lesson<->vocabulary and lesson<->grammar links seeded",
    (c.lesson_item_vocabulary ?? 0) > 0 && (c.lesson_item_grammar ?? 0) > 0,
    `${c.lesson_item_vocabulary} vocab / ${c.lesson_item_grammar} grammar links`,
  );
  check(
    "every lesson_items.content parses (jsonb objects, not null)",
    (
      await db.pg.query<{ n: number }>(
        "select count(*)::int n from public.lesson_items where jsonb_typeof(content) <> 'object'",
      )
    ).rows[0]!.n === 0,
  );

  // running the generated seed twice must not duplicate rows
  const { readFileSync } = await import("node:fs");
  const path = await import("node:path");
  const seedPath = path.join(process.cwd(), "supabase", "seed.sql");
  await db.pg.exec(readFileSync(seedPath, "utf8"));
  const vocabAfter = (
    await db.pg.query<{ n: number }>(
      "select count(*)::int n from public.vocabulary",
    )
  ).rows[0]!.n;
  check(
    "seed is idempotent (re-run adds nothing)",
    vocabAfter === c.vocabulary,
  );

  // --- new-user bootstrap ---------------------------------------------
  const alice = await db.createUser({ display_name: "Alice" });
  const bob = await db.createUser();
  const bootstrapped = (
    await db.pg.query<{ n: number }>(
      "select count(*)::int as n from public.learner_profiles where id = $1",
      [alice],
    )
  ).rows[0]!.n;
  check("handle_new_user seeds profile + learner_profile", bootstrapped === 1);

  // --- RLS enforcement ------------------------------------------------
  const unit = (
    await db.pg.query<{ id: string }>(
      `insert into public.units (level_code, slug, title, sort_order, is_published)
       values ('A1', 'val-unit', 'Val Unit', 80, true) returning id`,
    )
  ).rows[0]!.id;
  const lesson = (
    await db.pg.query<{ id: string }>(
      `insert into public.lessons (unit_id, slug, title, sort_order, is_published)
       values ($1, 'val-lesson', 'Val Lesson', 1, true) returning id`,
      [unit],
    )
  ).rows[0]!.id;
  await db.pg.query(
    `insert into public.units (level_code, slug, title, sort_order, is_published)
     values ('A1', 'val-draft', 'Draft', 81, false)`,
  );

  await db.asUser(alice, async (tx) => {
    await tx.query(
      `insert into public.user_lesson_progress (user_id, lesson_id, status)
       values ($1, $2, 'in_progress')`,
      [alice, lesson],
    );
  });

  const aliceSees = await db.asUser(alice, (tx) =>
    tx
      .query<{ n: number }>(
        "select count(*)::int as n from public.user_lesson_progress",
      )
      .then((r) => r.rows[0]!.n),
  );
  check("owner sees their own progress row", aliceSees === 1);

  const bobSees = await db.asUser(bob, (tx) =>
    tx
      .query<{ n: number }>(
        "select count(*)::int as n from public.user_lesson_progress",
      )
      .then((r) => r.rows[0]!.n),
  );
  check("another user sees none of it", bobSees === 0);

  let bobWriteBlocked = false;
  await db.asUser(bob, async (tx) => {
    try {
      await tx.query(
        `insert into public.user_lesson_progress (user_id, lesson_id, status)
         values ($1, $2, 'in_progress')`,
        [alice, lesson],
      );
    } catch (e) {
      bobWriteBlocked = /row-level security/i.test((e as Error).message);
    }
  });
  check("a user cannot write rows owned by someone else", bobWriteBlocked);

  const anonProgress = await db.asAnon((tx) =>
    tx
      .query<{ n: number }>(
        "select count(*)::int as n from public.user_lesson_progress",
      )
      .then((r) => r.rows[0]!.n),
  );
  check("anon sees no private learning data", anonProgress === 0);

  const anonView = await db.asAnon(async (tx) => ({
    levels: (
      await tx.query<{ n: number }>(
        "select count(*)::int as n from public.levels",
      )
    ).rows[0]!.n,
    unitSlugs: (
      await tx.query<{ slug: string }>(
        "select slug from public.units order by slug",
      )
    ).rows.map((r) => r.slug),
    ersteSchritteLessons: (
      await tx.query<{ n: number }>(
        `select count(*)::int as n from public.lessons l
         join public.units u on u.id = l.unit_id where u.slug = 'erste-schritte'`,
      )
    ).rows[0]!.n,
    ersteSchritteItems: (
      await tx.query<{ n: number }>(
        `select count(*)::int as n from public.lesson_items i
         join public.lessons l on l.id = i.lesson_id
         join public.units u on u.id = l.unit_id where u.slug = 'erste-schritte'`,
      )
    ).rows[0]!.n,
  }));
  check(
    "anon reads reference + published content, not drafts",
    anonView.levels === 5 &&
      anonView.unitSlugs.includes("erste-schritte") &&
      anonView.unitSlugs.includes("val-unit") &&
      !anonView.unitSlugs.includes("val-draft") &&
      !anonView.unitSlugs.includes("mein-alltag") &&
      anonView.ersteSchritteLessons === 4 &&
      anonView.ersteSchritteItems > 20,
    JSON.stringify(anonView),
  );

  await db.close();

  console.log(
    failures === 0
      ? "\nAll schema checks passed."
      : `\n${failures} check(s) FAILED.`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("\nvalidation crashed:", error);
  process.exit(1);
});
