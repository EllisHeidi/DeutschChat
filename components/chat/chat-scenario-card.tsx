import * as React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CardHeading } from "@/components/ui/typography";

type ChatScenarioCardProps = {
  title: string;
  description: string;
  characterName: string;
  characterInitials: string;
  level: string;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
};

function ChatScenarioCard({
  title,
  description,
  characterName,
  characterInitials,
  level,
  locked = false,
  onClick,
  className,
}: ChatScenarioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={cn(
        cardVariants({ variant: "surface", interactive: !locked }),
        "focus-visible:ring-ring flex w-full items-center gap-3 p-4 text-left outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      <Avatar
        initials={characterInitials}
        size="lg"
        tone={locked ? "neutral" : "primary"}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <CardHeading className="truncate">{title}</CardHeading>
          <Badge variant="outline" size="sm">
            {level}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
          {description}
        </p>
        <p className="text-muted-foreground/80 mt-1 text-xs">
          mit {characterName}
        </p>
      </div>
      {locked ? (
        <Lock className="text-muted-foreground size-4 shrink-0" aria-hidden />
      ) : (
        <ArrowRight
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden
        />
      )}
    </button>
  );
}

export { ChatScenarioCard, type ChatScenarioCardProps };
