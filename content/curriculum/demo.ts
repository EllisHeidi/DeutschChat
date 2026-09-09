import { curriculum } from "@/content/curriculum";
import {
  parseItemContent,
  type PlayableLesson,
} from "@/lib/learning/lesson-content";
import type { ContentLessonItem } from "@/content/curriculum/types";
import type { VocabularyItem } from "@/components/vocabulary/types";

/**
 * A tight, curated run for `/demo/lesson` — built for recording. Standalone:
 * no database, no auth, no persistence. Starts from a fixed state and resets
 * cleanly. Hits every beat of the learning loop:
 * German → translation → audio → typing → feedback → grammar → speak → done.
 */

const DEMO_ITEMS: ContentLessonItem[] = [
  {
    itemType: "presentation",
    content: {
      german: "Wie heißt du?",
      translation: "What's your name?",
      tokens: [
        { surface: "Wie", lemma: "wie" },
        { surface: "heißt", lemma: "heißen" },
      ],
    },
  },
  {
    itemType: "presentation",
    content: {
      german: "Ich heiße Heidi.",
      translation: "My name is Heidi.",
      note: "„heißen“ = to be called. „Ich bin Heidi.“ works too.",
      tokens: [{ surface: "heiße", lemma: "heißen" }],
    },
  },
  {
    itemType: "info",
    content: {
      title: "Verben im Präsens",
      body: "With **ich** the verb usually ends in **-e**: *ich heiße*, *ich komme*, *ich wohne*.",
      examples: [
        { german: "ich heiße / du heißt" },
        { german: "ich wohne / du wohnst" },
      ],
    },
  },
  {
    itemType: "writing_prompt",
    prompt: "Introduce yourself.",
    content: {
      ask: "Say: My name is Heidi.",
      answer: "Ich heiße Heidi.",
      acceptable: ["Ich bin Heidi."],
      commonMistakes: [
        {
          wrong: "Ich heißen Heidi.",
          explanation:
            "Bei „ich“ endet das Verb auf **-e**: *heißen → ich heiße*.",
        },
      ],
    },
  },
  {
    itemType: "writing_prompt",
    prompt: "Say where you live.",
    content: {
      ask: "Say: I live in South Africa.",
      answer: "Ich wohne in Südafrika.",
      hint: "wohnen → ich wohn__",
      explanation:
        "Bei **ich** bekommt „wohnen“ die Endung **-e**: *wohnen → ich wohne*.",
      commonMistakes: [
        {
          wrong: "Ich wohnen in Südafrika.",
          explanation:
            "Bei „ich“ bekommt das Verb „wohnen“ im Präsens die Endung **-e**. *wohnen → ich wohne*.",
        },
      ],
    },
  },
  {
    itemType: "speaking",
    prompt: "Say it out loud.",
    content: {
      targetGerman: "Ich heiße Heidi. Ich komme aus Südafrika.",
      translation: "My name is Heidi. I'm from South Africa.",
    },
  },
];

export function getDemoLesson(): {
  lesson: PlayableLesson;
  vocab: Record<string, VocabularyItem>;
} {
  const lesson: PlayableLesson = {
    unitSlug: "demo",
    unitTitle: "Erste Schritte",
    lessonSlug: "sich-vorstellen",
    title: "Sich vorstellen",
    lessonType: "conversation",
    levelCode: "A1",
    estimatedMinutes: 4,
    items: DEMO_ITEMS.map((item, i) => ({
      ...parseItemContent(item.itemType, item.content),
      id: `demo#${i + 1}`,
      sortOrder: i + 1,
      prompt: item.prompt ?? null,
    })),
  };

  const vocab: Record<string, VocabularyItem> = {};
  for (const item of DEMO_ITEMS) {
    if (item.itemType !== "presentation") continue;
    for (const tok of item.content.tokens ?? []) {
      const v = curriculum.vocabulary.find((x) => x.lemma === tok.lemma);
      if (v && !vocab[tok.lemma]) {
        vocab[tok.lemma] = {
          id: v.lemma,
          word: v.displayForm,
          translation: v.translation,
          baseForm: v.lemma,
          partOfSpeech: v.partOfSpeech,
          pronunciation: v.ipa,
          exampleSentence: v.example,
          exampleTranslation: v.exampleTranslation,
          status: tok.lemma === "heißen" ? "learning" : "new",
        };
      }
    }
  }

  return { lesson, vocab };
}
