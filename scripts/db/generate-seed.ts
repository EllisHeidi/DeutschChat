/**
 * Generates `supabase/seed.sql` from the version-controlled curriculum in
 * `content/curriculum/`. Deterministic: same input -> byte-identical output.
 *
 *   npm run db:seed
 *
 * The SQL resolves foreign keys through natural slug/lemma lookups and uses
 * `on conflict do nothing`, so it is safe to run repeatedly (`supabase db
 * reset`, a one-off against the hosted DB, or the pglite validator).
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { curriculum, findGrammar, findVocab } from "../../content/curriculum";
import { parseItemContent } from "../../lib/learning/lesson-content";
import type { ContentLessonItem } from "../../content/curriculum/types";

const root = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../..",
);
const outPath = path.join(root, "supabase", "seed.sql");

function q(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}
function qn(value: string | undefined): string {
  return value === undefined ? "null" : q(value);
}
function json(value: unknown): string {
  return `${q(JSON.stringify(value))}::jsonb`;
}

// --------------------------------------------------------------------------
// Validate content before emitting anything
// --------------------------------------------------------------------------
function validate(): void {
  const errors: string[] = [];
  for (const unit of curriculum.units) {
    for (const lesson of unit.lessons) {
      lesson.items.forEach((item, i) => {
        const where = `${unit.slug}/${lesson.slug} #${i + 1}`;
        try {
          parseItemContent(item.itemType, item.content);
        } catch (e) {
          errors.push(`${where}: ${(e as Error).message}`);
        }
        for (const lemma of item.vocab ?? []) {
          if (!findVocab(lemma))
            errors.push(`${where}: unknown vocab "${lemma}"`);
        }
        for (const slug of item.grammar ?? []) {
          if (!findGrammar(slug))
            errors.push(`${where}: unknown grammar "${slug}"`);
        }
        if (item.itemType === "flashcard" && !findVocab(item.content.lemma)) {
          errors.push(
            `${where}: flashcard lemma "${item.content.lemma}" not in vocabulary`,
          );
        }
        if (item.itemType === "presentation") {
          for (const tok of item.content.tokens ?? []) {
            if (!findVocab(tok.lemma)) {
              errors.push(
                `${where}: token lemma "${tok.lemma}" not in vocabulary`,
              );
            }
            if (!item.content.german.includes(tok.surface)) {
              errors.push(
                `${where}: token surface "${tok.surface}" not found in "${item.content.german}"`,
              );
            }
          }
        }
      });
    }
  }
  if (errors.length > 0) {
    console.error(
      "Curriculum content is invalid:\n" +
        errors.map((e) => `  - ${e}`).join("\n"),
    );
    process.exit(1);
  }
}

// --------------------------------------------------------------------------
// SQL fragments
// --------------------------------------------------------------------------
function vocabularySql(): string {
  const rows = curriculum.vocabulary.map(
    (v) =>
      `  (${q(v.lemma)}, ${q(v.displayForm)}, ${q(v.translation)}, ` +
      `${q(v.partOfSpeech)}, ${qn(v.article)}, ${qn(v.pluralForm)}, ${qn(v.ipa)}, ` +
      `${qn(v.example)}, ${qn(v.exampleTranslation)}, ${q(v.cefrLevel)})`,
  );
  return (
    `insert into public.vocabulary\n` +
    `  (lemma, display_form, translation, part_of_speech, article, plural_form, ipa, example_sentence, example_translation, cefr_level)\n` +
    `values\n${rows.join(",\n")}\n` +
    `on conflict (lemma, part_of_speech, coalesce(article, '')) do nothing;\n`
  );
}

function grammarSql(): string {
  const points = curriculum.grammarPoints
    .map(
      (g) =>
        `insert into public.grammar_points (slug, title, summary, explanation, cefr_level, category)\n` +
        `values (${q(g.slug)}, ${q(g.title)}, ${q(g.summary)}, ${q(g.explanation)}, ${q(g.cefrLevel)}, ${q(g.category)})\n` +
        `on conflict (slug) do nothing;`,
    )
    .join("\n\n");

  const examples = curriculum.grammarPoints
    .flatMap((g) =>
      g.examples.map(
        (ex, i) =>
          `insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)\n` +
          `select gp.id, ${q(ex.german)}, ${qn(ex.translation)}, ${i}\n` +
          `from public.grammar_points gp\n` +
          `where gp.slug = ${q(g.slug)}\n` +
          `  and not exists (\n` +
          `    select 1 from public.grammar_examples e\n` +
          `    where e.grammar_point_id = gp.id and e.german = ${q(ex.german)}\n` +
          `  );`,
      ),
    )
    .join("\n\n");

  return `${points}\n\n${examples}\n`;
}

function itemContentPayload(item: ContentLessonItem): string {
  // Store the raw authored content object; the app parses it with the Zod
  // schema for `item.itemType`.
  return json(item.content);
}

function unitSql(unit: (typeof curriculum.units)[number]): string {
  const parts: string[] = [];

  parts.push(
    `insert into public.units (level_code, slug, title, description, sort_order, is_published)\n` +
      `values (${q(unit.levelCode)}, ${q(unit.slug)}, ${q(unit.title)}, ${q(unit.description)}, ${unit.sortOrder}, ${unit.published})\n` +
      `on conflict (level_code, slug) do nothing;`,
  );

  unit.lessons.forEach((lesson, li) => {
    const isPublished = unit.published && lesson.items.length > 0;
    parts.push(
      `insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)\n` +
        `select u.id, ${q(lesson.slug)}, ${q(lesson.title)}, ${qn(lesson.description || undefined)}, ${q(lesson.lessonType)}, ${li + 1}, ${lesson.estimatedMinutes}, ${isPublished}\n` +
        `from public.units u where u.level_code = ${q(unit.levelCode)} and u.slug = ${q(unit.slug)}\n` +
        `on conflict (unit_id, slug) do nothing;`,
    );

    lesson.items.forEach((item, ii) => {
      const so = ii + 1;
      parts.push(
        `insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)\n` +
          `select l.id, ${so}, ${q(item.itemType)}, ${qn(item.prompt)}, ${itemContentPayload(item)}\n` +
          `from public.lessons l join public.units u on u.id = l.unit_id\n` +
          `where u.slug = ${q(unit.slug)} and l.slug = ${q(lesson.slug)}\n` +
          `on conflict (lesson_id, sort_order) do nothing;`,
      );

      const vocabLemmas = new Set(item.vocab ?? []);
      if (item.itemType === "flashcard") vocabLemmas.add(item.content.lemma);
      for (const lemma of vocabLemmas) {
        parts.push(
          `insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)\n` +
            `select li.id, v.id, 'target'\n` +
            `from public.lesson_items li\n` +
            `join public.lessons l on l.id = li.lesson_id\n` +
            `join public.units u on u.id = l.unit_id\n` +
            `cross join public.vocabulary v\n` +
            `where u.slug = ${q(unit.slug)} and l.slug = ${q(lesson.slug)} and li.sort_order = ${so}\n` +
            `  and v.lemma = ${q(lemma)}\n` +
            `on conflict do nothing;`,
        );
      }

      for (const slug of item.grammar ?? []) {
        parts.push(
          `insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)\n` +
            `select li.id, gp.id\n` +
            `from public.lesson_items li\n` +
            `join public.lessons l on l.id = li.lesson_id\n` +
            `join public.units u on u.id = l.unit_id\n` +
            `cross join public.grammar_points gp\n` +
            `where u.slug = ${q(unit.slug)} and l.slug = ${q(lesson.slug)} and li.sort_order = ${so}\n` +
            `  and gp.slug = ${q(slug)}\n` +
            `on conflict do nothing;`,
        );
      }
    });
  });

  return parts.join("\n\n") + "\n";
}

// --------------------------------------------------------------------------
// Assemble
// --------------------------------------------------------------------------
function main(): void {
  validate();

  const blocks = [
    `-- DeutschChat — GENERATED FILE. Do not edit by hand.`,
    `-- Source: content/curriculum/*  ·  Regenerate: npm run db:seed`,
    `--`,
    `-- Idempotent (on conflict do nothing). Applied by \`supabase db reset\` and`,
    `-- the pglite validator; run once manually against the hosted project.`,
    `-- Levels + skills are seeded by the migrations themselves.`,
    ``,
    `-- ===== vocabulary =====`,
    vocabularySql(),
    `-- ===== grammar =====`,
    grammarSql(),
    ...curriculum.units.map(
      (u) => `-- ===== unit: ${u.levelCode} / ${u.slug} =====\n${unitSql(u)}`,
    ),
  ];

  writeFileSync(outPath, blocks.join("\n") + "\n", "utf8");
  const lessonCount = curriculum.units.reduce(
    (n, u) => n + u.lessons.length,
    0,
  );
  const itemCount = curriculum.units.reduce(
    (n, u) => n + u.lessons.reduce((m, l) => m + l.items.length, 0),
    0,
  );
  console.log(
    `Wrote supabase/seed.sql — ${curriculum.vocabulary.length} vocab, ` +
      `${curriculum.grammarPoints.length} grammar points, ${curriculum.units.length} units, ` +
      `${lessonCount} lessons, ${itemCount} items.`,
  );
}

main();
