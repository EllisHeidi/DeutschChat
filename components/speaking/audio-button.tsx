"use client";

import * as React from "react";
import { Loader2, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const audioButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-accent/15 text-accent-strong hover:bg-accent/25",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        outline: "border border-border-strong text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-8 px-2.5 text-xs [&_svg]:size-3.5",
        md: "h-10 px-3.5 text-sm [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type AudioState = "idle" | "loading" | "playing";

type AudioButtonProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof audioButtonVariants> & {
    /** Visual playback state. Phase 1: no real audio is played. */
    state?: AudioState;
    /** `replay` swaps the idle icon to a rotate arrow. */
    mode?: "play" | "replay";
    label?: string;
    children?: React.ReactNode;
  };

function AudioButton({
  className,
  variant,
  size,
  state = "idle",
  mode = "play",
  label,
  children,
  ...props
}: AudioButtonProps) {
  const IdleIcon = mode === "replay" ? RotateCcw : children ? Volume2 : Play;
  const accessibleLabel =
    label ??
    (state === "playing"
      ? "Audio pausieren"
      : mode === "replay"
        ? "Nochmal anhören"
        : "Audio abspielen");

  return (
    <button
      type="button"
      aria-label={children ? undefined : accessibleLabel}
      title={accessibleLabel}
      data-state={state}
      className={cn(audioButtonVariants({ variant, size, className }))}
      {...props}
    >
      {state === "loading" ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : state === "playing" ? (
        <Pause aria-hidden />
      ) : (
        <IdleIcon aria-hidden />
      )}
      {children}
    </button>
  );
}

export {
  AudioButton,
  audioButtonVariants,
  type AudioButtonProps,
  type AudioState,
};
