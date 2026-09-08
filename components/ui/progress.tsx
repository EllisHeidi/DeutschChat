import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const barVariants = cva("h-full rounded-full transition-[width] duration-500", {
  variants: {
    tone: {
      accent: "bg-accent",
      primary: "bg-primary",
      foreground: "bg-foreground",
    },
  },
  defaultVariants: { tone: "accent" },
});

type ProgressProps = React.ComponentProps<"div"> &
  VariantProps<typeof barVariants> & {
    value: number;
    max?: number;
    /** Accessible name for the progressbar, e.g. "A1 Fortschritt". */
    label: string;
    size?: "sm" | "md";
  };

function Progress({
  className,
  value,
  max = 100,
  label,
  tone,
  size = "md",
  ...props
}: ProgressProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        "bg-muted w-full overflow-hidden rounded-full",
        size === "sm" ? "h-1.5" : "h-2.5",
        className,
      )}
      {...props}
    >
      <div className={cn(barVariants({ tone }))} style={{ width: `${pct}%` }} />
    </div>
  );
}

export { Progress, type ProgressProps };
