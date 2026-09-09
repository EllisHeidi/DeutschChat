import type { VocabStatus } from "@/lib/learning/mastery";

/**
 * Pure progress / completion rules. No database, no framework — just the logic
 * that decides "is this done" and "what score", so it can be tested directly.
 */

export type ItemOutcome = {
  itemId: string;
  /** Did this item require an answer? Presentation/info items do not. */
  interactive: boolean;
  correct: boolean;
};

/**
 * A lesson counts as complete once the learner has worked through every item
 * (reached the end of the flow). Opening the page is not enough.
 */
export function isLessonComplete(
  totalItems: number,
  itemsWorkedThrough: number,
): boolean {
  return totalItems > 0 && itemsWorkedThrough >= totalItems;
}

/**
 * Score is correct answers over interactive items, 0–100. A lesson with no
 * interactive items (pure presentation) scores 100 on completion.
 */
export function computeLessonScore(outcomes: ItemOutcome[]): number {
  const interactive = outcomes.filter((o) => o.interactive);
  if (interactive.length === 0) return 100;
  const correct = interactive.filter((o) => o.correct).length;
  return Math.round((correct / interactive.length) * 100);
}

export function countCorrect(outcomes: ItemOutcome[]): number {
  return outcomes.filter((o) => o.interactive && o.correct).length;
}

export function countInteractive(outcomes: ItemOutcome[]): number {
  return outcomes.filter((o) => o.interactive).length;
}

/**
 * Encountering a word in a lesson moves it from "new" (or unseen) to "learning".
 * Words already further along are left alone — real mastery calculation is a
 * later step.
 */
export function vocabStatusAfterExposure(
  current: VocabStatus | null,
): VocabStatus {
  if (current === null || current === "new") return "learning";
  return current;
}

export type DailyActivityDelta = {
  lessons_completed: number;
  items_practiced: number;
  minutes_spent: number;
};

export function dailyActivityForLesson(
  outcomes: ItemOutcome[],
  estimatedMinutes: number,
): DailyActivityDelta {
  return {
    lessons_completed: 1,
    items_practiced: countInteractive(outcomes),
    minutes_spent: Math.max(1, Math.min(estimatedMinutes, 60)),
  };
}
