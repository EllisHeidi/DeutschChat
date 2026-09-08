import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeading } from "@/components/ui/typography";
import { EmptyState } from "@/components/common/empty-state";
import { BookOpen } from "lucide-react";

type VocabularyMasteryProps = {
  counts: { new: number; learning: number; known: number };
  className?: string;
};

const segments = [
  { key: "known", label: "Bekannt", bar: "bg-success", dot: "bg-success" },
  { key: "learning", label: "Am Lernen", bar: "bg-accent", dot: "bg-accent" },
  { key: "new", label: "Neu", bar: "bg-primary", dot: "bg-primary" },
] as const;

function VocabularyMastery({ counts, className }: VocabularyMasteryProps) {
  const total = counts.new + counts.learning + counts.known;

  return (
    <Card className={cn("", className)}>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <CardHeading>Wortschatz</CardHeading>
          <span className="text-muted-foreground text-sm">
            {total} {total === 1 ? "Wort" : "Wörter"}
          </span>
        </div>

        {total === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="Noch keine Wörter"
            description="Gespeicherte Wörter aus Lektionen und Gesprächen erscheinen hier."
          />
        ) : (
          <>
            <div className="bg-muted flex h-2.5 overflow-hidden rounded-full">
              {segments.map((s) => {
                const value = counts[s.key];
                if (value === 0) return null;
                return (
                  <span
                    key={s.key}
                    className={s.bar}
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                );
              })}
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {segments.map((s) => (
                <li
                  key={s.key}
                  className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                  <span
                    className={cn("size-2 rounded-full", s.dot)}
                    aria-hidden
                  />
                  {s.label}
                  <span className="text-foreground font-medium">
                    {counts[s.key]}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { VocabularyMastery, type VocabularyMasteryProps };
