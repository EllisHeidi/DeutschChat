import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type ChatMessageRow = Tables<"conversation_messages">;

export type ActiveConversation = {
  conversationId: string | null;
  messages: ChatMessageRow[];
};

/**
 * The signed-in user's single ongoing conversation, or an empty shell if they
 * have never chatted yet. Step 6 keeps one active conversation per user —
 * there is no scenario content yet to justify a conversation list/switcher
 * (see docs/STEP-6-CHECKPOINT.md).
 *
 * Runs as the authenticated user (RLS-scoped) — never the service role.
 */
export async function loadActiveConversation(
  userId: string,
): Promise<ActiveConversation> {
  const supabase = await createClient();

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("last_message_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!conversation) return { conversationId: null, messages: [] };

  const { data: messages } = await supabase
    .from("conversation_messages")
    .select("*")
    .eq("conversation_id", conversation.id)
    .order("sequence", { ascending: true });

  return { conversationId: conversation.id, messages: messages ?? [] };
}
