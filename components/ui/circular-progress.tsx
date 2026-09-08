import * as React from "react";
import { cn } from "@/lib/utils";

type CircularProgressProps = {
  value: number;
  max?: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  tone?: "accent" | "primary" | "foreground";
  children?: React.ReactNode;
  className?: string;
};

const toneClass: Record<NonNullable<CircularProgressProps["tone"]>, string> = {
  accent: "text-accent",
  primary: "text-primary",
  foreground: "text-foreground",
};

function CircularProgress({
  value,
  max = 100,
  label,
  size = 72,
  strokeWidth = 6,
  tone = "accent",
  children,
  className,
}: CircularProgressProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        "relative inline-grid shrink-0 place-items-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-[stroke-dashoffset] duration-500",
            toneClass[tone],
          )}
          stroke="currentColor"
        />
      </svg>
      <span className="absolute grid place-items-center text-center">
        {children}
      </span>
    </div>
  );
}

export { CircularProgress, type CircularProgressProps };
