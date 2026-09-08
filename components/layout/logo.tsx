import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Visual size. `sm` for headers, `md` default, `lg` for marketing. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
} as const;

/**
 * Typographic wordmark. Deliberately simple for Phase 1 — no icon, no flag.
 * "Deutsch" in ink, "Chat" in German red to signal the two sides of the product.
 */
function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "text-foreground font-semibold tracking-tight select-none",
        sizeClass[size],
        className,
      )}
    >
      Deutsch<span className="text-primary">Chat</span>
    </span>
  );
}

export { Logo, type LogoProps };
