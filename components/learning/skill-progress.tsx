import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { skillIcon } from "@/components/learning/icons";
import type { SkillProgressModel } from "@/components/learning/types";

function SkillProgressRow({
  skill,
  className,
}: {
  skill: SkillProgressModel;
  className?: string;
}) {
  const Icon = skillIcon[skill.key];
  const hasData = skill.value != null;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-md">
        <Icon className="size-4" aria-hidden />
      </span>
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
    <div className={cn("space-y-3", className)}>
      {skills.map((s) => (
        <SkillProgressRow key={s.key} skill={s} />
      ))}
    </div>
  );
}

export { SkillProgressRow, SkillProgressList };
