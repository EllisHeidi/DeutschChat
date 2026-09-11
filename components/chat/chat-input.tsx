"use client";

import * as React from "react";
import { Mic, Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { IconButton } from "@/components/ui/icon-button";

const SPECIAL_CHARS = ["ä", "ö", "ü", "ß"] as const;

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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !disabled;

  function submit() {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue("");
  }

  /** Inserts a character at the cursor (or replaces a selection), then restores focus there. */
  function insertChar(char: string) {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const next = value.slice(0, start) + char + value.slice(end);
    setValue(next);
    requestAnimationFrame(() => {
      const pos = start + char.length;
      el?.focus();
      el?.setSelectionRange(pos, pos);
    });
  }

  return (
    <div className={cn("border-border bg-surface border-t", className)}>
      <div
        className="flex gap-1.5 px-2.5 pt-2"
        role="group"
        aria-label="Sonderzeichen einfügen"
      >
        {SPECIAL_CHARS.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => insertChar(char)}
            disabled={disabled}
            aria-label={`„${char}“ einfügen`}
            className="text-foreground hover:bg-muted active:bg-muted border-border-strong grid size-7 shrink-0 place-items-center rounded-md border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {char}
          </button>
        ))}
      </div>
      <form
        className="flex items-end gap-2 p-2.5"
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
          ref={textareaRef}
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
    </div>
  );
}

export { ChatInput, type ChatInputProps };
