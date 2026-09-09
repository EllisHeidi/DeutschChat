import { describe, expect, it } from "vitest";
import {
  curriculum,
  findGrammar,
  findLesson,
  findVocab,
  lessonVocabLemmas,
} from "@/content/curriculum";
import { getDemoLesson } from "@/content/curriculum/demo";
import {
  isSupportedItemType,
  parseItemContent,
} from "@/lib/learning/lesson-content";

describe("A1 curriculum structure", () => {
  it("has A1.1 with the four Erste-Schritte lessons in order", () => {
    const unit = curriculum.units.find((u) => u.slug === "erste-schritte");
    expect(unit?.published).toBe(true);
    expect(unit?.lessons.map((l) => l.slug)).toEqual([
      "begruessungen",
      "sich-vorstellen",
      "zahlen-alter",
      "laender-sprachen",
    ]);
  });

  it("carries A1.2 and A1.3 as unpublished structure", () => {
    const later = curriculum.units.filter((u) => !u.published);
    expect(later.map((u) => u.slug)).toEqual([
      "mein-alltag",
      "im-echten-leben",
    ]);
    expect(later.every((u) => u.lessons.length === 4)).toBe(true);
    expect(
      later.every((u) => u.lessons.every((l) => l.items.length === 0)),
    ).toBe(true);
  });

  it("gives every published lesson a real spread of activities", () => {
    const unit = findLesson("erste-schritte", "begruessungen")!.unit;
    for (const lesson of unit.lessons) {
      expect(lesson.items.length).toBeGreaterThanOrEqual(6);
      const types = new Set(lesson.items.map((i) => i.itemType));
      expect(types.size).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("content integrity", () => {
  it("every lesson item validates against its schema", () => {
    for (const unit of curriculum.units) {
      for (const lesson of unit.lessons) {
        lesson.items.forEach((item, i) => {
          expect(isSupportedItemType(item.itemType)).toBe(true);
          expect(() =>
            parseItemContent(item.itemType, item.content),
          ).not.toThrow(`${unit.slug}/${lesson.slug} #${i + 1}`);
        });
      }
    }
  });

  it("every vocab / grammar / token reference resolves", () => {
    for (const unit of curriculum.units) {
      for (const lesson of unit.lessons) {
        for (const item of lesson.items) {
          for (const lemma of item.vocab ?? []) {
            expect(findVocab(lemma), lemma).toBeTruthy();
          }
          for (const slug of item.grammar ?? []) {
            expect(findGrammar(slug), slug).toBeTruthy();
          }
          if (item.itemType === "flashcard") {
            expect(findVocab(item.content.lemma)).toBeTruthy();
          }
          if (item.itemType === "presentation") {
            for (const tok of item.content.tokens ?? []) {
              expect(findVocab(tok.lemma), tok.lemma).toBeTruthy();
              expect(item.content.german).toContain(tok.surface);
            }
          }
        }
      }
    }
  });

  it("multiple-choice / listening items have exactly one correct option", () => {
    for (const unit of curriculum.units) {
      for (const lesson of unit.lessons) {
        for (const item of lesson.items) {
          if (
            item.itemType === "multiple_choice" ||
            item.itemType === "listening"
          ) {
            const correct = item.content.options.filter((o) => o.correct);
            expect(correct.length).toBe(1);
          }
        }
      }
    }
  });

  it("lessonVocabLemmas collects lemmas from items and flashcards", () => {
    const { lesson } = findLesson("erste-schritte", "sich-vorstellen")!;
    const lemmas = lessonVocabLemmas(lesson);
    expect(lemmas).toContain("heißen");
    expect(lemmas).toContain("wohnen");
  });
});

describe("demo lesson", () => {
  it("is a short, standalone run that parses and highlights vocab", () => {
    const { lesson, vocab } = getDemoLesson();
    expect(lesson.items.length).toBeGreaterThanOrEqual(5);
    expect(lesson.items.length).toBeLessThanOrEqual(8);
    expect(Object.keys(vocab).length).toBeGreaterThan(0);
    expect(lesson.items.some((i) => i.itemType === "writing_prompt")).toBe(
      true,
    );
    expect(lesson.items.some((i) => i.itemType === "speaking")).toBe(true);
  });
});
