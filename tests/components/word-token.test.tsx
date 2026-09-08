import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { WordToken } from "@/components/vocabulary/word-token";
import type { VocabularyItem } from "@/components/vocabulary/types";

const base: VocabularyItem = {
  id: "v1",
  word: "heute",
  translation: "today",
  partOfSpeech: "Adverb",
  status: "new",
};

describe("WordToken", () => {
  it("marks new words with a visible 'Neu' indicator, not colour alone", () => {
    render(<WordToken item={base} />);
    expect(screen.getByText("Neu")).toBeInTheDocument();
  });

  it("known words render without the dotted underline class", () => {
    render(<WordToken item={{ ...base, status: "known" }} />);
    expect(screen.getByRole("button")).not.toHaveClass("vocab-underline");
  });

  it("opens the detail popover on activation", async () => {
    render(<WordToken item={base} />);
    await userEvent.click(screen.getByRole("button", { name: /Bedeutung/ }));
    expect(
      await screen.findByRole("button", { name: "Wort speichern" }),
    ).toBeInTheDocument();
  });
});
