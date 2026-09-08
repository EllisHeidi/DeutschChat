import type { LucideIcon } from "lucide-react";

/** Presentation types for learning UI. Not the eventual persisted schema. */

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

export type LessonKind =
  | "vocabulary"
  | "grammar"
  | "reading"
  | "listening"
  | "writing"
  | "speaking"
  | "conversation";

export type LessonSummary = {
  id: string;
  title: string;
  subtitle?: string;
  kind: LessonKind;
  status: LessonStatus;
  /** 0–100, only meaningful for in-progress. */
  progress?: number;
};

export type SkillKey =
  "reading" | "listening" | "writing" | "speaking" | "vocabulary" | "grammar";

export type SkillProgressModel = {
  key: SkillKey;
  label: string;
  icon: LucideIcon;
  /** null = no data yet (Phase 1 default). */
  value: number | null;
};
