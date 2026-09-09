import type { Enums } from "@/lib/supabase/types";

/**
 * Mastery-state helpers for vocabulary and grammar.
 *
 * The states mirror the DB enums `vocab_status` / `grammar_status`. This module
 * only maps states to labels/ordering — the adaptive-learning logic that
 * *decides* a state lives elsewhere and is not built yet.
 */

export type VocabStatus = Enums<"vocab_status">;
export type GrammarStatus = Enums<"grammar_status">;

export const VOCAB_STATUSES = [
  "new",
  "learning",
  "known",
  "needs_review",
] as const;

export const GRAMMAR_STATUSES = [
  "new",
  "learning",
  "weak",
  "mastered",
] as const;

export const VOCAB_STATUS_LABEL: Record<VocabStatus, string> = {
  new: "Neu",
  learning: "Am Lernen",
  known: "Bekannt",
  needs_review: "Wiederholen",
};

export const GRAMMAR_STATUS_LABEL: Record<GrammarStatus, string> = {
  new: "Neu",
  learning: "Am Lernen",
  weak: "Schwach",
  mastered: "Beherrscht",
};

/** A word counts as "acquired" once it is known (review is a temporary dip). */
export function isVocabAcquired(status: VocabStatus): boolean {
  return status === "known";
}

export function isGrammarMastered(status: GrammarStatus): boolean {
  return status === "mastered";
}

export function isValidStrength(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 100;
}
