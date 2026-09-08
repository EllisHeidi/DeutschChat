"use client";

import * as React from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type RecordState = "idle" | "recording" | "processing";

type RecordButtonProps = {
  state?: RecordState;
  onClick?: () => void;
  className?: string;
};

const labels: Record<RecordState, string> = {
  idle: "Aufnahme starten",
  recording: "Aufnahme stoppen",
  processing: "Wird ausgewertet …",
};

/** Large press-to-speak control. Visual only — no microphone access in Phase 1. */
function RecordButton({
  state = "idle",
  onClick,
  className,
}: RecordButtonProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={state === "processing"}
        aria-label={labels[state]}
        data-state={state}
        className={cn(
          "focus-visible:ring-ring focus-visible:ring-offset-background relative grid size-16 place-items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70",
          state === "recording"
            ? "bg-primary text-primary-foreground"
            : "bg-surface text-primary ring-border-strong hover:bg-muted shadow-[0_2px_8px_hsl(var(--shadow-color)/0.14)] ring-1",
        )}
      >
        {state === "recording" ? (
          <span
            className="bg-primary/40 absolute inset-0 animate-ping rounded-full"
            aria-hidden
          />
        ) : null}
        {state === "processing" ? (
          <Loader2 className="size-6 animate-spin" aria-hidden />
        ) : state === "recording" ? (
          <Square className="size-5 fill-current" aria-hidden />
        ) : (
          <Mic className="size-6" aria-hidden />
        )}
      </button>
      <p className="text-muted-foreground text-xs font-medium" aria-hidden>
        {labels[state]}
      </p>
    </div>
  );
}

export { RecordButton, type RecordButtonProps, type RecordState };
