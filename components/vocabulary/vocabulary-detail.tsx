"use client";

import * as React from "react";
import { BookmarkPlus, Check, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import type { VocabularyItem } from "@/components/vocabulary/types";

type VocabularyDetailProps = {
  item: VocabularyItem;
  saved?: boolean;
  onToggleSave?: () => void;
  onPlayAudio?: () => void;
  /** Hide the save action (e.g. inside a lesson, where tracking is automatic). */
  showSave?: boolean;
  className?: string;
};

/** Body of the vocabulary popover / detail card. Pure presentation. */
function VocabularyDetail({
  item,
  saved = false,
  onToggleSave,
  onPlayAudio,
  showSave = true,
  className,
}: VocabularyDetailProps) {
  return (
    <div className={cn("space-y-3.5", className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GermanText as="p" className="text-xl leading-none font-semibold">
            {item.word}
          </GermanText>
          <button
            type="button"
            onClick={onPlayAudio}
            aria-label={`„${item.word}“ anhören`}
            title={`„${item.word}“ anhören`}
            className="text-primary hover:bg-primary/10 focus-visible:ring-ring grid size-7 shrink-0 place-items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Volume2 className="size-4" aria-hidden />
          </button>
        </div>
        {item.pronunciation ? (
          <p className="text-muted-foreground text-xs">{item.pronunciation}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <p className="text-foreground text-sm">{item.translation}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="border-border-strong text-muted-foreground rounded-full border px-1.5 py-0.5 text-[0.625rem] font-medium">
            {item.partOfSpeech}
          </span>
          {item.baseForm && item.baseForm !== item.word ? (
            <span className="text-muted-foreground text-xs">
              Grundform: <GermanText as="span">{item.baseForm}</GermanText>
            </span>
          ) : null}
        </div>
      </div>

      {showSave ? (
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          className={cn(
            "focus-visible:ring-ring focus-visible:ring-offset-surface inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            saved
              ? "border-border-strong text-muted-foreground border"
              : "bg-accent text-accent-foreground hover:bg-accent-strong hover:text-primary-foreground",
          )}
        >
          {saved ? (
            <>
              <Check className="size-4" aria-hidden />
              Gespeichert
            </>
          ) : (
            <>
              <BookmarkPlus className="size-4" aria-hidden />
              Wort speichern
            </>
          )}
        </button>
      ) : null}

      {item.exampleSentence ? (
        <div className="border-border border-t pt-3">
          <p className="text-muted-foreground text-[0.6875rem] font-semibold tracking-wide uppercase">
            Beispiel
          </p>
          <GermanText as="p" className="mt-1 text-sm">
            {item.exampleSentence}
          </GermanText>
          {item.exampleTranslation ? (
            <p className="text-muted-foreground mt-0.5 text-xs">
              {item.exampleTranslation}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { VocabularyDetail, type VocabularyDetailProps };
