import * as React from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, GermanText } from "@/components/ui/typography";
import { AudioButton } from "@/components/speaking/audio-button";
import {
  RecordButton,
  type RecordState,
} from "@/components/speaking/record-button";

type SpeakingExerciseProps = {
  prompt: string;
  target: string;
  targetTranslation?: string;
  recordState?: RecordState;
  onRecord?: () => void;
  onPlayTarget?: () => void;
  /** Feedback slot, e.g. <SpeakingFeedback />. */
  feedback?: React.ReactNode;
  className?: string;
};

function SpeakingExercise({
  prompt,
  target,
  targetTranslation,
  recordState = "idle",
  onRecord,
  onPlayTarget,
  feedback,
  className,
}: SpeakingExerciseProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-4 p-5">
        <Eyebrow className="text-muted-foreground flex items-center gap-1.5">
          <Mic className="size-3.5" aria-hidden />
          Sprechübung
        </Eyebrow>

        <p className="text-muted-foreground text-sm">{prompt}</p>

        <div className="bg-muted/50 flex items-start gap-2 rounded-lg p-3">
          <div className="min-w-0 flex-1">
            <GermanText as="p" className="font-medium">
              {target}
            </GermanText>
            {targetTranslation ? (
              <p className="text-muted-foreground text-xs">
                {targetTranslation}
              </p>
            ) : null}
          </div>
          <AudioButton
            size="sm"
            variant="ghost"
            onClick={onPlayTarget}
            label="Zielsatz anhören"
          />
        </div>

        <div className="flex justify-center py-2">
          <RecordButton state={recordState} onClick={onRecord} />
        </div>

        {feedback}
      </CardContent>
    </Card>
  );
}

export { SpeakingExercise, type SpeakingExerciseProps };
