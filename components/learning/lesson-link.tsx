import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RasterIcon, STATUS_ICON } from "@/components/icons/raster-icon";

type Status = "not_started" | "in_progress" | "completed" | "locked";

export function LessonLink({
  index,
  title,
  subtitle,
  href,
  status,
}: {
  index: number;
  title: string;
  subtitle?: string;
  href?: string;
  status: Status;
}) {
  const locked = status === "locked" || !href;
  const done = status === "completed";
  const iconSrc =
    status === "completed"
      ? STATUS_ICON.completed
      : locked
        ? STATUS_ICON.locked
        : status === "in_progress"
          ? STATUS_ICON.in_progress
          : null;

  const badge = iconSrc ? (
    <RasterIcon src={iconSrc} className="size-10" />
  ) : (
    <span className="bg-accent/15 text-accent-strong grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold">
      {index}
    </span>
  );

  const text = (
    <span className="min-w-0 flex-1">
      <span className="flex items-center gap-2">
        <span className="text-foreground truncate text-sm font-semibold">
          {title}
        </span>
        {status === "in_progress" ? (
          <span className="bg-primary/10 text-primary rounded-full px-1.5 py-0.5 text-[0.625rem] font-semibold">
            aktiv
          </span>
        ) : null}
      </span>
      <span className="text-muted-foreground mt-0.5 block truncate text-xs">
        {done
          ? "Abgeschlossen"
          : locked
            ? "Bald verfügbar"
            : (subtitle ?? "Lektion")}
      </span>
    </span>
  );

  const base =
    "flex w-full items-center gap-3.5 rounded-2xl border p-3.5 transition-colors";

  if (locked) {
    return (
      <div
        className={cn(base, "border-border bg-surface/60 opacity-70")}
        aria-disabled="true"
      >
        {badge}
        {text}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        base,
        "border-border bg-surface hover:border-border-strong focus-visible:ring-ring hover:shadow-[0_1px_2px_hsl(var(--shadow-color)/0.05),0_10px_24px_-14px_hsl(var(--shadow-color)/0.16)] focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {badge}
      {text}
      <ChevronRight
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden
      />
    </Link>
  );
}
