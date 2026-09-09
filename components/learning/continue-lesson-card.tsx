import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

/**
 * "Pick up where you left off" — server-rendered, navigates via <Link>.
 * `progress` is null until the learner has started something (no fake number).
 */
export function ContinueLessonCard({
  eyebrow = "Weiterlernen",
  emoji = "👋",
  title,
  unitLabel,
  href,
  progress = null,
}: {
  eyebrow?: string;
  emoji?: string;
  title: string;
  unitLabel: string;
  href: string;
  progress?: number | null;
}) {
  return (
    <Card variant="accent">
      <CardContent className="space-y-3 p-5">
        <Eyebrow className="text-accent-strong">{eyebrow}</Eyebrow>
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden>
            {emoji}
          </span>
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

        <Button asChild className="w-full sm:w-auto">
          <Link href={href}>
            Weiterlernen
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
