import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Custom DeutschChat icon art (PNG). These are fixed-colour raster assets, so
 * they don't tint or theme — where a state needs a different colour (active nav,
 * etc.) we swap the source file rather than recolour.
 *
 * `className` controls the box size the same way it does for the Lucide icons
 * (e.g. `size-5`); the image is contained within it.
 */
export function RasterIcon({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static icon art, no layout benefit from next/image
    <img
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      draggable={false}
      className={cn(
        "inline-block shrink-0 object-contain select-none",
        className,
      )}
    />
  );
}

/* --------------------------------- registry -------------------------------- */

export const FEATURE_ICON: Record<string, string> = {
  vocabulary: "/icons/feature/wortschatz.png",
  grammar: "/icons/feature/grammatik.png",
  reading: "/icons/feature/wortschatz.png",
  listening: "/icons/feature/hoeren.png",
  speaking: "/icons/feature/sprechen.png",
  writing: "/icons/feature/schreiben.png",
  conversation: "/icons/feature/konversation.png",
};

export const TODAY_ICON = {
  exercises: "/icons/feature/uebungen.png",
  words: "/icons/feature/worter.png",
  minutes: "/icons/feature/minuten.png",
} as const;

export const STATUS_ICON = {
  completed: "/icons/action/erledigt.png",
  in_progress: "/icons/action/in-bearbeitung.png",
  repeat: "/icons/action/wiederholen.png",
  new: "/icons/action/neu.png",
  locked: "/icons/action/gesperrt.png",
} as const;

export const ACTION_ICON = {
  play: "/icons/action/play.png",
  audio: "/icons/action/audio.png",
  record: "/icons/action/aufnehmen.png",
  correct: "/icons/action/richtig.png",
  wrong: "/icons/action/falsch.png",
  locked: "/icons/action/gesperrt.png",
  next: "/icons/action/weiter.png",
  restart: "/icons/action/neu-starten.png",
} as const;

export const NAV_ICON: Record<string, { active: string; inactive: string }> = {
  "/": {
    active: "/icons/nav/start.png",
    inactive: "/icons/nav/start-wire.png",
  },
  "/learn": {
    active: "/icons/nav/lernen.png",
    inactive: "/icons/nav/lernen-wire.png",
  },
  "/chat": {
    active: "/icons/nav/chat.png",
    inactive: "/icons/nav/chat.png",
  },
  "/progress": {
    active: "/icons/nav/fortschritt.png",
    inactive: "/icons/nav/fortschritt-wire.png",
  },
  "/profil": {
    active: "/icons/nav/profil.png",
    inactive: "/icons/nav/profil-wire.png",
  },
};

export const ILLUSTRATION = {
  noWords: "/illustrations/noch-keine-woerter.png",
  noProgress: "/illustrations/noch-kein-fortschritt.png",
  noProfile: "/illustrations/noch-kein-profil.png",
  noConversations: "/illustrations/noch-keine-gespraeche.png",
  nothingFound: "/illustrations/nichts-gefunden.png",
  berlin: "/illustrations/berlin.png",
  tagline: "/illustrations/tagline-handdrawn.png",
  flagBrush: "/illustrations/flag-brush.png",
} as const;

export const BRAND = {
  wordmark: "/brand/wordmark.png",
  markDark: "/brand/app-icon-dark.png",
  markLight: "/brand/app-icon-light.png",
  kostenlosBadge: "/brand/kostenlos-badge.png",
} as const;
