import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton composition matching the lesson-list layout. */
function LoadingList({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("space-y-3", className)}
      role="status"
      aria-label="Inhalte werden geladen"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-surface flex items-center gap-4 rounded-xl border p-4"
        >
          <Skeleton className="size-11 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-2.5 w-10" />
        </div>
      ))}
      <span className="sr-only">Wird geladen…</span>
    </div>
  );
}

/** Skeleton composition matching a content card. */
function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border bg-surface space-y-4 rounded-xl border p-5",
        className,
      )}
      role="status"
      aria-label="Wird geladen"
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <Skeleton className="h-9 w-32 rounded-md" />
    </div>
  );
}

export { LoadingList, LoadingCard };
