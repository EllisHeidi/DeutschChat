import * as React from "react";
import { CloudOff, RefreshCw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  variant?: "error" | "offline";
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

const presets = {
  error: {
    icon: TriangleAlert,
    title: "Etwas ist schiefgelaufen",
    description:
      "Die Inhalte konnten nicht geladen werden. Bitte versuch es erneut.",
  },
  offline: {
    icon: CloudOff,
    title: "Keine Verbindung",
    description:
      "Du bist offline. Sobald du wieder verbunden bist, geht es weiter.",
  },
} as const;

function ErrorState({
  variant = "error",
  title,
  description,
  onRetry,
  retryLabel = "Erneut versuchen",
  className,
}: ErrorStateProps) {
  const preset = presets[variant];
  const Icon = preset.icon;
  return (
    <div
      role="alert"
      className={cn(
        "border-border bg-surface flex flex-col items-center justify-center gap-3 rounded-xl border px-6 py-10 text-center",
        className,
      )}
    >
      <span className="bg-destructive/10 text-destructive grid size-11 place-items-center rounded-full">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="space-y-1">
        <p className="text-foreground text-sm font-semibold">
          {title ?? preset.title}
        </p>
        <p className="text-muted-foreground mx-auto max-w-xs text-xs">
          {description ?? preset.description}
        </p>
      </div>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw aria-hidden />
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { ErrorState, type ErrorStateProps };
