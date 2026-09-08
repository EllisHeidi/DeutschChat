"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";

type GermanSentenceProps = {
  /** The German text — plain string or inline <WordToken /> nodes. */
  children: React.ReactNode;
  translation?: string;
  /** Show the translation immediately instead of behind a toggle. */
  translationVisible?: boolean;
  onPlayAudio?: () => void;
  size?: "md" | "lg";
  className?: string;
};

function GermanSentence({
  children,
  translation,
  translationVisible = false,
  onPlayAudio,
  size = "lg",
  className,
}: GermanSentenceProps) {
  const [shown, setShown] = React.useState(translationVisible);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-start gap-2">
        <GermanText
          as="p"
          className={cn(
            "text-foreground font-medium",
            size === "lg" ? "text-xl leading-snug" : "text-base",
          )}
        >
          {children}
        </GermanText>
        {onPlayAudio ? (
          <AudioButton
            size="icon"
            variant="ghost"
            onClick={onPlayAudio}
            label="Satz anhören"
            className="shrink-0"
          />
        ) : null}
      </div>

      {translation ? (
        shown ? (
          <p className="text-muted-foreground text-sm">{translation}</p>
        ) : (
          <button
            type="button"
            onClick={() => setShown(true)}
            className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Übersetzung anzeigen
          </button>
        )
      ) : null}
    </div>
  );
}

export { GermanSentence, type GermanSentenceProps };
