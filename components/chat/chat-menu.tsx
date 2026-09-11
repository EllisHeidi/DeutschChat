"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { clearActiveConversation } from "@/lib/chat/actions";

export function ChatMenu({ hasMessages }: { hasMessages: boolean }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setConfirming(false);
  }

  async function handleClear() {
    setPending(true);
    await clearActiveConversation();
    setPending(false);
    setOpen(false);
    setConfirming(false);
    router.refresh();
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Chat-Optionen"
          className="text-muted-foreground hover:bg-muted grid size-8 place-items-center rounded-md transition-colors"
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-1.5">
        {confirming ? (
          <div className="space-y-2 p-1">
            <p className="text-foreground px-0.5 text-xs">
              Den ganzen Chat-Verlauf löschen?
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-foreground hover:bg-muted flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={pending}
                className="bg-destructive text-destructive-foreground flex-1 rounded-md px-2 py-1.5 text-sm font-medium disabled:opacity-60"
              >
                {pending ? "…" : "Löschen"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={!hasMessages}
            className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="size-4" aria-hidden />
            Chat leeren
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
