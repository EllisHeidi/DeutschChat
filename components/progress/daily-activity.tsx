import * as React from "react";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DailyActivityItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  done: boolean;
};

function DailyActivity({
  items,
  className,
}: {
  items: DailyActivityItem[];
  className?: string;
}) {
  return (
    <ul className={cn("grid grid-cols-3 gap-2", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.key}>
            <div
              className={cn(
                "flex h-full flex-col items-center gap-1.5 rounded-lg border p-3 text-center",
                item.done
                  ? "border-success/40 bg-success/10"
                  : "border-border bg-surface",
              )}
            >
              <span
                className={cn(
                  "relative grid size-9 place-items-center rounded-full",
                  item.done
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {item.done ? (
                  <span className="bg-success text-success-foreground absolute -right-0.5 -bottom-0.5 grid size-3.5 place-items-center rounded-full">
                    <Check className="size-2.5" aria-hidden />
                  </span>
                ) : null}
              </span>
              <span className="text-foreground text-xs font-medium">
                {item.label}
              </span>
              <span className="text-muted-foreground text-[0.6875rem]">
                {item.done ? "Erledigt" : "Offen"}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export { DailyActivity };
