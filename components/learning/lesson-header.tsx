import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { Progress } from "@/components/ui/progress";

type LessonHeaderProps = {
  unitLabel: string;
  title: string;
  step: number;
  totalSteps: number;
  onClose?: () => void;
  className?: string;
};

function LessonHeader({
  unitLabel,
  title,
  step,
  totalSteps,
  onClose,
  className,
}: LessonHeaderProps) {
  return (
    <header
      className={cn(
        "border-border bg-surface flex items-center gap-3 border-b px-3 py-2.5",
        className,
      )}
    >
      <IconButton
        icon={X}
        label="Lektion schließen"
        size="sm"
        onClick={onClose}
      />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground truncate text-xs">{unitLabel}</p>
        <p className="text-foreground truncate text-sm font-semibold">
          {title}
        </p>
      </div>
      <div className="flex w-24 shrink-0 flex-col items-end gap-1">
        <span className="text-muted-foreground text-xs font-medium">
          {step}/{totalSteps}
        </span>
        <Progress
          value={step}
          max={totalSteps}
          label="Lektionsfortschritt"
          size="sm"
        />
      </div>
    </header>
  );
}

export { LessonHeader, type LessonHeaderProps };
