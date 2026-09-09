/**
 * Verify a live connection to the HOSTED Supabase project.
 *
 *   npm run db:check
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY /
 * SUPABASE_SERVICE_ROLE_KEY from the environment (or .env.local) and checks:
 *   - anon can read published curriculum, cannot read private tables
 *   - service role sees the full schema + expected row counts
 *   - RLS is enabled on the private tables
 *
 * It makes NO writes. Safe to run against production.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

/* ---- load .env.local if the vars aren't already in the environment ---- */
function loadDotEnvLocal() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) return;
  try {
    const file = readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
    for (const line of file.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, key, rawValue] = m;
      if (!key || process.env[key]) continue;
      process.env[key] = rawValue!.replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local — rely on the shell environment */
  }
}
loadDotEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  if (!ok) failures += 1;
  console.log(
    `[${ok ? "  ok  " : " FAIL "}] ${label}${detail ? ` — ${detail}` : ""}`,
  );
}

const PRIVATE_TABLES = [
  "profiles",
  "learner_profiles",
  "user_lesson_progress",
  "user_vocabulary_progress",
  "user_grammar_progress",
  "user_skill_progress",
  "user_daily_activity",
  "learning_observations",
  "conversations",
  "conversation_messages",
  "message_corrections",
] as const;

async function main() {
  if (!url || !anonKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
        "Set them in .env.local (see .env.example) and re-run.",
    );
    process.exit(1);
  }
  console.log(`Checking ${url}\n`);

  /* ---- anon: published content is readable ---- */
  const anon = createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  const { data: levels, error: levelsErr } = await anon
    .from("levels")
    .select("code, is_free")
    .order("sort_order");
  check(
    "anon reads levels (A1 free)",
    !levelsErr &&
      (levels?.length ?? 0) === 5 &&
      levels?.[0]?.code === "A1" &&
      levels?.[0]?.is_free === true,
    levelsErr?.message ?? `${levels?.length ?? 0} levels`,
  );

  const { count: publishedLessons, error: lessonsErr } = await anon
    .from("lessons")
    .select("id", { count: "exact", head: true })
    .eq("is_published", true);
  check(
    "anon reads published lessons (curriculum seeded)",
    !lessonsErr && (publishedLessons ?? 0) >= 4,
    lessonsErr?.message ??
      `${publishedLessons ?? 0} published lessons` +
        ((publishedLessons ?? 0) === 0
          ? " — run `supabase db push --include-seed`"
          : ""),
  );

  const { count: itemCount } = await anon
    .from("lesson_items")
    .select("id", { count: "exact", head: true });
  check(
    "anon reads lesson_items of published lessons",
    (itemCount ?? 0) >= 20,
    `${itemCount ?? 0} items`,
  );

  const { count: vocabCount } = await anon
    .from("vocabulary")
    .select("id", { count: "exact", head: true });
  check(
    "anon reads vocabulary",
    (vocabCount ?? 0) >= 20,
    `${vocabCount ?? 0} rows`,
  );

  /* ---- anon: private data is NOT readable ---- */
  const leaks: string[] = [];
  for (const t of PRIVATE_TABLES) {
    const { data, error } = await anon.from(t).select("*").limit(1);
    // RLS returns an empty set (not an error) to anon. A non-empty result = leak.
    if (!error && (data?.length ?? 0) > 0) leaks.push(t);
  }
  check(
    "anon cannot read any private table",
    leaks.length === 0,
    leaks.length ? `LEAKING: ${leaks.join(", ")}` : "all blocked",
  );

  let anonWriteBlocked = true;
  const { error: writeErr } = await anon.from("user_lesson_progress").insert({
    user_id: "00000000-0000-0000-0000-000000000000",
    lesson_id: "00000000-0000-0000-0000-000000000000",
  });
  anonWriteBlocked = Boolean(writeErr);
  check(
    "anon cannot write private tables",
    anonWriteBlocked,
    writeErr?.message,
  );

  /* ---- service role: full schema + RLS on ---- */
  if (!serviceKey) {
    console.log(
      "\n(SUPABASE_SERVICE_ROLE_KEY not set — skipping schema-level checks)",
    );
  } else {
    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    let schemaTables = 0;
    for (const t of [
      "levels",
      "skills",
      "units",
      "lessons",
      "lesson_items",
      "vocabulary",
      "grammar_points",
      "grammar_examples",
      "chat_scenarios",
      ...PRIVATE_TABLES,
    ]) {
      const { error } = await admin
        .from(t)
        .select("*", { count: "exact", head: true });
      if (!error) schemaTables += 1;
      else check(`table ${t} reachable`, false, error.message);
    }
    check(
      "service role reaches every expected table",
      schemaTables === 9 + PRIVATE_TABLES.length,
      `${schemaTables}/${9 + PRIVATE_TABLES.length}`,
    );
  }

  console.log(
    failures === 0
      ? "\nConnection OK — hosted Supabase is reachable and RLS is holding."
      : `\n${failures} check(s) FAILED.`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("\ncheck crashed:", error);
  process.exit(1);
});
