import * as React from "react";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { lessonKindIcon, lessonKindLabel } from "@/components/learning/icons";
import type { LessonSummary } from "@/components/learning/types";

type LessonCardProps = {
  lesson: LessonSummary;
  /** Position in the unit, e.g. "3". */
  index?: number;
  onClick?: () => void;
  className?: string;
};

function LessonCard({ lesson, index, onClick, className }: LessonCardProps) {
  const Icon = lessonKindIcon[lesson.kind];
  const locked = lesson.status === "locked";
  const done = lesson.status === "completed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      aria-label={`${lesson.title} – ${
        done ? "abgeschlossen" : locked ? "gesperrt" : "öffnen"
      }`}
      className={cn(
        cardVariants({ variant: "surface", interactive: !locked }),
        "focus-visible:ring-ring flex w-full items-center gap-3.5 p-3.5 text-left outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-lg",
          done
            ? "bg-success/15 text-success"
            : locked
              ? "bg-muted text-muted-foreground"
              : "bg-accent/15 text-accent-strong",
        )}
      >
        {done ? (
          <Check className="size-5" aria-hidden />
        ) : locked ? (
          <Lock className="size-4" aria-hidden />
        ) : (
          <Icon className="size-5" aria-hidden />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          {index != null ? (
            <span className="text-muted-foreground text-xs font-medium">
              {index}.
            </span>
          ) : null}
          <span className="text-foreground truncate text-sm font-semibold">
            {lesson.title}
          </span>
        </div>
        <p className="text-muted-foreground truncate text-xs">
          {lesson.subtitle ?? lessonKindLabel[lesson.kind]}
        </p>
        {lesson.status === "in-progress" && lesson.progress != null ? (
          <Progress
            value={lesson.progress}
            label={`${lesson.title} Fortschritt`}
            size="sm"
            className="mt-2"
          />
        ) : null}
      </div>
    </button>
  );
}

export { LessonCard, type LessonCardProps };
