import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RasterIcon, BRAND } from "@/components/icons/raster-icon";

/**
 * The signature dashboard card: the learner's current level on an ink-black
 * surface, a gold progress bar and the primary "keep going" action inside it.
 * Percentage is real — a new learner sees 0 %.
 */
export function LevelHeroCard({
  levelCode,
  levelName,
  completed,
  total,
  isFree = true,
  continueHref,
  className,
}: {
  levelCode: string;
  levelName: string;
  completed: number;
  total: number;
  isFree?: boolean;
  continueHref: string;
  className?: string;
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      className={cn(
        "bg-ink-surface overflow-hidden rounded-2xl border border-white/10 p-5 text-white shadow-[0_2px_6px_rgb(140_140_150/0.14),0_20px_46px_-16px_rgb(140_140_150/0.28)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl leading-none font-semibold tracking-tight">
            {levelCode}
          </p>
          <p className="mt-1 text-sm text-white/60">{levelName}</p>
        </div>
        {isFree ? (
          <RasterIcon
            src={BRAND.kostenlosBadge}
            alt="Kostenlos"
            className="mt-0.5 h-7 w-auto"
          />
        ) : (
          <span className="bg-ink-surface-foreground/10 text-ink-surface-muted rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide uppercase">
            Premium
          </span>
        )}
      </div>

      <div className="mt-5 space-y-1.5">
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${levelCode} Fortschritt`}
          className="h-2 w-full overflow-hidden rounded-full bg-white/15"
        >
          <div
            className="bg-accent h-full rounded-full transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-white/60">
          {completed === 0
            ? `0 von ${total} Lektionen · los geht's`
            : `${completed} von ${total} Lektionen · ${pct}%`}
        </p>
      </div>

      <Link
        href={continueHref}
        className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-accent focus-visible:ring-offset-ink-surface mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:px-6"
      >
        {completed === 0 ? "Erste Lektion starten" : "Weiterlernen"}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
