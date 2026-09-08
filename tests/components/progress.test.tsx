import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "@/components/ui/progress";

describe("Progress", () => {
  it("exposes an accessible progressbar with a name and clamped value", () => {
    render(<Progress value={30} max={60} label="A1 Fortschritt" />);
    const bar = screen.getByRole("progressbar", { name: "A1 Fortschritt" });
    expect(bar).toHaveAttribute("aria-valuenow", "50");
  });

  it("never reports below 0 or above 100", () => {
    const { rerender } = render(<Progress value={-10} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    rerender(<Progress value={9999} label="x" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });
});
