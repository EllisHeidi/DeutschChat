import * as React from "react";
import { BookOpen, Lightbulb, SpellCheck, Volume2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";
import type { CorrectionKind } from "@/components/chat/types";

const config: Record<CorrectionKind, { icon: LucideIcon; heading: string }> = {
  minor: { icon: Lightbulb, heading: "Fast richtig!" },
  grammar: { icon: SpellCheck, heading: "Grammatik-Tipp" },
  vocabulary: { icon: BookOpen, heading: "Wort-Vorschlag" },
  pronunciation: { icon: Volume2, heading: "Aussprache" },
};

type CorrectionNoteProps = {
  kind?: CorrectionKind;
  /** What the learner said. */
  original?: string;
  /** The improved version. */
  suggestion: string;
  /** Optional one-line explanation. */
  note?: string;
  className?: string;
};

/**
 * Compact, non-blocking correction shown under a user message.
 * Gold accent = learning. Stays small so the conversation keeps flowing.
 */
function CorrectionNote({
  kind = "minor",
  original,
  suggestion,
  note,
  className,
}: CorrectionNoteProps) {
  const { icon: Icon, heading } = config[kind];
  return (
    <div
      className={cn(
        "border-accent/30 bg-accent/8 rounded-lg border px-3 py-2 text-sm",
        className,
      )}
    >
      <p className="text-accent-strong flex items-center gap-1.5 text-xs font-semibold">
        <Icon className="size-3.5" aria-hidden />
        {heading}
      </p>
      <div className="mt-1 space-y-0.5">
        {original ? (
          <GermanText
            as="p"
            className="text-muted-foreground decoration-muted-foreground/50 text-xs line-through"
          >
            {original}
          </GermanText>
        ) : null}
        <GermanText as="p" className="text-foreground font-medium">
          {suggestion}
        </GermanText>
      </div>
      {note ? (
        <p className="text-muted-foreground mt-1 text-xs">{note}</p>
      ) : null}
    </div>
  );
}

export { CorrectionNote, type CorrectionNoteProps };
