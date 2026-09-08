import * as React from "react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import { Avatar } from "@/components/ui/avatar";
import { AudioButton } from "@/components/speaking/audio-button";
import type { ChatMessageModel } from "@/components/chat/types";

type ChatMessageProps = {
  message: ChatMessageModel;
  /** Initials for the assistant character. */
  characterInitials?: string;
  onPlayAudio?: () => void;
  /** e.g. a <CorrectionNote /> rendered under a user message. */
  footer?: React.ReactNode;
  className?: string;
};

function ChatMessage({
  message,
  characterInitials = "AI",
  onPlayAudio,
  footer,
  className,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      {!isUser ? (
        <Avatar initials={characterInitials} size="sm" tone="primary" />
      ) : null}
      <div
        className={cn(
          "flex max-w-[82%] min-w-0 flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "border-border bg-surface text-surface-foreground rounded-bl-sm border",
          )}
        >
          <GermanText
            as="p"
            className={cn(
              "whitespace-pre-wrap",
              // GermanText defaults to ink `text-foreground`; on the red user
              // bubble that fails contrast, so force soft-white there.
              isUser && "text-primary-foreground",
            )}
          >
            {message.content}
          </GermanText>
        </div>
        <div className="flex items-center gap-2 px-1">
          {message.time ? (
            <time className="text-muted-foreground text-[0.6875rem]">
              {message.time}
            </time>
          ) : null}
          {!isUser && message.playable ? (
            <AudioButton
              size="sm"
              variant="ghost"
              onClick={onPlayAudio}
              label="Nachricht vorlesen"
            />
          ) : null}
        </div>
        {footer ? <div className="w-full pt-0.5">{footer}</div> : null}
      </div>
    </div>
  );
}

export { ChatMessage, type ChatMessageProps };
