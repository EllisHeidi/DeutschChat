import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeading, BodySecondary } from "@/components/ui/typography";

type CompletionStat = { label: string; value: string };

type LessonCompletionProps = {
  title?: string;
  message?: string;
  stats?: CompletionStat[];
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
};

function LessonCompletion({
  title = "Lektion abgeschlossen",
  message = "Gut gemacht! Du hast diese Lektion beendet.",
  stats,
  primaryLabel = "Weiter",
  onPrimary,
  secondaryLabel,
  onSecondary,
  className,
}: LessonCompletionProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface flex flex-col items-center gap-4 rounded-xl border px-6 py-10 text-center",
        className,
      )}
    >
      <span className="bg-success/15 text-success grid size-14 place-items-center rounded-full">
        <Check className="size-7" aria-hidden />
      </span>
      <div className="space-y-1">
        <PageHeading>{title}</PageHeading>
        <BodySecondary className="mx-auto max-w-sm">{message}</BodySecondary>
      </div>

      {stats && stats.length > 0 ? (
        <dl className="border-border flex flex-wrap justify-center gap-x-8 gap-y-2 border-y py-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-muted-foreground text-xs">{s.label}</dt>
              <dd className="text-foreground text-lg font-semibold">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Button onClick={onPrimary}>{primaryLabel}</Button>
        {secondaryLabel ? (
          <Button variant="ghost" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export { LessonCompletion, type LessonCompletionProps };
