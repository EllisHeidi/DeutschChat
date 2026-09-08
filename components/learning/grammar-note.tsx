import * as React from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type GrammarNoteProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

/** A quiet explanatory callout for a grammar point. */
function GrammarNote({
  title = "Grammatik",
  children,
  className,
}: GrammarNoteProps) {
  return (
    <aside
      className={cn(
        "border-border bg-muted/40 rounded-lg border p-3.5 text-sm",
        className,
      )}
    >
      <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
        <Lightbulb className="size-3.5" aria-hidden />
        {title}
      </p>
      <div className="text-foreground mt-1.5 leading-relaxed [&_strong]:font-semibold">
        {children}
      </div>
    </aside>
  );
}

export { GrammarNote, type GrammarNoteProps };
