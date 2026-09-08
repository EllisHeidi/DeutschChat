"use client";

import * as React from "react";
import { Mic, Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { IconButton } from "@/components/ui/icon-button";

type ChatInputProps = {
  placeholder?: string;
  disabled?: boolean;
  recording?: boolean;
  onSend?: (text: string) => void;
  onToggleRecording?: () => void;
  className?: string;
};

function ChatInput({
  placeholder = "Auf Deutsch antworten …",
  disabled,
  recording = false,
  onSend,
  onToggleRecording,
  className,
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const canSend = value.trim().length > 0 && !disabled;

  function submit() {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue("");
  }

  return (
    <form
      className={cn(
        "border-border bg-surface flex items-end gap-2 border-t p-2.5",
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <IconButton
        icon={recording ? Square : Mic}
        label={recording ? "Aufnahme stoppen" : "Sprachaufnahme starten"}
        onClick={onToggleRecording}
        aria-pressed={recording}
        className={cn(
          recording && "bg-primary/12 text-primary hover:bg-primary/20",
        )}
      />
      <Textarea
        aria-label="Nachricht"
        rows={1}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        className="max-h-32 min-h-11 flex-1 py-2.5"
      />
      <IconButton
        icon={Send}
        label="Senden"
        variant="primary"
        type="submit"
        disabled={!canSend}
      />
    </form>
  );
}

export { ChatInput, type ChatInputProps };
