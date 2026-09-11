import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

function TypingIndicator({
  characterInitials = "AI",
  characterName,
  characterAvatar,
  className,
}: {
  characterInitials?: string;
  characterName?: string;
  characterAvatar?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Avatar
        initials={characterInitials}
        size="sm"
        tone="primary"
        src={characterAvatar}
      />
      <div
        className="border-border bg-surface flex items-center gap-1 rounded-2xl rounded-bl-sm border px-3 py-2.5"
        role="status"
        aria-label={
          characterName ? `${characterName} schreibt …` : "schreibt …"
        }
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export { TypingIndicator };
