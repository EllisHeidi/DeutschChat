import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `lib/chat/actions.ts` against a tiny in-memory fake of the Supabase
 * query-builder shape actually used (select/eq/order/limit/maybeSingle/
 * single/insert/update). Exercises the real ownership checks, sequencing and
 * error handling — not a UI-only bypass.
 */

type Row = Record<string, unknown>;
type Tables = {
  conversations: Row[];
  conversation_messages: Row[];
  learner_profiles: Row[];
};

let idCounter = 0;

function makeFakeSupabase(tables: Tables) {
  function builder(tableName: keyof Tables) {
    const filters: [string, unknown][] = [];
    const orderSpec: { col: string; ascending: boolean }[] = [];
    let limitN: number | null = null;
    let insertedRow: Row | null = null;

    function rows(): Row[] {
      let r = tables[tableName].filter((row) =>
        filters.every(([col, val]) => row[col] === val),
      );
      for (const { col, ascending } of [...orderSpec].reverse()) {
        r = [...r].sort((a, b) => {
          const av = a[col] as string | number;
          const bv = b[col] as string | number;
          if (av === bv) return 0;
          const cmp = av < bv ? -1 : 1;
          return ascending ? cmp : -cmp;
        });
      }
      if (limitN !== null) r = r.slice(0, limitN);
      return r;
    }

    const api = {
      select() {
        return api;
      },
      eq(col: string, val: unknown) {
        filters.push([col, val]);
        return api;
      },
      order(col: string, opts?: { ascending?: boolean }) {
        orderSpec.push({ col, ascending: opts?.ascending ?? true });
        return api;
      },
      limit(n: number) {
        limitN = n;
        return api;
      },
      async maybeSingle() {
        return { data: rows()[0] ?? null, error: null };
      },
      async single() {
        if (insertedRow) return { data: insertedRow, error: null };
        const r = rows()[0];
        return r
          ? { data: r, error: null }
          : { data: null, error: { message: "not found" } };
      },
      insert(payload: Row) {
        const row: Row = {
          id: `row-${++idCounter}`,
          created_at: new Date().toISOString(),
          message_count: 0,
          last_message_at: null,
          status: "active",
          mode: "normal",
          ...payload,
        };
        tables[tableName].push(row);
        insertedRow = row;
        return api;
      },
      update(payload: Row) {
        return {
          async eq(col: string, val: unknown) {
            tables[tableName]
              .filter((r) => r[col] === val)
              .forEach((r) => Object.assign(r, payload));
            return { data: null, error: null };
          },
        };
      },
      then(
        resolve: (v: { data: Row[]; error: null }) => unknown,
        reject: (e: unknown) => unknown,
      ) {
        return Promise.resolve({ data: rows(), error: null }).then(
          resolve,
          reject,
        );
      },
    };
    return api;
  }

  return { from: (name: keyof Tables) => builder(name) };
}

class FakeAiNotConfiguredError extends Error {
  constructor() {
    super("not configured");
    this.name = "AiNotConfiguredError";
  }
}

let mockUser: { id: string; email: string | null } | null;
let tables: Tables;
let generateReplyImpl: () => Promise<string>;

vi.mock("@/lib/auth/user", () => ({
  getOptionalUser: async () => mockUser,
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => makeFakeSupabase(tables),
}));
vi.mock("@/lib/chat/ai", () => ({
  AiNotConfiguredError: FakeAiNotConfiguredError,
  generateReply: async () => generateReplyImpl(),
}));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

const USER = { id: "user-1", email: "user1@test.de" };
const OTHER_USER = { id: "user-2", email: "user2@test.de" };

async function load() {
  return import("@/lib/chat/actions");
}

beforeEach(() => {
  mockUser = USER;
  tables = {
    conversations: [],
    conversation_messages: [],
    learner_profiles: [],
  };
  generateReplyImpl = async () => {
    throw new FakeAiNotConfiguredError();
  };
  vi.resetModules();
});

describe("sendMessage", () => {
  it("rejects when nobody is signed in, and persists nothing", async () => {
    mockUser = null;
    const { sendMessage } = await load();
    const res = await sendMessage(null, "Hallo!");
    expect(res).toEqual(
      expect.objectContaining({
        ok: false,
        error: expect.stringMatching(/melde dich an/i),
      }),
    );
    expect(tables.conversations).toHaveLength(0);
  });

  it("rejects empty content without touching the database", async () => {
    const { sendMessage } = await load();
    const res = await sendMessage(null, "   ");
    expect(res.ok).toBe(false);
    expect(tables.conversation_messages).toHaveLength(0);
  });

  it("creates a conversation and saves the user message even when the AI is not configured", async () => {
    const { sendMessage } = await load();
    const res = await sendMessage(null, "Hallo! Ich heiße Heidi.");

    expect(res.ok).toBe(false);
    expect(res.userMessage?.content).toBe("Hallo! Ich heiße Heidi.");
    if (!res.ok) expect(res.error).toMatch(/noch nicht eingerichtet/);

    expect(tables.conversations).toHaveLength(1);
    expect(tables.conversations[0]).toMatchObject({ user_id: USER.id });
    expect(tables.conversation_messages).toHaveLength(1);
    expect(tables.conversation_messages[0]).toMatchObject({
      sender: "user",
      sequence: 1,
    });
  });

  it("saves both the user message and the AI reply on success", async () => {
    generateReplyImpl = async () => "Hallo Heidi! Wie geht es dir?";
    const { sendMessage } = await load();
    const res = await sendMessage(null, "Hallo!");

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.assistantMessage.content).toBe(
        "Hallo Heidi! Wie geht es dir?",
      );
      expect(res.assistantMessage.sequence).toBe(2);
    }
    expect(tables.conversation_messages).toHaveLength(2);
    expect(tables.conversations[0]).toMatchObject({ message_count: 2 });
  });

  it("a user cannot send into another user's conversation by passing its id", async () => {
    const { sendMessage } = await load();

    mockUser = OTHER_USER;
    const other = await sendMessage(null, "Hallo from other user");
    expect(other.conversationId).toBeTruthy();
    const otherConversationId = other.conversationId as string;

    mockUser = USER;
    const res = await sendMessage(otherConversationId, "Ich will das lesen");

    expect(res.ok).toBe(false);
    expect(res.conversationId).toBeNull();
    // Only the original owner's message exists — nothing got appended.
    expect(tables.conversation_messages).toHaveLength(1);
    expect(tables.conversation_messages[0]).toMatchObject({
      user_id: OTHER_USER.id,
    });
  });
});

describe("retryLastReply", () => {
  it("does nothing when the last message is already answered", async () => {
    const { sendMessage } = await load();
    generateReplyImpl = async () => "Hi!";
    const first = await sendMessage(null, "Hallo!");
    expect(first.ok).toBe(true);
    const conversationId = first.conversationId as string;

    const { retryLastReply } = await load();
    const res = await retryLastReply(conversationId);
    expect(res.ok).toBe(false);
    expect(tables.conversation_messages).toHaveLength(2);
  });

  it("answers the last unanswered user message without resubmitting it", async () => {
    const { sendMessage, retryLastReply } = await load();
    const first = await sendMessage(null, "Hallo!");
    expect(first.ok).toBe(false); // AI not configured yet
    const conversationId = first.conversationId as string;
    expect(tables.conversation_messages).toHaveLength(1);

    generateReplyImpl = async () => "Hallo! Schön dich kennenzulernen.";
    const retried = await retryLastReply(conversationId);

    expect(retried.ok).toBe(true);
    if (retried.ok) {
      expect(retried.assistantMessage.sequence).toBe(2);
      expect(retried.userMessage.content).toBe("Hallo!");
    }
    expect(tables.conversation_messages).toHaveLength(2);
  });
});
