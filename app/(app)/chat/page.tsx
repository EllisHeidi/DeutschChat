import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getOptionalUser } from "@/lib/auth/user";
import { loadActiveConversation } from "@/lib/chat/data";
import { ChatThread } from "@/components/chat/chat-thread";
import { ChatMenu } from "@/components/chat/chat-menu";
import {
  RasterIcon,
  ILLUSTRATION,
  CHARACTER,
} from "@/components/icons/raster-icon";

export const metadata = { title: "Chat" };

/**
 * Chat is an independent learning surface — it never checks lesson, level or
 * vocabulary progress, and never redirects based on it. The only requirement
 * to persist a real conversation is being signed in, exactly like Learn's
 * progress-saving; a signed-out visitor sees an explanation instead of the
 * composer, never a lock tied to Learn.
 *
 * Full-height, WhatsApp-style thread: the app shell (see app-shell.tsx)
 * gives this route the whole content area instead of a scrolling, padded
 * page — the header stays pinned, the message list owns its own scroll, and
 * the composer stays pinned to the bottom, on mobile and desktop alike.
 */
export default async function ChatPage() {
  const user = await getOptionalUser();
  const { conversationId, messages } = user
    ? await loadActiveConversation(user.id)
    : { conversationId: null, messages: [] };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-border bg-surface flex shrink-0 items-center gap-3 border-b px-3 py-2.5">
        <Link
          href="/"
          aria-label="Zurück"
          className="hover:bg-muted text-muted-foreground grid size-8 place-items-center rounded-md"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
        <Avatar initials="LE" tone="primary" src={CHARACTER.lena} />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-semibold">Lena</p>
          <p className="text-muted-foreground flex items-center gap-1 text-xs">
            <span className="bg-success size-1.5 rounded-full" aria-hidden />
            Online
          </p>
        </div>
        {user ? (
          <ChatMenu hasMessages={messages.length > 0} />
        ) : (
          <span className="text-muted-foreground grid size-8 place-items-center rounded-md">
            <MoreHorizontal className="size-4" aria-hidden />
          </span>
        )}
      </div>

      {user ? (
        <ChatThread
          key={conversationId ?? "new"}
          initialConversationId={conversationId}
          initialMessages={messages}
        />
      ) : (
        <div className="bg-background/40 flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
          <RasterIcon
            src={ILLUSTRATION.noConversations}
            className="h-16 w-auto"
          />
          <p className="text-muted-foreground max-w-xs text-sm">
            Melde dich an, um mit Lena zu chatten. Chat ist unabhängig von
            deinem Lernfortschritt — du brauchst dafür nur ein Konto.
          </p>
          <Button asChild size="lg">
            <Link href="/anmelden">Anmelden</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
