import { describe, expect, it } from "vitest";
import { checkAnswer, normalizeAnswer } from "@/lib/learning/validate-answer";

describe("normalizeAnswer", () => {
  it("lowercases, collapses whitespace and drops trailing sentence marks", () => {
    expect(normalizeAnswer("  Ich   Wohne  in Berlin!  ")).toBe(
      "ich wohne in berlin",
    );
    expect(normalizeAnswer("Ja.")).toBe("ja");
  });
});

describe("checkAnswer", () => {
  const spec = {
    answer: "Ich wohne in Südafrika.",
    acceptable: ["Ich wohne in Suedafrika."],
    explanation: "Bei ich endet das Verb auf -e.",
    commonMistakes: [
      {
        wrong: "Ich wohnen in Südafrika.",
        explanation: "wohnen → ich wohne",
      },
    ],
  };

  it("accepts the canonical answer regardless of case / trailing period", () => {
    expect(checkAnswer("ich wohne in südafrika", spec).status).toBe("correct");
    expect(checkAnswer("Ich wohne in Südafrika", spec).status).toBe("correct");
  });

  it("accepts an explicitly allowed alternative", () => {
    expect(checkAnswer("Ich wohne in Suedafrika.", spec).status).toBe(
      "correct",
    );
  });

  it("flags a known mistake as 'close' with its explanation", () => {
    const r = checkAnswer("Ich wohnen in Südafrika.", spec);
    expect(r.status).toBe("close");
    if (r.status === "close") {
      expect(r.suggestion).toBe("Ich wohne in Südafrika.");
      expect(r.explanation).toContain("ich wohne");
    }
  });

  it("returns 'incorrect' with the model answer for anything else", () => {
    const r = checkAnswer("Ich lebe in Kapstadt.", spec);
    expect(r.status).toBe("incorrect");
    if (r.status === "incorrect") {
      expect(r.suggestion).toBe("Ich wohne in Südafrika.");
      expect(r.explanation).toBeTruthy();
    }
  });

  it("treats an empty answer as incorrect", () => {
    expect(checkAnswer("   ", spec).status).toBe("incorrect");
  });

  it("works for single-word fill-in-the-blank answers", () => {
    const blank = {
      answer: "komme",
      commonMistakes: [{ wrong: "kommen", explanation: "kommen → ich komme" }],
    };
    expect(checkAnswer("Komme", blank).status).toBe("correct");
    expect(checkAnswer("kommen", blank).status).toBe("close");
    expect(checkAnswer("gehe", blank).status).toBe("incorrect");
  });
});
