"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import {
  RasterIcon,
  ILLUSTRATION,
  CHARACTER,
} from "@/components/icons/raster-icon";
import { sendMessage, retryLastReply } from "@/lib/chat/actions";
import type { ChatMessageRow } from "@/lib/chat/data";
import type { ChatMessageModel } from "@/components/chat/types";

const timeFormat = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
});

function toModel(row: ChatMessageRow): ChatMessageModel {
  return {
    id: row.id,
    role: row.sender === "user" ? "user" : "assistant",
    content: row.content,
    time: timeFormat.format(new Date(row.created_at)),
  };
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-center">
      <RasterIcon src={ILLUSTRATION.noConversations} className="h-16 w-auto" />
      <p className="text-muted-foreground max-w-xs text-xs">
        Just start writing — in German or English, whichever you like. Lena will
        reply in German.
      </p>
      <div className="border-accent/35 bg-accent/10 max-w-xs rounded-xl border p-3 text-left">
        <div className="flex items-center gap-2">
          <p className="text-foreground text-xs font-semibold">
            Chat is always open
          </p>
          <Badge variant="free" size="sm">
            independent
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-[0.6875rem] leading-relaxed">
          You don&apos;t need a completed lesson. What you practice here still
          feeds into your learning profile.
        </p>
      </div>
    </div>
  );
}

export function ChatThread({
  initialConversationId,
  initialMessages,
}: {
  initialConversationId: string | null;
  initialMessages: ChatMessageRow[];
}) {
  const [conversationId, setConversationId] = React.useState(
    initialConversationId,
  );
  const [messages, setMessages] = React.useState<ChatMessageModel[]>(() =>
    initialMessages.map(toModel),
  );
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const canRetry =
    error !== null &&
    conversationId !== null &&
    messages.length > 0 &&
    messages[messages.length - 1]!.role === "user";

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, pending, error]);

  async function handleSend(text: string) {
    setError(null);
    setPending(true);
    const result = await sendMessage(conversationId, text);
    setPending(false);

    if (result.conversationId) setConversationId(result.conversationId);
    if (result.userMessage) {
      setMessages((prev) => [...prev, toModel(result.userMessage!)]);
    }
    if (result.ok) {
      setMessages((prev) => [...prev, toModel(result.assistantMessage)]);
    } else {
      setError(result.error);
    }
  }

  async function handleRetry() {
    if (!conversationId) return;
    setError(null);
    setPending(true);
    const result = await retryLastReply(conversationId);
    setPending(false);

    if (result.ok) {
      setMessages((prev) => [...prev, toModel(result.assistantMessage)]);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className="bg-background/40 flex min-h-0 flex-1 flex-col space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && !pending ? (
          <EmptyState />
        ) : (
          messages.map((m) => (
            <ChatMessage
              key={m.id}
              message={m}
              characterInitials="LE"
              characterAvatar={CHARACTER.lena}
            />
          ))
        )}
        {pending ? (
          <TypingIndicator
            characterName="Lena"
            characterInitials="LE"
            characterAvatar={CHARACTER.lena}
          />
        ) : null}
        {error ? (
          <div
            role="alert"
            className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-2 rounded-md border px-3 py-2 text-sm"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div className="flex-1 space-y-1">
              <p>{error}</p>
              {canRetry ? (
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={pending}
                  className="text-destructive font-medium underline underline-offset-2 disabled:opacity-60"
                >
                  Erneut versuchen
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <ChatInput disabled={pending} onSend={handleSend} />
    </div>
  );
}
