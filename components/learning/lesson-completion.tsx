import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeading, BodySecondary } from "@/components/ui/typography";
import { TaglineLockup } from "@/components/layout/tagline-lockup";
import { RasterIcon, STATUS_ICON } from "@/components/icons/raster-icon";

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
        "border-border bg-surface flex flex-col items-center gap-5 rounded-2xl border px-6 py-9 text-center",
        className,
      )}
    >
      <RasterIcon
        src={STATUS_ICON.completed}
        className="ring-success/15 size-16 rounded-full ring-8"
      />
      <div className="space-y-1.5">
        <PageHeading>{title}</PageHeading>
        <BodySecondary className="mx-auto max-w-sm">{message}</BodySecondary>
      </div>

      {stats && stats.length > 0 ? (
        <dl className="border-border grid w-full grid-cols-3 gap-2 border-y py-4">
          {stats.map((s) => (
            <div key={s.label} className="space-y-0.5 text-center">
              <dd className="text-foreground text-xl font-semibold tracking-tight">
                {s.value}
              </dd>
              <dt className="text-muted-foreground text-xs">{s.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="flex w-full flex-col gap-2">
        <Button className="w-full" onClick={onPrimary}>
          {primaryLabel}
        </Button>
        {secondaryLabel ? (
          <Button variant="ghost" className="w-full" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>

      <TaglineLockup size="sm" />
    </div>
  );
}

export { LessonCompletion, type LessonCompletionProps };
