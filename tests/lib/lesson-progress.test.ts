import { describe, expect, it } from "vitest";
import {
  computeLessonScore,
  countCorrect,
  dailyActivityForLesson,
  isLessonComplete,
  vocabStatusAfterExposure,
  type ItemOutcome,
} from "@/lib/learning/progress";

const outcome = (
  correct: boolean,
  interactive = true,
  id = Math.random().toString(),
): ItemOutcome => ({ itemId: id, interactive, correct });

describe("isLessonComplete", () => {
  it("needs every item worked through, and opening alone is not enough", () => {
    expect(isLessonComplete(0, 0)).toBe(false);
    expect(isLessonComplete(8, 0)).toBe(false);
    expect(isLessonComplete(8, 7)).toBe(false);
    expect(isLessonComplete(8, 8)).toBe(true);
  });
});

describe("computeLessonScore", () => {
  it("scores correct over interactive items", () => {
    expect(
      computeLessonScore([outcome(true), outcome(false), outcome(true)]),
    ).toBe(67);
  });

  it("ignores presentation-style items", () => {
    expect(
      computeLessonScore([
        outcome(true, false),
        outcome(true, false),
        outcome(true),
      ]),
    ).toBe(100);
  });

  it("a lesson with no interactive items scores 100 on completion", () => {
    expect(
      computeLessonScore([outcome(true, false), outcome(true, false)]),
    ).toBe(100);
  });

  it("counts correct interactive answers", () => {
    expect(
      countCorrect([outcome(true), outcome(false), outcome(true, false)]),
    ).toBe(1);
  });
});

describe("vocabStatusAfterExposure", () => {
  it("moves unseen / new words to learning, leaves the rest", () => {
    expect(vocabStatusAfterExposure(null)).toBe("learning");
    expect(vocabStatusAfterExposure("new")).toBe("learning");
    expect(vocabStatusAfterExposure("learning")).toBe("learning");
    expect(vocabStatusAfterExposure("known")).toBe("known");
    expect(vocabStatusAfterExposure("needs_review")).toBe("needs_review");
  });
});

describe("dailyActivityForLesson", () => {
  it("records one lesson, the interactive item count and clamped minutes", () => {
    const delta = dailyActivityForLesson(
      [outcome(true), outcome(false), outcome(true, false)],
      90,
    );
    expect(delta).toEqual({
      lessons_completed: 1,
      items_practiced: 2,
      minutes_spent: 60,
    });
  });
});
