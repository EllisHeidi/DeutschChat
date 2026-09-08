import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  invalid?: boolean;
};

function Textarea({ className, invalid, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "border-border-strong bg-surface text-foreground flex w-full rounded-md border px-3.5 py-2.5 text-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-[invalid]:border-destructive aria-[invalid]:focus-visible:ring-destructive/35",
        "field-sizing-content min-h-20 resize-y",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
