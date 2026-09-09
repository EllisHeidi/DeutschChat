import type { CommonMistake } from "@/content/curriculum/types";

/**
 * Deterministic, local answer checking for TYPE / fill-in-the-blank activities.
 * No AI. Matching is lenient about case, surrounding whitespace and a trailing
 * "." / "!" / "?" — everything else must match a canonical or explicitly
 * accepted form.
 */

export type AnswerSpec = {
  answer: string;
  acceptable?: string[];
  explanation?: string;
  commonMistakes?: CommonMistake[];
};

export type AnswerCheck =
  | { status: "correct" }
  | { status: "close"; suggestion: string; explanation: string }
  | { status: "incorrect"; suggestion: string; explanation?: string };

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/[.!?]+$/u, "");
}

export function checkAnswer(input: string, spec: AnswerSpec): AnswerCheck {
  const normalized = normalizeAnswer(input);
  if (normalized.length === 0) {
    return { status: "incorrect", suggestion: spec.answer };
  }

  const accepted = [spec.answer, ...(spec.acceptable ?? [])].map(
    normalizeAnswer,
  );
  if (accepted.includes(normalized)) {
    return { status: "correct" };
  }

  for (const mistake of spec.commonMistakes ?? []) {
    if (normalizeAnswer(mistake.wrong) === normalized) {
      return {
        status: "close",
        suggestion: spec.answer,
        explanation: mistake.explanation,
      };
    }
  }

  return {
    status: "incorrect",
    suggestion: spec.answer,
    explanation: spec.explanation,
  };
}

export function isPassingCheck(check: AnswerCheck): boolean {
  return check.status === "correct";
}
