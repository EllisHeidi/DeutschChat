import type { CefrLevel } from "@/lib/learning/cefr";
import type { Enums } from "@/lib/supabase/types";

/**
 * The curriculum content model — the version-controlled source of truth.
 *
 * `scripts/db/generate-seed.ts` turns this into deterministic SQL
 * (`supabase/seed.sql`); the app reads the same shapes back from the database,
 * and `/demo/lesson` reads a curated subset directly. Content is edited here,
 * never inside React components.
 */

export type LessonType = Enums<"lesson_type">;
export type LessonItemType = Enums<"lesson_item_type">;
export type PartOfSpeech = Enums<"part_of_speech">;
export type Article = "der" | "die" | "das";

export type ContentVocab = {
  lemma: string;
  /** How the word is shown to a learner (article included for nouns). */
  displayForm: string;
  translation: string;
  partOfSpeech: PartOfSpeech;
  article?: Article;
  pluralForm?: string;
  /** IPA — drives future audio, shown in the word popover. */
  ipa?: string;
  example: string;
  exampleTranslation: string;
  cefrLevel: CefrLevel;
};

export type ContentGrammarPoint = {
  slug: string;
  title: string;
  summary: string;
  /** Short, beginner-friendly. `**bold**` is rendered. */
  explanation: string;
  cefrLevel: CefrLevel;
  category: string;
  examples: { german: string; translation: string }[];
};

/** A common wrong answer paired with a short "why" (deterministic, no AI). */
export type CommonMistake = { wrong: string; explanation: string };

export type Choice = { id: string; text: string; correct: boolean };

/* ----------------------------- item payloads ----------------------------- */

export type PresentationContent = {
  german: string;
  translation: string;
  note?: string;
  /** Text a future TTS would speak; defaults to `german`. */
  audioText?: string;
  /**
   * Exact substrings of `german` to render as tappable WordTokens, each mapped
   * to a vocabulary lemma. Author-controlled so highlighting is deterministic.
   */
  tokens?: { surface: string; lemma: string }[];
};

export type InfoContent = {
  title: string;
  body: string;
  examples?: { german: string; translation?: string }[];
};

export type FlashcardContent = {
  /** Lemma of a vocab entry; the card is built from it. */
  lemma: string;
};

export type MultipleChoiceContent = {
  question: string;
  options: Choice[];
  explanation?: string;
};

export type FillBlankContent = {
  before: string;
  after: string;
  answer: string;
  acceptable?: string[];
  translation?: string;
  explanation?: string;
  commonMistakes?: CommonMistake[];
};

export type WritingContent = {
  /** English instruction, e.g. "Say: My name is Heidi." */
  ask: string;
  answer: string;
  acceptable?: string[];
  hint?: string;
  explanation?: string;
  commonMistakes?: CommonMistake[];
};

export type MatchingContent = {
  pairs: { id: string; left: string; right: string }[];
};

export type ListeningContent = {
  /** German that would be spoken. */
  audioText: string;
  question: string;
  options: Choice[];
  explanation?: string;
};

export type SpeakingContent = {
  targetGerman: string;
  translation?: string;
};

export type LessonItemContentByType = {
  presentation: PresentationContent;
  info: InfoContent;
  flashcard: FlashcardContent;
  multiple_choice: MultipleChoiceContent;
  fill_blank: FillBlankContent;
  writing_prompt: WritingContent;
  matching: MatchingContent;
  listening: ListeningContent;
  speaking: SpeakingContent;
};

export type SupportedItemType = keyof LessonItemContentByType;

export type ContentLessonItem = {
  [T in SupportedItemType]: {
    itemType: T;
    /** Learner-facing instruction shown above the activity. */
    prompt?: string;
    content: LessonItemContentByType[T];
    /** Vocab lemmas this item teaches/uses → `lesson_item_vocabulary`. */
    vocab?: string[];
    /** Grammar slugs this item introduces → `lesson_item_grammar`. */
    grammar?: string[];
  };
}[SupportedItemType];

export type ContentLesson = {
  slug: string;
  title: string;
  description: string;
  lessonType: LessonType;
  estimatedMinutes: number;
  items: ContentLessonItem[];
};

export type ContentUnit = {
  levelCode: CefrLevel;
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
  published: boolean;
  lessons: ContentLesson[];
};

export type Curriculum = {
  vocabulary: ContentVocab[];
  grammarPoints: ContentGrammarPoint[];
  units: ContentUnit[];
};
