"use server";

import { revalidatePath } from "next/cache";
import { getOptionalUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import {
  generateReply,
  translateWord,
  AiNotConfiguredError,
} from "@/lib/chat/ai";
import type { ChatTurn } from "@/lib/chat/ai";
import type { ChatMessageRow } from "@/lib/chat/data";
import type { CefrLevel } from "@/lib/learning/cefr";

/**
 * Chat server actions. Mirrors the shape of `lib/learning/actions.ts`: the
 * authenticated (RLS-scoped) Supabase client, never the service role. The
 * authenticated user always comes from the server session — a caller can
 * never influence whose conversation is read or written by passing an id.
 *
 * Chat has no lesson/level gate anywhere in this file — the only requirement
 * to persist a conversation is being signed in, exactly like Learn's
 * progress-saving. A user is always free to open Chat regardless of Learn
 * progress.
 */

const GENERIC_ERROR = "Da ist etwas schiefgelaufen. Versuche es erneut.";
const NOT_SIGNED_IN = "Bitte melde dich an, um zu chatten.";
const MAX_MESSAGE_LENGTH = 2000;
const HISTORY_WINDOW = 20;

export type SendMessageResult =
  | {
      ok: true;
      conversationId: string;
      userMessage: ChatMessageRow;
      assistantMessage: ChatMessageRow;
    }
  | {
      ok: false;
      conversationId: string | null;
      userMessage: ChatMessageRow | null;
      error: string;
    };

type Supabase = Awaited<ReturnType<typeof createClient>>;

async function nextSequence(
  supabase: Supabase,
  conversationId: string,
): Promise<number> {
  const { data } = await supabase
    .from("conversation_messages")
    .select("sequence")
    .eq("conversation_id", conversationId)
    .order("sequence", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.sequence ?? 0) + 1;
}

async function bumpConversation(
  supabase: Supabase,
  conversationId: string,
  messageCount: number,
  addedMessages: number,
): Promise<void> {
  await supabase
    .from("conversations")
    .update({
      message_count: messageCount + addedMessages,
      last_message_at: new Date().toISOString(),
    })
    .eq("id", conversationId);
}

async function loadHistory(
  supabase: Supabase,
  conversationId: string,
): Promise<ChatTurn[]> {
  const { data } = await supabase
    .from("conversation_messages")
    .select("sender, content")
    .eq("conversation_id", conversationId)
    .order("sequence", { ascending: false })
    .limit(HISTORY_WINDOW);
  return (data ?? [])
    .filter((m) => m.sender === "user" || m.sender === "assistant")
    .reverse()
    .map((m) => ({
      role: m.sender as "user" | "assistant",
      content: m.content,
    }));
}

async function currentLearnerLevel(
  supabase: Supabase,
  userId: string,
): Promise<CefrLevel> {
  const { data } = await supabase
    .from("learner_profiles")
    .select("current_level")
    .eq("id", userId)
    .maybeSingle();
  return data?.current_level ?? "A1";
}

function aiErrorMessage(error: unknown): string {
  if (error instanceof AiNotConfiguredError) {
    return "Der KI-Gesprächspartner ist noch nicht eingerichtet.";
  }
  return "Die Antwort konnte gerade nicht erstellt werden. Versuche es erneut.";
}

/**
 * Sends a user message and gets the AI's reply.
 *
 * Pass `conversationId: null` to start a new conversation with this message
 * — Chat has no separate "create conversation" step in Step 6, the first
 * message a user sends creates it.
 *
 * The user message is always saved before the AI is called, so it is never
 * lost even if the AI request fails — the caller can retry via
 * `retryLastReply` without resubmitting the text.
 */
export async function sendMessage(
  conversationId: string | null,
  rawContent: string,
): Promise<SendMessageResult> {
  const user = await getOptionalUser();
  if (!user) {
    return {
      ok: false,
      conversationId,
      userMessage: null,
      error: NOT_SIGNED_IN,
    };
  }

  const content = rawContent.trim();
  if (!content) {
    return {
      ok: false,
      conversationId,
      userMessage: null,
      error: "Schreib zuerst eine Nachricht.",
    };
  }
  if (content.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      conversationId,
      userMessage: null,
      error: `Deine Nachricht ist zu lang (maximal ${MAX_MESSAGE_LENGTH} Zeichen).`,
    };
  }

  const supabase = await createClient();

  let convId = conversationId;
  if (convId) {
    // Ownership check — a client-supplied id must belong to this user.
    // RLS would block a cross-user write anyway; this makes the intent
    // explicit and returns a clean error instead of a raw RLS failure.
    const { data: conversation } = await supabase
      .from("conversations")
      .select("id")
      .eq("id", convId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (!conversation) {
      return {
        ok: false,
        conversationId: null,
        userMessage: null,
        error: GENERIC_ERROR,
      };
    }
  } else {
    const { data: conversation, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id })
      .select("id")
      .single();
    if (error || !conversation) {
      return {
        ok: false,
        conversationId: null,
        userMessage: null,
        error: GENERIC_ERROR,
      };
    }
    convId = conversation.id;
  }

  const userSeq = await nextSequence(supabase, convId);
  const { data: userMessage, error: userInsertError } = await supabase
    .from("conversation_messages")
    .insert({
      conversation_id: convId,
      user_id: user.id,
      sender: "user",
      content,
      sequence: userSeq,
    })
    .select()
    .single();
  if (userInsertError || !userMessage) {
    return {
      ok: false,
      conversationId: convId,
      userMessage: null,
      error: GENERIC_ERROR,
    };
  }
  await bumpConversation(supabase, convId, userSeq - 1, 1);

  try {
    const history = await loadHistory(supabase, convId);
    const learnerLevel = await currentLearnerLevel(supabase, user.id);
    const reply = await generateReply({ history, learnerLevel });

    const { data: assistantMessage, error: aiInsertError } = await supabase
      .from("conversation_messages")
      .insert({
        conversation_id: convId,
        user_id: user.id,
        sender: "assistant",
        content: reply,
        sequence: userSeq + 1,
      })
      .select()
      .single();
    if (aiInsertError || !assistantMessage) throw new Error("persist-failed");

    await bumpConversation(supabase, convId, userSeq, 1);
    revalidatePath("/chat");
    return { ok: true, conversationId: convId, userMessage, assistantMessage };
  } catch (error) {
    revalidatePath("/chat");
    return {
      ok: false,
      conversationId: convId,
      userMessage,
      error: aiErrorMessage(error),
    };
  }
}

/**
 * Re-attempts the AI reply for the conversation's last message, without
 * resubmitting the user's text. Only valid when the last message is still
 * unanswered (sender is "user").
 */
export async function retryLastReply(
  conversationId: string,
): Promise<SendMessageResult> {
  const user = await getOptionalUser();
  if (!user) {
    return {
      ok: false,
      conversationId,
      userMessage: null,
      error: NOT_SIGNED_IN,
    };
  }

  const supabase = await createClient();
  const { data: conversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!conversation) {
    return {
      ok: false,
      conversationId: null,
      userMessage: null,
      error: GENERIC_ERROR,
    };
  }

  const { data: last } = await supabase
    .from("conversation_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("sequence", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!last || last.sender !== "user") {
    return {
      ok: false,
      conversationId,
      userMessage: last ?? null,
      error: GENERIC_ERROR,
    };
  }

  try {
    const history = await loadHistory(supabase, conversationId);
    const learnerLevel = await currentLearnerLevel(supabase, user.id);
    const reply = await generateReply({ history, learnerLevel });

    const { data: assistantMessage, error: aiInsertError } = await supabase
      .from("conversation_messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        sender: "assistant",
        content: reply,
        sequence: last.sequence + 1,
      })
      .select()
      .single();
    if (aiInsertError || !assistantMessage) throw new Error("persist-failed");

    await bumpConversation(supabase, conversationId, last.sequence, 1);
    revalidatePath("/chat");
    return {
      ok: true,
      conversationId,
      userMessage: last,
      assistantMessage,
    };
  } catch (error) {
    return {
      ok: false,
      conversationId,
      userMessage: last,
      error: aiErrorMessage(error),
    };
  }
}

/**
 * Clears the signed-in user's active conversation from view. Non-destructive
 * — marks it `abandoned` rather than deleting rows, so the next message
 * starts a fresh conversation (mirrors how `sendMessage(null, ...)` already
 * creates one). A no-op, not an error, when there's nothing active.
 */
export async function clearActiveConversation(): Promise<{ ok: boolean }> {
  const user = await getOptionalUser();
  if (!user) return { ok: false };

  const supabase = await createClient();
  const { error } = await supabase
    .from("conversations")
    .update({ status: "abandoned" })
    .eq("user_id", user.id)
    .eq("status", "active");

  revalidatePath("/chat");
  return { ok: !error };
}

export type TranslateWordResult =
  { ok: true; translation: string } | { ok: false; error: string };

/**
 * Translates a single word/phrase tapped in one of Lena's messages. Requires
 * sign-in (this spends real API credits, so it shouldn't be a public
 * endpoint) but is otherwise unrelated to conversation ownership — no
 * database access at all, just a pass-through to the AI provider.
 */
export async function translateChatWord(
  word: string,
  sentence: string,
): Promise<TranslateWordResult> {
  const user = await getOptionalUser();
  if (!user) return { ok: false, error: NOT_SIGNED_IN };

  const cleaned = word.trim();
  if (!cleaned || cleaned.length > 100) {
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    const translation = await translateWord(cleaned, sentence.slice(0, 500));
    return { ok: true, translation };
  } catch (error) {
    return { ok: false, error: aiErrorMessage(error) };
  }
}
