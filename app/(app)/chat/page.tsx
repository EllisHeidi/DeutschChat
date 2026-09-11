import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOptionalUser } from "@/lib/auth/user";
import { loadActiveConversation } from "@/lib/chat/data";
import { ChatThread } from "@/components/chat/chat-thread";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

export const metadata = { title: "Chat" };

/**
 * Chat is an independent learning surface — it never checks lesson, level or
 * vocabulary progress, and never redirects based on it. The only requirement
 * to persist a real conversation is being signed in, exactly like Learn's
 * progress-saving; a signed-out visitor sees an explanation instead of the
 * composer, never a lock tied to Learn.
 */
export default async function ChatPage() {
  const user = await getOptionalUser();
  const { conversationId, messages } = user
    ? await loadActiveConversation(user.id)
    : { conversationId: null, messages: [] };

  return (
    <div className="space-y-5">
      <div className="border-border bg-surface overflow-hidden rounded-2xl border">
        <div className="border-border flex items-center gap-3 border-b px-3 py-2.5">
          <Link
            href="/"
            aria-label="Zurück"
            className="hover:bg-muted text-muted-foreground grid size-8 place-items-center rounded-md"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </Link>
          <Avatar initials="LE" tone="primary" />
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-semibold">
              Lena
            </p>
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              <span className="bg-success size-1.5 rounded-full" aria-hidden />
              Online
            </p>
          </div>
          <span className="text-muted-foreground grid size-8 place-items-center rounded-md">
            <MoreHorizontal className="size-4" aria-hidden />
          </span>
        </div>

        {user ? (
          <ChatThread
            initialConversationId={conversationId}
            initialMessages={messages}
          />
        ) : (
          <div className="bg-background/40 flex flex-col items-center gap-3 px-4 py-10 text-center">
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

      <div className="border-accent/35 bg-accent/10 rounded-xl border p-4">
        <div className="flex items-center gap-2">
          <p className="text-foreground text-sm font-semibold">
            Chat ist immer offen
          </p>
          <Badge variant="free" size="sm">
            unabhängig
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
          Du brauchst keine abgeschlossene Lektion. Was du hier übst — neue
          Wörter, Korrekturen — fließt trotzdem in dein Lernprofil ein.
        </p>
      </div>
    </div>
  );
}
