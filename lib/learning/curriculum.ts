import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import {
  curriculum,
  findLesson,
  lessonGrammarSlugs,
  lessonVocabLemmas,
} from "@/content/curriculum";
import type {
  ContentLesson,
  ContentUnit,
  ContentVocab,
} from "@/content/curriculum/types";
import {
  parseItemContent,
  type PlayableItem,
  type PlayableLesson,
} from "@/lib/learning/lesson-content";
import type { VocabularyItem } from "@/components/vocabulary/types";
import type { CefrLevel } from "@/lib/learning/cefr";

/* --------------------------- overview (for /learn) --------------------------- */

export type LessonOverview = {
  slug: string;
  title: string;
  description: string;
  itemCount: number;
  available: boolean;
};

export type UnitOverview = {
  levelCode: CefrLevel;
  slug: string;
  title: string;
  description: string;
  published: boolean;
  lessons: LessonOverview[];
};

export function getCurriculumOverview(): UnitOverview[] {
  return curriculum.units.map((unit) => ({
    levelCode: unit.levelCode,
    slug: unit.slug,
    title: unit.title,
    description: unit.description,
    published: unit.published,
    lessons: unit.lessons.map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      itemCount: lesson.items.length,
      available: unit.published && lesson.items.length > 0,
    })),
  }));
}

/** The first available lesson a learner should start with. */
export function firstAvailableLesson(): {
  unitSlug: string;
  lessonSlug: string;
  unitTitle: string;
  lessonTitle: string;
} | null {
  for (const unit of curriculum.units) {
    if (!unit.published) continue;
    for (const lesson of unit.lessons) {
      if (lesson.items.length > 0) {
        return {
          unitSlug: unit.slug,
          lessonSlug: lesson.slug,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
        };
      }
    }
  }
  return null;
}

export function totalAvailableLessons(): number {
  return curriculum.units
    .filter((u) => u.published)
    .flatMap((u) => u.lessons)
    .filter((l) => l.items.length > 0).length;
}

/* ----------------------------- playable lesson ----------------------------- */

function toVocabularyItem(
  v: ContentVocab,
  status: VocabularyItem["status"] = "new",
): VocabularyItem {
  return {
    id: v.lemma,
    word: v.displayForm,
    translation: v.translation,
    baseForm: v.article ? v.lemma.replace(/^(der|die|das)\s+/, "") : v.lemma,
    partOfSpeech: v.partOfSpeech,
    pronunciation: v.ipa,
    exampleSentence: v.example,
    exampleTranslation: v.exampleTranslation,
    status,
  };
}

function contentToPlayable(
  unit: ContentUnit,
  lesson: ContentLesson,
): PlayableLesson {
  const items: PlayableItem[] = lesson.items.map((item, i) => ({
    ...parseItemContent(item.itemType, item.content),
    id: `${unit.slug}/${lesson.slug}#${i + 1}`,
    sortOrder: i + 1,
    prompt: item.prompt ?? null,
  }));

  return {
    unitSlug: unit.slug,
    unitTitle: unit.title,
    lessonSlug: lesson.slug,
    title: lesson.title,
    lessonType: lesson.lessonType,
    levelCode: unit.levelCode,
    estimatedMinutes: lesson.estimatedMinutes,
    items,
  };
}

export type LessonForPlay = {
  lesson: PlayableLesson;
  lessonId: string | null;
  vocabByLemma: Record<string, VocabularyItem>;
  vocabLemmas: string[];
  grammarSlugs: string[];
  /** true when the content came from the live database (not the fallback). */
  fromDatabase: boolean;
};

export async function getLessonForPlay(
  unitSlug: string,
  lessonSlug: string,
): Promise<LessonForPlay | null> {
  const contentMatch = findLesson(unitSlug, lessonSlug);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: unit } = await supabase
      .from("units")
      .select("id, slug, title, level_code")
      .eq("slug", unitSlug)
      .eq("is_published", true)
      .maybeSingle();

    if (unit) {
      const { data: lessonRow } = await supabase
        .from("lessons")
        .select("id, slug, title, lesson_type, estimated_minutes")
        .eq("unit_id", unit.id)
        .eq("slug", lessonSlug)
        .eq("is_published", true)
        .maybeSingle();

      if (lessonRow) {
        const { data: itemRows } = await supabase
          .from("lesson_items")
          .select("id, sort_order, item_type, prompt, content")
          .eq("lesson_id", lessonRow.id)
          .order("sort_order");

        const items: PlayableItem[] = (itemRows ?? []).map((row) => ({
          ...parseItemContent(row.item_type, row.content),
          id: row.id,
          sortOrder: row.sort_order,
          prompt: row.prompt,
        }));

        if (items.length > 0) {
          const lesson: PlayableLesson = {
            unitSlug: unit.slug,
            unitTitle: unit.title,
            lessonSlug: lessonRow.slug,
            title: lessonRow.title,
            lessonType: lessonRow.lesson_type,
            levelCode: unit.level_code,
            estimatedMinutes: lessonRow.estimated_minutes ?? 6,
            items,
          };
          return {
            lesson,
            lessonId: lessonRow.id,
            vocabByLemma: resolveVocab(lesson),
            vocabLemmas: contentMatch
              ? lessonVocabLemmas(contentMatch.lesson)
              : [],
            grammarSlugs: contentMatch
              ? lessonGrammarSlugs(contentMatch.lesson)
              : [],
            fromDatabase: true,
          };
        }
      }
    }
  }

  // Fallback: read the same content the seed was generated from.
  if (
    !contentMatch ||
    !contentMatch.unit.published ||
    contentMatch.lesson.items.length === 0
  ) {
    return null;
  }
  const lesson = contentToPlayable(contentMatch.unit, contentMatch.lesson);
  return {
    lesson,
    lessonId: null,
    vocabByLemma: resolveVocab(lesson),
    vocabLemmas: lessonVocabLemmas(contentMatch.lesson),
    grammarSlugs: lessonGrammarSlugs(contentMatch.lesson),
    fromDatabase: false,
  };
}

/** Resolve every lemma a lesson touches to a display-ready vocab item. */
function resolveVocab(lesson: PlayableLesson): Record<string, VocabularyItem> {
  const out: Record<string, VocabularyItem> = {};
  for (const item of lesson.items) {
    const lemmas: string[] = [];
    if (item.itemType === "presentation") {
      for (const t of item.content.tokens ?? []) lemmas.push(t.lemma);
    }
    if (item.itemType === "flashcard") lemmas.push(item.content.lemma);
    for (const lemma of lemmas) {
      const v = curriculum.vocabulary.find((x) => x.lemma === lemma);
      if (v && !out[lemma]) out[lemma] = toVocabularyItem(v);
    }
  }
  return out;
}
