import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<"span"> & {
  /** Two-letter initials shown as the fallback. */
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "accent";
};

const sizeClass = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

const toneClass = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/12 text-primary",
  accent: "bg-accent/15 text-accent-strong",
} as const;

/**
 * Initials-only avatar. No image loading in Phase 1 — AI characters are
 * represented by initials + colour until real assets exist.
 */
function Avatar({
  className,
  initials,
  size = "md",
  tone = "neutral",
  ...props
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-semibold select-none",
        sizeClass[size],
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}

export { Avatar, type AvatarProps };
