import {
  BookOpen,
  Check,
  Circle,
  Clock,
  GraduationCap,
  Headphones,
  MessagesSquare,
  MoreHorizontal,
  Mic,
  Pencil,
  SpellCheck,
  type LucideIcon,
} from "lucide-react";
import type { LessonKind, SkillKey } from "@/components/learning/types";

export const lessonKindIcon: Record<LessonKind, LucideIcon> = {
  vocabulary: BookOpen,
  grammar: SpellCheck,
  reading: GraduationCap,
  listening: Headphones,
  writing: Pencil,
  speaking: Mic,
  conversation: MessagesSquare,
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
  writing: Pencil,
  speaking: Mic,
  vocabulary: BookOpen,
  grammar: SpellCheck,
};

/**
 * The tint a feature icon carries. Gold = learning/vocabulary/progress,
 * red = speaking/action, neutral = everything else. Keeps the coloured-circle
 * treatment consistent with the DeutschChat colour system.
 */
export type IconTone = "gold" | "red" | "neutral";

export const skillTone: Record<SkillKey, IconTone> = {
  vocabulary: "gold",
  grammar: "neutral",
  reading: "neutral",
  listening: "neutral",
  writing: "neutral",
  speaking: "red",
};

/**
 * Canonical progress states for a lesson or practice item, with the icon and
 * circle treatment used wherever a status marker appears.
 */
export type ItemStatus = "completed" | "in_progress" | "repeat" | "new";

export const ITEM_STATUS: Record<
  ItemStatus,
  { icon: LucideIcon; label: string; circle: string }
> = {
  completed: {
    icon: Check,
    label: "Erledigt",
    circle: "bg-success/15 text-success",
  },
  in_progress: {
    icon: MoreHorizontal,
    label: "In Bearbeitung",
    circle: "bg-primary/12 text-primary",
  },
  repeat: {
    icon: Clock,
    label: "Wiederholen",
    circle: "bg-accent/15 text-accent-strong",
  },
  new: {
    icon: Circle,
    label: "Neu",
    circle: "bg-muted text-muted-foreground",
  },
};
