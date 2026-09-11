import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

// `server-only`'s default export throws unconditionally under plain Node
// resolution — it only becomes a no-op under Next's build-time
// "react-server" bundler condition, which Vitest doesn't set. Mock it the
// way that condition would resolve it, so the real lib/chat/ai.ts can be
// imported here.
vi.mock("server-only", () => ({}));

/** Recursively lists .ts/.tsx files under `dir`, skipping node_modules-style noise. */
function listSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...listSourceFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry) && !entry.endsWith(".test.ts")) {
      out.push(full);
    }
  }
  return out;
}

/**
 * `lib/chat/ai.ts` against a mocked OpenAI SDK — no real API calls. Verifies
 * the Responses API is used (not Chat Completions), the configured model,
 * that the system prompt + history are passed through, and that a missing
 * key fails safely instead of faking a reply.
 */

const createMock = vi.fn();

vi.mock("openai", () => ({
  default: class FakeOpenAI {
    responses = { create: createMock };
    constructor(public opts: { apiKey: string }) {}
  },
}));

let apiKey: string | undefined = "sk-test-key";
vi.mock("@/env", () => ({
  env: {
    get OPENAI_API_KEY() {
      return apiKey;
    },
  },
}));

async function load() {
  return import("@/lib/chat/ai");
}

beforeEach(() => {
  apiKey = "sk-test-key";
  createMock.mockReset();
  createMock.mockResolvedValue({ output_text: "Hallo! Wie geht es dir?" });
});

describe("generateReply", () => {
  it("calls the OpenAI Responses API with the configured model", async () => {
    const { generateReply } = await load();
    await generateReply({
      history: [{ role: "user", content: "Hallo!" }],
      learnerLevel: "A1",
    });

    expect(createMock).toHaveBeenCalledTimes(1);
    const call = createMock.mock.calls[0]![0];
    expect(call.model).toBe("gpt-5.6-luna");
  });

  it("passes the system prompt as instructions and the history as input", async () => {
    const { generateReply } = await load();
    await generateReply({
      history: [
        { role: "user", content: "Hallo!" },
        { role: "assistant", content: "Hallo! Wie geht's?" },
        { role: "user", content: "Gut, danke!" },
      ],
      learnerLevel: "A2",
    });

    const call = createMock.mock.calls[0]![0];
    expect(call.instructions).toEqual(expect.stringContaining("A2"));
    expect(call.input).toEqual([
      { role: "user", content: "Hallo!" },
      { role: "assistant", content: "Hallo! Wie geht's?" },
      { role: "user", content: "Gut, danke!" },
    ]);
  });

  it("returns the trimmed output_text", async () => {
    createMock.mockResolvedValue({ output_text: "  Hallo Heidi! 😊  " });
    const { generateReply } = await load();
    const reply = await generateReply({
      history: [{ role: "user", content: "Hi" }],
      learnerLevel: "A1",
    });
    expect(reply).toBe("Hallo Heidi! 😊");
  });

  it("throws AiNotConfiguredError when OPENAI_API_KEY is missing, without calling OpenAI", async () => {
    apiKey = undefined;
    const { generateReply, AiNotConfiguredError } = await load();
    await expect(
      generateReply({ history: [], learnerLevel: "A1" }),
    ).rejects.toThrow(AiNotConfiguredError);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("throws rather than returning a fake reply when the response has no text", async () => {
    createMock.mockResolvedValue({ output_text: "" });
    const { generateReply } = await load();
    await expect(
      generateReply({
        history: [{ role: "user", content: "Hi" }],
        learnerLevel: "A1",
      }),
    ).rejects.toThrow();
  });

  it("propagates a provider failure rather than swallowing it into a fake reply", async () => {
    createMock.mockRejectedValue(new Error("rate limited"));
    const { generateReply } = await load();
    await expect(
      generateReply({
        history: [{ role: "user", content: "Hi" }],
        learnerLevel: "A1",
      }),
    ).rejects.toThrow();
  });
});

describe("provider isolation", () => {
  it("uses the Responses API, not Chat Completions", () => {
    const source = readFileSync(
      path.join(process.cwd(), "lib/chat/ai.ts"),
      "utf8",
    );
    expect(source).toMatch(/responses\.create/);
    expect(source).not.toMatch(/chat\.completions\.create/);
  });

  it("is the only file in the app that imports the openai package", () => {
    const root = process.cwd();
    const files = [
      ...listSourceFiles(path.join(root, "app")),
      ...listSourceFiles(path.join(root, "components")),
      ...listSourceFiles(path.join(root, "lib")),
    ];
    const importers = files
      .filter((f) => /from ["']openai["']/.test(readFileSync(f, "utf8")))
      .map((f) => path.relative(root, f).replace(/\\/g, "/"));
    expect(importers).toEqual(["lib/chat/ai.ts"]);
  });

  it("no client component references OPENAI_API_KEY or the openai package", () => {
    const source = readFileSync(
      path.join(process.cwd(), "components/chat/chat-thread.tsx"),
      "utf8",
    );
    expect(source).not.toMatch(/OPENAI_API_KEY|from "openai"/);
  });
});
