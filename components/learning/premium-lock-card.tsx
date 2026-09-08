import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeading } from "@/components/ui/typography";

type PremiumLockCardProps = {
  levelCode: string;
  levelName: string;
  description: string;
  /** Honest, no fake urgency. */
  onLearnMore?: () => void;
  className?: string;
};

function PremiumLockCard({
  levelCode,
  levelName,
  description,
  onLearnMore,
  className,
}: PremiumLockCardProps) {
  return (
    <Card variant="outline" className={cn("border-dashed", className)}>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <span className="bg-accent/15 text-accent-strong grid size-9 place-items-center rounded-lg">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <CardHeading>
                {levelCode} · {levelName}
              </CardHeading>
              <Badge variant="premium" size="sm">
                Premium
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={onLearnMore}>
            Mehr erfahren
          </Button>
          <span className="text-muted-foreground text-xs">
            A1 bleibt für immer kostenlos.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { PremiumLockCard, type PremiumLockCardProps };
