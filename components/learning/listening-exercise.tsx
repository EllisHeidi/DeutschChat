import * as React from "react";
import { Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AudioButton } from "@/components/speaking/audio-button";
import { Eyebrow } from "@/components/ui/typography";
import type { AudioState } from "@/components/speaking/audio-button";

type ListeningExerciseProps = {
  prompt: string;
  audioState?: AudioState;
  onPlay?: () => void;
  onReplay?: () => void;
  /** Answer controls, e.g. <MultipleChoiceOption /> list. */
  children?: React.ReactNode;
  className?: string;
};

function ListeningExercise({
  prompt,
  audioState = "idle",
  onPlay,
  onReplay,
  children,
  className,
}: ListeningExerciseProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-4 p-5">
        <Eyebrow className="text-muted-foreground flex items-center gap-1.5">
          <Headphones className="size-3.5" aria-hidden />
          Hörübung
        </Eyebrow>

        <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
          <AudioButton
            state={audioState}
            onClick={onPlay}
            variant="solid"
            aria-label="Audio abspielen"
          >
            Abspielen
          </AudioButton>
          <AudioButton
            mode="replay"
            variant="ghost"
            size="sm"
            onClick={onReplay}
          />
        </div>

        <p className="text-foreground text-sm font-medium">{prompt}</p>
        {children ? <div className="space-y-2">{children}</div> : null}
      </CardContent>
    </Card>
  );
}

export { ListeningExercise, type ListeningExerciseProps };
