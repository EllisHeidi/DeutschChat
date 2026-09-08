import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges conditional classes", () => {
    expect(cn("px-2", false && "hidden", "py-1")).toBe("px-2 py-1");
  });

  it("resolves conflicting Tailwind classes last-wins", () => {
    expect(cn("px-2 px-4")).toBe("px-4");
  });
});
