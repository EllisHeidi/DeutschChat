import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { RasterIcon, FEATURE_ICON } from "@/components/icons/raster-icon";
import type { SkillProgressModel } from "@/components/learning/types";

function SkillProgressRow({
  skill,
  className,
}: {
  skill: SkillProgressModel;
  className?: string;
}) {
  const hasData = skill.value != null;
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <RasterIcon
        src={FEATURE_ICON[skill.key] ?? FEATURE_ICON.vocabulary ?? ""}
        className="size-12"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground font-medium">{skill.label}</span>
          <span className="text-muted-foreground">
            {hasData ? `${skill.value}%` : "Noch keine Daten"}
          </span>
        </div>
        <Progress
          value={skill.value ?? 0}
          label={`${skill.label} Fortschritt`}
          size="sm"
          className="mt-1"
        />
      </div>
    </div>
  );
}

function SkillProgressList({
  skills,
  className,
}: {
  skills: SkillProgressModel[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {skills.map((s) => (
        <SkillProgressRow key={s.key} skill={s} />
      ))}
    </div>
  );
}

export { SkillProgressRow, SkillProgressList };
