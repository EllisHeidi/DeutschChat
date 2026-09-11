import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

/**
 * "Empfohlene Konversation" — a doorway into Chat straight from the dashboard.
 * Chat is a co-equal pillar and never gated behind lessons.
 */
export function RecommendedConversation({
  title,
  meta,
  characterName,
  characterInitials,
  characterAvatar,
  href = "/chat",
  className,
}: {
  title: string;
  meta: string;
  characterName: string;
  characterInitials: string;
  characterAvatar?: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "border-border bg-surface hover:border-border-strong focus-visible:ring-ring flex items-center gap-3 rounded-xl border p-3.5 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <Avatar
        initials={characterInitials}
        tone="primary"
        src={characterAvatar}
      />
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-semibold">
          {title}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {meta} · mit {characterName}
        </p>
      </div>
      <ChevronRight
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden
      />
    </Link>
  );
}
