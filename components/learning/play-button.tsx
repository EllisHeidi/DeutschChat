"use client";

import * as React from "react";
import {
  AudioButton,
  type AudioButtonProps,
} from "@/components/speaking/audio-button";

/**
 * `AudioButton` with a short fake "playing" state. There is no real audio yet —
 * this is the seam future TTS plugs into (swap the timeout for playback).
 */
export function PlayButton({
  text,
  children,
  ...props
}: Omit<AudioButtonProps, "state" | "onClick"> & { text?: string }) {
  const [state, setState] = React.useState<"idle" | "playing">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  function play() {
    setState("playing");
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setState("idle"),
      Math.min(2400, 700 + (text?.length ?? 12) * 45),
    );
  }

  return (
    <AudioButton state={state} onClick={play} {...props}>
      {children}
    </AudioButton>
  );
}
