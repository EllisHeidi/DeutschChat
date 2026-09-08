import * as React from "react";
import { CircleCheck, CircleDot, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Band = "strong" | "fair" | "work";

function bandFor(score: number): Band {
  if (score >= 80) return "strong";
  if (score >= 55) return "fair";
  return "work";
}

const bandConfig: Record<
  Band,
  { label: string; icon: LucideIcon; text: string; ring: string }
> = {
  strong: {
    label: "Sehr gut",
    icon: CircleCheck,
    text: "text-success",
    ring: "ring-success/40",
  },
  fair: {
    label: "Solide",
    icon: CircleDot,
    text: "text-accent-strong",
    ring: "ring-accent/40",
  },
  work: {
    label: "Noch üben",
    icon: TriangleAlert,
    text: "text-primary",
    ring: "ring-primary/40",
  },
};

type PronunciationScoreProps = {
  /** 0–100. */
  score: number;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Qualitative pronunciation result. Communicates the band with an icon + word,
 * never colour alone.
 */
function PronunciationScore({
  score,
  size = "md",
  className,
}: PronunciationScoreProps) {
  const band = bandFor(score);
  const { label, icon: Icon, text, ring } = bandConfig[band];
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "bg-surface grid shrink-0 place-items-center rounded-full font-semibold ring-1",
          text,
          ring,
          size === "sm" ? "size-9 text-xs" : "size-12 text-sm",
        )}
      >
        {Math.round(score)}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          text,
        )}
      >
        <Icon className="size-4" aria-hidden />
        {label}
      </span>
    </div>
  );
}

export { PronunciationScore, bandFor, type PronunciationScoreProps };
