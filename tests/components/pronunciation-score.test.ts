import { describe, expect, it } from "vitest";
import { bandFor } from "@/components/speaking/pronunciation-score";

describe("bandFor", () => {
  it("maps scores to qualitative bands at the boundaries", () => {
    expect(bandFor(80)).toBe("strong");
    expect(bandFor(79)).toBe("fair");
    expect(bandFor(55)).toBe("fair");
    expect(bandFor(54)).toBe("work");
    expect(bandFor(0)).toBe("work");
  });
});
