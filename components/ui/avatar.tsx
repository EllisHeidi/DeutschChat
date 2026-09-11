import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<"span"> & {
  /** Two-letter initials shown as the fallback (and while `src` loads). */
  initials: string;
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "accent";
  /** A real portrait, e.g. a chat persona. Falls back to initials without one. */
  src?: string;
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
 * Portrait avatar with an initials fallback. Most people in the app (the
 * signed-in user) only ever get initials; chat personas with a real
 * portrait (e.g. Lena) pass `src`.
 */
function Avatar({
  className,
  initials,
  size = "md",
  tone = "neutral",
  src,
  ...props
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-semibold select-none",
        sizeClass[size],
        !src && toneClass[tone],
        className,
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- small avatar crop, not worth next/image here
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover object-[50%_20%]"
        />
      ) : (
        initials.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}

export { Avatar, type AvatarProps };
