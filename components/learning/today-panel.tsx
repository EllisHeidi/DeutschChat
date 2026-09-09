import * as React from "react";
import { cn } from "@/lib/utils";
import { RasterIcon, TODAY_ICON } from "@/components/icons/raster-icon";

type Stat = { icon: string; value: string; label: string };

/**
 * The "Heute" row — three compact cards for today's activity. Values are real
 * (0 for a new learner); the card design carries the section, not the numbers.
 */
export function TodayPanel({
  itemsPracticed,
  vocabReviewed,
  minutesSpent,
  className,
}: {
  itemsPracticed: number;
  vocabReviewed: number;
  minutesSpent: number;
  className?: string;
}) {
  const stats: Stat[] = [
    {
      icon: TODAY_ICON.exercises,
      value: String(itemsPracticed),
      label: itemsPracticed === 1 ? "Übung" : "Übungen",
    },
    {
      icon: TODAY_ICON.words,
      value: String(vocabReviewed),
      label: vocabReviewed === 1 ? "Wort" : "Wörter",
    },
    {
      icon: TODAY_ICON.minutes,
      value: String(minutesSpent),
      label: "Minuten",
    },
  ];

  return (
    <ul className={cn("grid grid-cols-3 gap-2.5", className)}>
      {stats.map((s) => (
        <li
          key={s.label}
          className="border-border bg-surface flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3.5 text-center"
        >
          <RasterIcon src={s.icon} className="size-11" />
          <span className="text-foreground text-lg leading-none font-semibold">
            {s.value}
          </span>
          <span className="text-muted-foreground text-[0.6875rem]">
            {s.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
