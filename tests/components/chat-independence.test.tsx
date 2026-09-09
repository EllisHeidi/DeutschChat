import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChatPage from "@/app/(app)/chat/page";

/**
 * PRODUCT PRINCIPLE: Chat is independent of Learn. A brand-new user with zero
 * lesson / vocabulary / grammar / skill progress must be able to open Chat.
 * These checks guard against a gate creeping in.
 */
describe("Chat independence", () => {
  it("renders without any auth, progress or curriculum data", () => {
    render(<ChatPage />);
    expect(screen.getByText(/Chat ist immer offen/i)).toBeInTheDocument();
    expect(screen.getByText(/unabhängig/i)).toBeInTheDocument();
    expect(
      screen.getByText(/brauchst keine abgeschlossene Lektion/i),
    ).toBeInTheDocument();
  });

  it("shows no lock / unlock / 'complete a lesson first' wording", () => {
    const { container } = render(<ChatPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/gesperrt|freischalten|zuerst.*lektion|unlock/i);
  });

  it("the chat route source pulls in no auth gate or progress dependency", () => {
    const source = readFileSync(
      path.join(process.cwd(), "app/(app)/chat/page.tsx"),
      "utf8",
    );
    expect(source).not.toMatch(/getOptionalUser|getAccountContext|redirect\(/);
    expect(source).not.toMatch(
      /user_lesson_progress|getLearnerSnapshot|completedLessons/,
    );
  });
});
