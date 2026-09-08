import * as React from "react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";

type ExampleSentenceProps = {
  german: string;
  translation?: string;
  onPlayAudio?: () => void;
  className?: string;
};

/** A small supporting example, e.g. under a vocabulary or grammar point. */
function ExampleSentence({
  german,
  translation,
  onPlayAudio,
  className,
}: ExampleSentenceProps) {
  return (
    <div
      className={cn(
        "border-accent/40 flex items-start gap-2 border-l-2 pl-3",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <GermanText as="p" className="text-sm">
          {german}
        </GermanText>
        {translation ? (
          <p className="text-muted-foreground text-xs">{translation}</p>
        ) : null}
      </div>
      {onPlayAudio ? (
        <AudioButton
          size="sm"
          variant="ghost"
          onClick={onPlayAudio}
          label="Beispiel anhören"
        />
      ) : null}
    </div>
  );
}

export { ExampleSentence, type ExampleSentenceProps };
