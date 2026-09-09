import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IconTone } from "@/components/learning/icons";

const TONE_CLASS: Record<IconTone, string> = {
  gold: "bg-accent/15 text-accent-strong",
  red: "bg-primary/10 text-primary",
  neutral: "bg-muted text-muted-foreground",
};

const BOX: Record<"sm" | "md" | "lg", string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const GLYPH: Record<"sm" | "md" | "lg", string> = {
  sm: "size-4",
  md: "size-[1.15rem]",
  lg: "size-5",
};

/**
 * A Lucide icon inside a soft tinted circle — the shared "feature icon"
 * treatment (Wortschatz, Hören, Sprechen …).
 */
export function FeatureIcon({
  icon: Icon,
  tone = "neutral",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        BOX[size],
        TONE_CLASS[tone],
        className,
      )}
    >
      <Icon className={GLYPH[size]} aria-hidden />
    </span>
  );
}
