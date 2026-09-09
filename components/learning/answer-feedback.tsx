import * as React from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import { RichText } from "@/components/learning/rich-text";
import { RasterIcon, ACTION_ICON } from "@/components/icons/raster-icon";
import type { AnswerCheck } from "@/lib/learning/validate-answer";

/**
 * Feedback for a submitted answer. Correct answers get a quiet green tick;
 * wrong answers explain *why* the answer changed rather than just replacing it
 * — the DeutschChat correction philosophy, the same one Chat will use.
 */
export function AnswerFeedback({
  check,
  original,
  className,
}: {
  check: AnswerCheck;
  /** What the learner typed — shown struck through on a "close" result. */
  original?: string;
  className?: string;
}) {
  if (check.status === "correct") {
    return (
      <p
        className={cn(
          "text-success flex items-center gap-1.5 text-sm font-medium",
          className,
        )}
        role="status"
      >
        <RasterIcon src={ACTION_ICON.correct} className="size-5" />
        Richtig!
      </p>
    );
  }

  const heading = check.status === "close" ? "Fast richtig!" : "Nicht ganz";

  return (
    <div
      role="status"
      className={cn(
        "rounded-lg border px-3.5 py-3 text-sm",
        check.status === "close"
          ? "border-accent/35 bg-accent/10"
          : "border-border bg-muted/40",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold",
          check.status === "close"
            ? "text-accent-strong"
            : "text-muted-foreground",
        )}
      >
        <Lightbulb className="size-3.5" aria-hidden />
        {heading}
      </p>

      <div className="mt-1.5 space-y-1">
        {check.status === "close" && original ? (
          <GermanText
            as="p"
            className="text-muted-foreground decoration-muted-foreground/50 text-xs line-through"
          >
            {original}
          </GermanText>
        ) : null}
        <GermanText as="p" className="text-foreground font-medium">
          {check.suggestion}
        </GermanText>
      </div>

      {check.explanation ? (
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          <span aria-hidden>💡 </span>
          <span className="text-foreground font-medium">Warum? </span>
          <RichText>{check.explanation}</RichText>
        </p>
      ) : null}
    </div>
  );
}
