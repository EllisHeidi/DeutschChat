import { describe, expect, it } from "vitest";
import {
  CEFR_LEVELS,
  compareCefrLevels,
  isCefrLevel,
  isFreeLevel,
  isPremiumLevel,
  nextCefrLevel,
} from "@/lib/learning/cefr";

describe("cefr helpers", () => {
  it("lists the five levels in ascending order", () => {
    expect([...CEFR_LEVELS]).toEqual(["A1", "A2", "B1", "B2", "C1"]);
  });

  it("treats only A1 as free", () => {
    expect(isFreeLevel("A1")).toBe(true);
    for (const level of ["A2", "B1", "B2", "C1"] as const) {
      expect(isFreeLevel(level)).toBe(false);
      expect(isPremiumLevel(level)).toBe(true);
    }
  });

  it("narrows unknown strings", () => {
    expect(isCefrLevel("A1")).toBe(true);
    expect(isCefrLevel("A0")).toBe(false);
    expect(isCefrLevel("c1")).toBe(false);
  });

  it("orders levels", () => {
    expect(compareCefrLevels("A1", "B1")).toBe(-1);
    expect(compareCefrLevels("B1", "B1")).toBe(0);
    expect(compareCefrLevels("C1", "A2")).toBe(1);
  });

  it("walks to the next level and stops at the top", () => {
    expect(nextCefrLevel("A1")).toBe("A2");
    expect(nextCefrLevel("B2")).toBe("C1");
    expect(nextCefrLevel("C1")).toBeNull();
  });
});
