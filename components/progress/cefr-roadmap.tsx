import * as React from "react";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type RoadmapLevelState = "completed" | "current" | "locked";

export type RoadmapLevel = {
  code: string;
  name: string;
  state: RoadmapLevelState;
  isFree: boolean;
};

function Node({ level, last }: { level: RoadmapLevel; last: boolean }) {
  const { state } = level;
  return (
    <li className="relative flex gap-3.5 pb-4 last:pb-0">
      {/* connector */}
      {!last ? (
        <span
          className="bg-border absolute top-9 left-[17px] h-[calc(100%-1.75rem)] w-px"
          aria-hidden
        />
      ) : null}

      <span
        className={cn(
          "z-10 grid size-9 shrink-0 place-items-center rounded-full border text-xs font-semibold",
          state === "current" &&
            "border-primary bg-primary text-primary-foreground",
          state === "completed" && "border-success bg-success/12 text-success",
          state === "locked" &&
            "border-border-strong bg-muted text-muted-foreground",
        )}
      >
        {state === "completed" ? (
          <Check className="size-4" aria-hidden />
        ) : state === "locked" ? (
          <Lock className="size-3.5" aria-hidden />
        ) : (
          level.code
        )}
      </span>

      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              state === "locked" ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {level.code}
          </span>
          <span className="text-muted-foreground text-sm">{level.name}</span>
          {level.isFree ? (
            <Badge variant="free" size="sm">
              Kostenlos
            </Badge>
          ) : (
            <Badge variant="premium" size="sm">
              Premium
            </Badge>
          )}
          {state === "current" ? (
            <Badge variant="outline" size="sm">
              Aktuell
            </Badge>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function CefrRoadmap({
  levels,
  className,
}: {
  levels: RoadmapLevel[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <ol>
        {levels.map((level, i) => (
          <Node key={level.code} level={level} last={i === levels.length - 1} />
        ))}
      </ol>
      <p className="bg-accent/10 text-accent-strong rounded-lg px-3 py-2 text-xs font-medium">
        A1 ist kostenlos. Immer. — Premium beginnt ab A2.
      </p>
    </div>
  );
}

export { CefrRoadmap };
