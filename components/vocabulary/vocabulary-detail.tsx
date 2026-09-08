"use client";

import * as React from "react";
import { BookmarkPlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GermanText } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";
import type { VocabularyItem } from "@/components/vocabulary/types";

type VocabularyDetailProps = {
  item: VocabularyItem;
  saved?: boolean;
  onToggleSave?: () => void;
  onPlayAudio?: () => void;
  className?: string;
};

/** Body of the vocabulary popover / detail card. Pure presentation. */
function VocabularyDetail({
  item,
  saved = false,
  onToggleSave,
  onPlayAudio,
  className,
}: VocabularyDetailProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <GermanText as="p" className="text-lg font-semibold">
            {item.word}
          </GermanText>
          <p className="text-muted-foreground text-sm">{item.translation}</p>
        </div>
        <AudioButton
          size="icon"
          variant="ghost"
          onClick={onPlayAudio}
          label={`„${item.word}“ anhören`}
        />
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
        {item.baseForm ? (
          <>
            <dt className="text-muted-foreground">Grundform</dt>
            <dd>
              <GermanText>{item.baseForm}</GermanText>
            </dd>
          </>
        ) : null}
        <dt className="text-muted-foreground">Wortart</dt>
        <dd className="text-foreground">{item.partOfSpeech}</dd>
        {item.pronunciation ? (
          <>
            <dt className="text-muted-foreground">Aussprache</dt>
            <dd className="text-foreground">{item.pronunciation}</dd>
          </>
        ) : null}
      </dl>

      {item.exampleSentence ? (
        <div className="bg-muted/50 rounded-lg p-2.5">
          <GermanText as="p" className="text-sm">
            {item.exampleSentence}
          </GermanText>
          {item.exampleTranslation ? (
            <p className="text-muted-foreground mt-0.5 text-xs">
              {item.exampleTranslation}
            </p>
          ) : null}
        </div>
      ) : null}

      <Button
        variant={saved ? "secondary" : "primary"}
        size="sm"
        className="w-full"
        onClick={onToggleSave}
        aria-pressed={saved}
      >
        {saved ? (
          <>
            <Check aria-hidden />
            Gespeichert
          </>
        ) : (
          <>
            <BookmarkPlus aria-hidden />
            Wort speichern
          </>
        )}
      </Button>
    </div>
  );
}

export { VocabularyDetail, type VocabularyDetailProps };
