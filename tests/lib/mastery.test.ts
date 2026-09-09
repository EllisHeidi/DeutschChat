import { describe, expect, it } from "vitest";
import {
  GRAMMAR_STATUS_LABEL,
  GRAMMAR_STATUSES,
  isGrammarMastered,
  isValidStrength,
  isVocabAcquired,
  VOCAB_STATUS_LABEL,
  VOCAB_STATUSES,
} from "@/lib/learning/mastery";

describe("mastery helpers", () => {
  it("has a label for every vocabulary status", () => {
    for (const status of VOCAB_STATUSES) {
      expect(VOCAB_STATUS_LABEL[status]).toBeTruthy();
    }
  });

  it("has a label for every grammar status", () => {
    for (const status of GRAMMAR_STATUSES) {
      expect(GRAMMAR_STATUS_LABEL[status]).toBeTruthy();
    }
  });

  it("treats a word as acquired only when known", () => {
    expect(isVocabAcquired("known")).toBe(true);
    expect(isVocabAcquired("needs_review")).toBe(false);
    expect(isVocabAcquired("learning")).toBe(false);
  });

  it("treats grammar as mastered only when mastered", () => {
    expect(isGrammarMastered("mastered")).toBe(true);
    expect(isGrammarMastered("weak")).toBe(false);
  });

  it("validates strength as an integer in 0..100", () => {
    expect(isValidStrength(0)).toBe(true);
    expect(isValidStrength(100)).toBe(true);
    expect(isValidStrength(-1)).toBe(false);
    expect(isValidStrength(101)).toBe(false);
    expect(isValidStrength(42.5)).toBe(false);
  });
});
