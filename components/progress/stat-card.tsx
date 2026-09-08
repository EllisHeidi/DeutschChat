import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  icon?: LucideIcon;
  label: string;
  /** Pass a string so callers control formatting; use "—" when there's no data. */
  value: string;
  hint?: string;
  className?: string;
};

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="flex flex-col gap-1 p-4">
        <div className="text-muted-foreground flex items-center gap-1.5">
          {Icon ? <Icon className="size-4" aria-hidden /> : null}
          <span className="text-xs font-medium">{label}</span>
        </div>
        <span className="text-foreground text-2xl font-semibold tracking-tight">
          {value}
        </span>
        {hint ? (
          <span className="text-muted-foreground text-xs">{hint}</span>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { StatCard, type StatCardProps };
