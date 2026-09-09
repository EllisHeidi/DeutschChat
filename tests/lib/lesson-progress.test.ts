import { describe, expect, it } from "vitest";
import {
  computeLessonScore,
  countCorrect,
  dailyActivityForLesson,
  grammarStatusAfterOutcomes,
  isLessonComplete,
  nudgeSkillScore,
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

describe("nudgeSkillScore", () => {
  it("pulls a rolling score toward the latest result without overshooting", () => {
    expect(nudgeSkillScore(0, 100)).toBe(25);
    expect(nudgeSkillScore(40, 80)).toBe(50);
    expect(nudgeSkillScore(60, 60)).toBe(60);
  });

  it("never regresses on a result that is at least as good", () => {
    expect(nudgeSkillScore(80, 80)).toBe(80);
    expect(nudgeSkillScore(50, 90)).toBeGreaterThanOrEqual(50);
  });

  it("clamps to 0–100", () => {
    expect(nudgeSkillScore(0, 0)).toBe(0);
    expect(nudgeSkillScore(100, 100)).toBe(100);
  });
});

describe("grammarStatusAfterOutcomes", () => {
  it("first exposure with a correct answer starts learning", () => {
    expect(grammarStatusAfterOutcomes(null, 1, 0)).toBe("learning");
    expect(grammarStatusAfterOutcomes(null, 0, 0)).toBe("learning");
  });

  it("repeated success from learning reaches mastered", () => {
    expect(grammarStatusAfterOutcomes("learning", 2, 0)).toBe("mastered");
    expect(grammarStatusAfterOutcomes("learning", 1, 0)).toBe("learning");
  });

  it("more wrong than right drops to weak", () => {
    expect(grammarStatusAfterOutcomes("learning", 1, 2)).toBe("weak");
    expect(grammarStatusAfterOutcomes("mastered", 0, 1)).toBe("weak");
  });

  it("mastered holds on a clean run", () => {
    expect(grammarStatusAfterOutcomes("mastered", 3, 0)).toBe("mastered");
    expect(grammarStatusAfterOutcomes("mastered", 0, 0)).toBe("mastered");
  });
});
