"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VocabularyDetail } from "@/components/vocabulary/vocabulary-detail";
import type { VocabularyItem } from "@/components/vocabulary/types";

type WordTokenProps = {
  item: VocabularyItem;
  /** Text as it appears in the sentence (may be an inflected form). */
  surface?: string;
  saved?: boolean;
  onToggleSave?: () => void;
  onPlayAudio?: () => void;
};

/**
 * An inline German word the learner can tap for its meaning.
 * - known:    no underline
 * - learning: dotted underline
 * - new:      dotted underline + a small "Neu" marker (never colour alone)
 */
function WordToken({
  item,
  surface,
  saved,
  onToggleSave,
  onPlayAudio,
}: WordTokenProps) {
  const text = surface ?? item.word;
  const isPlain = item.status === "known";

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "focus-visible:ring-ring rounded-sm transition-colors outline-none focus-visible:ring-2",
          "hover:bg-accent/10",
          !isPlain && "vocab-underline",
        )}
        aria-label={`${text} – Bedeutung anzeigen`}
      >
        <span lang="de">{text}</span>
        {item.status === "new" ? (
          <sup className="text-primary ml-0.5 align-super text-[0.5625rem] font-semibold tracking-wide uppercase">
            Neu
          </sup>
        ) : null}
      </PopoverTrigger>
      <PopoverContent>
        <VocabularyDetail
          item={item}
          saved={saved}
          onToggleSave={onToggleSave}
          onPlayAudio={onPlayAudio}
        />
      </PopoverContent>
    </Popover>
  );
}

export { WordToken, type WordTokenProps };
