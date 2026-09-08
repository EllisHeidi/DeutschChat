import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";

type OptionState = "default" | "selected" | "correct" | "incorrect";

type MultipleChoiceOptionProps = {
  /** "A", "B", … */
  marker?: string;
  children: React.ReactNode;
  state?: OptionState;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

function MultipleChoiceOption({
  marker,
  children,
  state = "default",
  disabled,
  onClick,
  className,
}: MultipleChoiceOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === "selected" || state === "correct"}
      data-state={state}
      className={cn(
        "focus-visible:ring-ring flex w-full items-center gap-3 rounded-lg border px-3.5 py-3 text-left text-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed",
        state === "default" &&
          "border-border-strong bg-surface hover:border-foreground/30 hover:bg-muted/50",
        state === "selected" && "border-primary bg-primary/8",
        state === "correct" && "border-success bg-success/10",
        state === "incorrect" && "border-destructive bg-destructive/8",
        className,
      )}
    >
      {marker ? (
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-md border text-xs font-semibold",
            state === "correct"
              ? "border-success text-success"
              : state === "incorrect"
                ? "border-destructive text-destructive"
                : state === "selected"
                  ? "border-primary text-primary"
                  : "border-border-strong text-muted-foreground",
          )}
        >
          {marker}
        </span>
      ) : null}
      <GermanText as="span" className="min-w-0 flex-1">
        {children}
      </GermanText>
      {state === "correct" ? (
        <Check className="text-success size-4 shrink-0" aria-label="Richtig" />
      ) : state === "incorrect" ? (
        <X className="text-destructive size-4 shrink-0" aria-label="Falsch" />
      ) : null}
    </button>
  );
}

export {
  MultipleChoiceOption,
  type MultipleChoiceOptionProps,
  type OptionState,
};
