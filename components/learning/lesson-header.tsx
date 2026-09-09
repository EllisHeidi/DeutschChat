import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

type LessonHeaderProps = {
  unitLabel: string;
  title: string;
  step: number;
  totalSteps: number;
  onClose?: () => void;
  className?: string;
};

/** Lesson chrome: a close control, the unit/title, and a hairline progress bar. */
function LessonHeader({
  unitLabel,
  title,
  step,
  totalSteps,
  onClose,
  className,
}: LessonHeaderProps) {
  const pct = totalSteps > 0 ? Math.min(100, (step / totalSteps) * 100) : 0;

  return (
    <header className={cn("border-border bg-surface border-b", className)}>
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-3 py-2.5">
        <IconButton
          icon={X}
          label="Lektion schließen"
          size="sm"
          onClick={onClose}
        />
        <div className="min-w-0 flex-1 text-center">
          <p className="text-muted-foreground truncate text-[0.6875rem] tracking-wide uppercase">
            {unitLabel}
          </p>
          <p className="text-foreground truncate text-sm font-semibold">
            {title}
          </p>
        </div>
        <span className="text-muted-foreground w-9 shrink-0 text-right text-xs font-medium tabular-nums">
          {Math.min(step, totalSteps)}/{totalSteps}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Lektionsfortschritt"
        className="bg-muted h-0.5 w-full"
      >
        <div
          className="bg-accent h-full transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}

export { LessonHeader, type LessonHeaderProps };
