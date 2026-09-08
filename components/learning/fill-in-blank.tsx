"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";

type FillInBlankProps = {
  /** Sentence parts around a single blank: ["Ich ", " aus Berlin."] */
  before: string;
  after: string;
  value?: string;
  placeholder?: string;
  state?: "default" | "correct" | "incorrect";
  onChange?: (value: string) => void;
  /** Accessible label for the input. */
  label: string;
  className?: string;
};

function FillInBlank({
  before,
  after,
  value,
  placeholder = "…",
  state = "default",
  onChange,
  label,
  className,
}: FillInBlankProps) {
  return (
    <p
      className={cn("text-foreground text-lg leading-loose", className)}
      lang="de"
    >
      <GermanText as="span">{before}</GermanText>
      <input
        type="text"
        aria-label={label}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        aria-invalid={state === "incorrect" || undefined}
        size={Math.max(6, (value?.length ?? 0) + 2)}
        className={cn(
          "mx-1 inline-block min-w-16 rounded-md border-b-2 bg-transparent px-1.5 pb-0.5 text-center text-base font-medium transition-colors outline-none",
          "focus-visible:border-primary",
          state === "default" && "border-border-strong",
          state === "correct" && "border-success text-success",
          state === "incorrect" && "border-destructive text-destructive",
        )}
      />
      <GermanText as="span">{after}</GermanText>
    </p>
  );
}

export { FillInBlank, type FillInBlankProps };
