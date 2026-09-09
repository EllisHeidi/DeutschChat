import { a1 } from "@/content/curriculum/a1";
import type {
  ContentLesson,
  ContentUnit,
  ContentVocab,
  Curriculum,
} from "@/content/curriculum/types";

/**
 * The full curriculum, merged across levels. Pure data + lookups — no database.
 * `lib/learning/curriculum.ts` reads from Supabase when it's configured and
 * falls back to this.
 */
export const curriculum: Curriculum = a1;

export function allUnits(): ContentUnit[] {
  return curriculum.units;
}

export function publishedUnits(): ContentUnit[] {
  return curriculum.units.filter((u) => u.published);
}

export function findUnit(slug: string): ContentUnit | undefined {
  return curriculum.units.find((u) => u.slug === slug);
}

export function findLesson(
  unitSlug: string,
  lessonSlug: string,
): { unit: ContentUnit; lesson: ContentLesson } | undefined {
  const unit = findUnit(unitSlug);
  const lesson = unit?.lessons.find((l) => l.slug === lessonSlug);
  if (!unit || !lesson) return undefined;
  return { unit, lesson };
}

export function findVocab(lemma: string): ContentVocab | undefined {
  return curriculum.vocabulary.find((v) => v.lemma === lemma);
}

export function findGrammar(slug: string) {
  return curriculum.grammarPoints.find((g) => g.slug === slug);
}

/** Distinct vocab lemmas referenced anywhere in a lesson's items. */
export function lessonVocabLemmas(lesson: ContentLesson): string[] {
  const set = new Set<string>();
  for (const item of lesson.items) {
    for (const lemma of item.vocab ?? []) set.add(lemma);
    if (item.itemType === "flashcard") set.add(item.content.lemma);
  }
  return [...set];
}
