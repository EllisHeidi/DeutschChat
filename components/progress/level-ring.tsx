import * as React from "react";
import { CircularProgress } from "@/components/ui/circular-progress";

/**
 * The progress-page centrepiece: a gold ring showing overall level completion.
 * Reads honestly — a new learner sees 0 %.
 */
export function LevelRing({
  levelCode,
  completed,
  total,
}: {
  levelCode: string;
  completed: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="border-border bg-surface flex flex-col items-center gap-4 rounded-xl border px-6 py-8">
      <CircularProgress
        value={pct}
        label={`${levelCode} Gesamtfortschritt`}
        size={128}
        strokeWidth={9}
        tone="accent"
      >
        <span className="text-2xl font-semibold tracking-tight">{pct}%</span>
        <span className="text-muted-foreground text-[0.6875rem]">
          {levelCode} Gesamt
        </span>
      </CircularProgress>
      <p className="text-muted-foreground text-sm">
        {completed} von {total} Lektionen abgeschlossen
      </p>
    </div>
  );
}
