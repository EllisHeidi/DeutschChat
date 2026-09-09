/**
 * DEMO DATA — kitchen-sink review page only.
 *
 * None of this is real learner data and none of it is persisted. The real
 * application will load equivalent shapes from Supabase in later phases.
 * Do not import this file outside `app/kitchen-sink/`.
 */
import { BookOpen, Headphones, Mic } from "lucide-react";
import type { VocabularyItem } from "@/components/vocabulary/types";
import type {
  LessonSummary,
  SkillProgressModel,
} from "@/components/learning/types";
import type { ChatMessageModel } from "@/components/chat/types";
import type { RoadmapLevel } from "@/components/progress/cefr-roadmap";
import type { DailyActivityItem } from "@/components/progress/daily-activity";

export const demoVocab: Record<string, VocabularyItem> = {
  heute: {
    id: "v-heute",
    word: "heute",
    translation: "today",
    partOfSpeech: "Adverb",
    pronunciation: "/ˈhɔʏ̯tə/",
    exampleSentence: "Heute lerne ich Deutsch.",
    exampleTranslation: "Today I am learning German.",
    status: "new",
  },
  Familie: {
    id: "v-familie",
    word: "die Familie",
    translation: "the family",
    baseForm: "Familie",
    partOfSpeech: "Nomen (f)",
    pronunciation: "/faˈmiːli̯ə/",
    exampleSentence: "Meine Familie wohnt in Hamburg.",
    exampleTranslation: "My family lives in Hamburg.",
    status: "learning",
  },
  wohnen: {
    id: "v-wohnen",
    word: "wohnen",
    translation: "to live / reside",
    partOfSpeech: "Verb",
    pronunciation: "/ˈvoːnən/",
    exampleSentence: "Wo wohnst du?",
    exampleTranslation: "Where do you live?",
    status: "known",
  },
};

export const demoLessons: LessonSummary[] = [
  {
    id: "l1",
    title: "Hallo & Begrüßungen",
    subtitle: "Sich begrüßen und verabschieden",
    kind: "vocabulary",
    status: "completed",
  },
  {
    id: "l2",
    title: "Sich vorstellen",
    subtitle: "Name, Herkunft, Sprachen",
    kind: "conversation",
    status: "in-progress",
    progress: 40,
  },
  {
    id: "l3",
    title: "Zahlen & Alter",
    subtitle: "0–20 und das Alter angeben",
    kind: "listening",
    status: "available",
  },
  {
    id: "l4",
    title: "Länder & Sprachen",
    subtitle: "Woher kommst du?",
    kind: "grammar",
    status: "locked",
  },
];

export const demoSkills: SkillProgressModel[] = [
  { key: "vocabulary", label: "Wortschatz", value: null },
  { key: "listening", label: "Hören", value: null },
  { key: "speaking", label: "Sprechen", value: null },
];

export const demoConversation: ChatMessageModel[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Hallo! Ich bin Lena. Wie heißt du?",
    time: "14:30",
    playable: true,
  },
  {
    id: "m2",
    role: "user",
    content: "Ich heiße Sofia. Ich komme aus Italien.",
    time: "14:31",
  },
  {
    id: "m3",
    role: "assistant",
    content: "Schön, dich kennenzulernen, Sofia! Wie geht es dir heute?",
    time: "14:31",
    playable: true,
  },
  {
    id: "m4",
    role: "user",
    content: "Mir geht gut, danke!",
    time: "14:32",
  },
];

export const demoRoadmap: RoadmapLevel[] = [
  { code: "A1", name: "Anfänger", state: "current", isFree: true },
  { code: "A2", name: "Grundstufe", state: "locked", isFree: false },
  { code: "B1", name: "Mittelstufe", state: "locked", isFree: false },
  { code: "B2", name: "Fortgeschrittene", state: "locked", isFree: false },
  {
    code: "C1",
    name: "Fachkundige Sprachkenntnisse",
    state: "locked",
    isFree: false,
  },
];

export const demoDailyActivity: DailyActivityItem[] = [
  { key: "vocab", label: "Wortschatz", icon: BookOpen, done: false },
  { key: "listening", label: "Hören", icon: Headphones, done: false },
  { key: "speaking", label: "Sprechen", icon: Mic, done: false },
];
