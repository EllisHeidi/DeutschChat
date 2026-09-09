import * as React from "react";
import { cn } from "@/lib/utils";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

/**
 * The brand sign-off — the German-flag brush stroke (with its little heart)
 * above the hand-drawn tagline. Used at the foot of the sidebar, the profile
 * page, and the lesson-completion screen.
 */
export function TaglineLockup({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const brush = size === "sm" ? "h-20" : "h-24";
  const text = size === "sm" ? "h-14" : "h-16";
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <RasterIcon
        src={ILLUSTRATION.flagBrush}
        className={cn(brush, "w-auto")}
      />
      <RasterIcon
        src={ILLUSTRATION.tagline}
        alt="Kleine Schritte. Große Gespräche."
        className={cn(text, "w-auto")}
      />
    </div>
  );
}
