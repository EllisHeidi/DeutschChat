import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type LevelProgressCardProps = {
  levelCode: string;
  levelName: string;
  /**
   * Completed vs total lessons. When `completed` is 0 the card shows an honest
   * "just getting started" state rather than a fake percentage.
   */
  completed: number;
  total: number;
  isFree?: boolean;
  className?: string;
};

function LevelProgressCard({
  levelCode,
  levelName,
  completed,
  total,
  isFree = true,
  className,
}: LevelProgressCardProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-foreground text-xl font-semibold tracking-tight">
              {levelCode}
            </span>
            <span className="text-muted-foreground text-sm">{levelName}</span>
          </div>
          {isFree ? (
            <Badge variant="free" size="sm">
              Kostenlos
            </Badge>
          ) : (
            <Badge variant="premium" size="sm">
              Premium
            </Badge>
          )}
        </div>

        <Progress
          value={completed}
          max={total}
          label={`${levelCode} Fortschritt`}
        />

        <p className="text-muted-foreground text-xs">
          {completed === 0
            ? `0 von ${total} Lektionen · Los geht's!`
            : `${completed} von ${total} Lektionen · ${pct}%`}
        </p>
      </CardContent>
    </Card>
  );
}

export { LevelProgressCard, type LevelProgressCardProps };
