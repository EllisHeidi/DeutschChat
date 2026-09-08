"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GermanText } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";
import type {
  VocabularyItem,
  VocabularyStatus,
} from "@/components/vocabulary/types";

const statusBadge: Record<
  VocabularyStatus,
  { label: string; variant: "new" | "learning" | "known" }
> = {
  new: { label: "Neu", variant: "new" },
  learning: { label: "Am Lernen", variant: "learning" },
  known: { label: "Bekannt", variant: "known" },
};

type VocabularyCardProps = {
  item: VocabularyItem;
  onPlayAudio?: () => void;
  className?: string;
};

function VocabularyCard({ item, onPlayAudio, className }: VocabularyCardProps) {
  const badge = statusBadge[item.status];
  return (
    <Card className={cn("flex items-start gap-3 p-4", className)}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <GermanText as="span" className="font-semibold">
            {item.word}
          </GermanText>
          <Badge variant={badge.variant} size="sm">
            {badge.label}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-0.5 text-sm">
          {item.translation}
          <span className="text-muted-foreground/70">
            {" · "}
            {item.partOfSpeech}
          </span>
        </p>
        {item.exampleSentence ? (
          <GermanText as="p" className="text-muted-foreground mt-1.5 text-xs">
            {item.exampleSentence}
          </GermanText>
        ) : null}
      </div>
      <AudioButton
        size="icon"
        variant="ghost"
        onClick={onPlayAudio}
        label={`„${item.word}“ anhören`}
      />
    </Card>
  );
}

export { VocabularyCard, type VocabularyCardProps };
