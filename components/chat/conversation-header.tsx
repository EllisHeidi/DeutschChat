import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import type { ConversationMode } from "@/components/chat/types";

const modeLabel: Record<ConversationMode, string> = {
  guided: "Geführt",
  normal: "Normal",
  challenge: "Challenge",
};

type ConversationHeaderProps = {
  characterName: string;
  characterInitials: string;
  scenario: string;
  mode: ConversationMode;
  onBack?: () => void;
  className?: string;
};

function ConversationHeader({
  characterName,
  characterInitials,
  scenario,
  mode,
  onBack,
  className,
}: ConversationHeaderProps) {
  return (
    <header
      className={cn(
        "border-border bg-surface flex items-center gap-3 border-b px-3 py-2.5",
        className,
      )}
    >
      <IconButton
        icon={ChevronLeft}
        label="Zurück"
        size="sm"
        onClick={onBack}
      />
      <Avatar initials={characterInitials} size="md" tone="primary" />
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-semibold">
          {characterName}
        </p>
        <p className="text-muted-foreground truncate text-xs">{scenario}</p>
      </div>
      <Badge variant="outline" size="sm">
        {modeLabel[mode]}
      </Badge>
    </header>
  );
}

export { ConversationHeader, type ConversationHeaderProps };
