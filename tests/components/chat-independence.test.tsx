import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * PRODUCT PRINCIPLE: Chat is independent of Learn. A brand-new user with zero
 * lesson / vocabulary / grammar / skill progress must be able to open Chat
 * and start a real conversation. These checks guard against a lesson-progress
 * gate creeping in — signing in is required to persist a conversation (same
 * as Learn's progress-saving), but Learn progress itself is never checked.
 */

let mockUser: { id: string; email: string | null } | null = {
  id: "11111111-1111-1111-1111-111111111111",
  email: "new@user.de",
};

vi.mock("@/lib/auth/user", () => ({
  getOptionalUser: async () => mockUser,
}));
vi.mock("@/lib/chat/data", () => ({
  loadActiveConversation: async () => ({ conversationId: null, messages: [] }),
}));
vi.mock("@/lib/chat/actions", () => ({
  sendMessage: vi.fn(),
  retryLastReply: vi.fn(),
}));

async function renderChatPage() {
  const { default: ChatPage } = await import("@/app/(app)/chat/page");
  return render(await ChatPage());
}

describe("Chat independence", () => {
  it("a signed-in user with zero lesson progress can open Chat and see the composer", async () => {
    mockUser = {
      id: "11111111-1111-1111-1111-111111111111",
      email: "new@user.de",
    };
    await renderChatPage();
    expect(screen.getByLabelText(/nachricht/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/gesperrt|freischalten|zuerst.*lektion|unlock/i),
    ).not.toBeInTheDocument();
  });

  it("a signed-out visitor sees no lock tied to Learn progress either", async () => {
    mockUser = null;
    const { container } = await renderChatPage();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/gesperrt|freischalten|zuerst.*lektion|unlock/i);
    // Signed-out shows a sign-in prompt, not the composer — that gate is
    // about authentication (same as Learn's progress-saving), never Learn
    // progress itself.
    expect(screen.queryByLabelText(/nachricht/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /anmelden/i })).toBeInTheDocument();
  });

  it("the chat route reads no lesson-progress data", () => {
    const source = readFileSync(
      path.join(process.cwd(), "app/(app)/chat/page.tsx"),
      "utf8",
    );
    expect(source).not.toMatch(
      /user_lesson_progress|getLearnerSnapshot|completedLessons|totalLessons/,
    );
  });

  it("the chat server actions read no lesson-progress data", () => {
    const source = readFileSync(
      path.join(process.cwd(), "lib/chat/actions.ts"),
      "utf8",
    );
    expect(source).not.toMatch(
      /user_lesson_progress|getLearnerSnapshot|completedLessons|totalLessons/,
    );
  });
});
