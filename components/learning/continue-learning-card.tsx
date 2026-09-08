import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

type ContinueLearningCardProps = {
  eyebrow?: string;
  emoji?: string;
  title: string;
  unitLabel: string;
  /** null = not started yet — no fake percentage is shown. */
  progress?: number | null;
  actionLabel?: string;
  onContinue?: () => void;
  className?: string;
};

/** The primary "pick up where you left off" card for the dashboard. */
function ContinueLearningCard({
  eyebrow = "Weiterlernen",
  emoji,
  title,
  unitLabel,
  progress = null,
  actionLabel = "Weiterlernen",
  onContinue,
  className,
}: ContinueLearningCardProps) {
  return (
    <Card variant="accent" className={cn("", className)}>
      <CardContent className="space-y-3 p-5">
        <Eyebrow className="text-accent-strong">{eyebrow}</Eyebrow>
        <div className="flex items-start gap-3">
          {emoji ? (
            <span className="text-2xl" aria-hidden>
              {emoji}
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="text-foreground text-lg font-semibold">{title}</p>
            <p className="text-muted-foreground text-sm">{unitLabel}</p>
          </div>
        </div>

        {progress != null ? (
          <Progress
            value={progress}
            label={`${title} Fortschritt`}
            tone="accent"
          />
        ) : (
          <p className="text-muted-foreground text-xs">Noch nicht begonnen</p>
        )}

        <Button onClick={onContinue} className="w-full sm:w-auto">
          {actionLabel}
          <ArrowRight aria-hidden />
        </Button>
      </CardContent>
    </Card>
  );
}

export { ContinueLearningCard, type ContinueLearningCardProps };
