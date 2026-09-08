import * as React from "react";
import { cn } from "@/lib/utils";

type LessonStepIndicatorProps = {
  total: number;
  current: number;
  className?: string;
};

/** Segmented step bar. `current` is 1-based; completed segments fill gold. */
function LessonStepIndicator({
  total,
  current,
  className,
}: LessonStepIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Schritt ${current} von ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i < current ? "bg-accent" : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}

export { LessonStepIndicator, type LessonStepIndicatorProps };
