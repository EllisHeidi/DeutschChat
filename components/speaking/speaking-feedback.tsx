import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { GermanText, CardHeading } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";
import { PronunciationScore } from "@/components/speaking/pronunciation-score";

type SpeakingFeedbackProps = {
  target: string;
  transcript: string;
  score: number;
  notes?: string[];
  onPlayTarget?: () => void;
  className?: string;
};

function SpeakingFeedback({
  target,
  transcript,
  score,
  notes,
  onPlayTarget,
  className,
}: SpeakingFeedbackProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <CardHeading>Deine Aussprache</CardHeading>
          <PronunciationScore score={score} size="sm" />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground mt-0.5 w-14 shrink-0 text-xs">
              Ziel
            </span>
            <div className="flex items-center gap-2">
              <GermanText>{target}</GermanText>
              <AudioButton
                size="sm"
                variant="ghost"
                onClick={onPlayTarget}
                label="Zielsatz anhören"
              />
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground mt-0.5 w-14 shrink-0 text-xs">
              Gehört
            </span>
            <GermanText className="text-muted-foreground">
              {transcript}
            </GermanText>
          </div>
        </div>

        {notes && notes.length > 0 ? (
          <ul className="border-border text-muted-foreground space-y-1 border-t pt-2 text-xs">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-1.5">
                <span aria-hidden>·</span>
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { SpeakingFeedback, type SpeakingFeedbackProps };
