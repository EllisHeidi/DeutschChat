import * as React from "react";
import { cn } from "@/lib/utils";
import { RasterIcon } from "@/components/icons/raster-icon";

type LogoProps = {
  /** Visual size. `sm` for headers, `md` default, `lg` for marketing. */
  size?: "sm" | "md" | "lg";
  /** Show just the mark, no wordmark text. */
  markOnly?: boolean;
  className?: string;
};

const MARK = {
  sm: "size-6 rounded-[0.4rem]",
  md: "size-7 rounded-lg",
  lg: "size-9 rounded-xl",
} as const;

const TEXT = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
} as const;

/**
 * DeutschChat lockup — the flag speech-bubble mark (brand art) plus the
 * wordmark set in live text so it stays crisp at every size. "Deutsch" in ink,
 * "Chat" in German red for the two sides of the product.
 */
function Logo({ size = "md", markOnly = false, className }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 select-none", className)}
    >
      <RasterIcon
        src="/brand/app-icon-dark.png"
        alt={markOnly ? "DeutschChat" : ""}
        className={MARK[size]}
      />
      {markOnly ? null : (
        <span
          className={cn(
            "text-foreground font-semibold tracking-tight",
            TEXT[size],
          )}
        >
          Deutsch<span className="text-primary">Chat</span>
        </span>
      )}
    </span>
  );
}

export { Logo, type LogoProps };
