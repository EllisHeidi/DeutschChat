import { z } from "zod";
import type { CefrLevel } from "@/lib/learning/cefr";
import type { LessonType, SupportedItemType } from "@/content/curriculum/types";

/**
 * Runtime schemas for `lesson_items.content` (jsonb). The TS types in
 * `content/curriculum/types.ts` are authoring-time; these validate the payload
 * both when generating the seed and when reading it back from the database.
 */

const choice = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  correct: z.boolean(),
});

const commonMistake = z.object({
  wrong: z.string().min(1),
  explanation: z.string().min(1),
});

export const itemContentSchemas = {
  presentation: z.object({
    german: z.string().min(1),
    translation: z.string().min(1),
    note: z.string().optional(),
    audioText: z.string().optional(),
    tokens: z
      .array(z.object({ surface: z.string().min(1), lemma: z.string().min(1) }))
      .optional(),
  }),
  info: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    examples: z
      .array(
        z.object({
          german: z.string().min(1),
          translation: z.string().optional(),
        }),
      )
      .optional(),
  }),
  flashcard: z.object({ lemma: z.string().min(1) }),
  multiple_choice: z.object({
    question: z.string().min(1),
    options: z.array(choice).min(2),
    explanation: z.string().optional(),
  }),
  fill_blank: z.object({
    before: z.string(),
    after: z.string(),
    answer: z.string().min(1),
    acceptable: z.array(z.string()).optional(),
    translation: z.string().optional(),
    explanation: z.string().optional(),
    commonMistakes: z.array(commonMistake).optional(),
  }),
  writing_prompt: z.object({
    ask: z.string().min(1),
    answer: z.string().min(1),
    acceptable: z.array(z.string()).optional(),
    hint: z.string().optional(),
    explanation: z.string().optional(),
    commonMistakes: z.array(commonMistake).optional(),
  }),
  matching: z.object({
    pairs: z
      .array(
        z.object({
          id: z.string().min(1),
          left: z.string().min(1),
          right: z.string().min(1),
        }),
      )
      .min(2),
  }),
  listening: z.object({
    audioText: z.string().min(1),
    question: z.string().min(1),
    options: z.array(choice).min(2),
    explanation: z.string().optional(),
  }),
  speaking: z.object({
    targetGerman: z.string().min(1),
    translation: z.string().optional(),
  }),
} satisfies Record<SupportedItemType, z.ZodTypeAny>;

export const SUPPORTED_ITEM_TYPES = Object.keys(
  itemContentSchemas,
) as SupportedItemType[];

export function isSupportedItemType(value: string): value is SupportedItemType {
  return value in itemContentSchemas;
}

export type ParsedItemContent = {
  [T in SupportedItemType]: {
    itemType: T;
    content: z.infer<(typeof itemContentSchemas)[T]>;
  };
}[SupportedItemType];

/** Parse a raw `content` payload for a known item type. Throws on mismatch. */
export function parseItemContent(
  itemType: string,
  raw: unknown,
): ParsedItemContent {
  if (!isSupportedItemType(itemType)) {
    throw new Error(`Unsupported lesson item type: ${itemType}`);
  }
  const content = itemContentSchemas[itemType].parse(raw);
  return { itemType, content } as ParsedItemContent;
}

/** The shape the lesson player consumes, regardless of data source. */
export type PlayableItem = ParsedItemContent & {
  id: string;
  sortOrder: number;
  prompt: string | null;
};

export type PlayableLesson = {
  unitSlug: string;
  unitTitle: string;
  lessonSlug: string;
  title: string;
  lessonType: LessonType;
  levelCode: CefrLevel;
  estimatedMinutes: number;
  items: PlayableItem[];
};

/** Whether an item requires a learner response (vs. read-and-continue). */
export function itemIsInteractive(itemType: SupportedItemType): boolean {
  return (
    itemType === "multiple_choice" ||
    itemType === "fill_blank" ||
    itemType === "writing_prompt" ||
    itemType === "matching" ||
    itemType === "listening"
  );
}
