import {
  BookOpen,
  GraduationCap,
  Headphones,
  MessageCircle,
  Mic,
  PenLine,
  SpellCheck,
  type LucideIcon,
} from "lucide-react";
import type { LessonKind, SkillKey } from "@/components/learning/types";

export const lessonKindIcon: Record<LessonKind, LucideIcon> = {
  vocabulary: BookOpen,
  grammar: SpellCheck,
  reading: GraduationCap,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic,
  conversation: MessageCircle,
};

export const lessonKindLabel: Record<LessonKind, string> = {
  vocabulary: "Wortschatz",
  grammar: "Grammatik",
  reading: "Lesen",
  listening: "Hören",
  writing: "Schreiben",
  speaking: "Sprechen",
  conversation: "Gespräch",
};

export const skillIcon: Record<SkillKey, LucideIcon> = {
  reading: GraduationCap,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic,
  vocabulary: BookOpen,
  grammar: SpellCheck,
};
