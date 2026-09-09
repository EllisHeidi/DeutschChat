import Link from "next/link";
import { ChevronLeft, MoreHorizontal, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/chat/chat-message";
import { CorrectionNote } from "@/components/chat/correction-note";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";
import type { ChatMessageModel } from "@/components/chat/types";

export const metadata = { title: "Chat" };

const thread: ChatMessageModel[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hallo! 😊 Wie geht es dir?",
    time: "09:41",
    playable: true,
  },
  { id: "2", role: "user", content: "Mir geht gut danke!", time: "09:42" },
];

export default function ChatPage() {
  return (
    <div className="space-y-5">
      <div className="border-border bg-surface overflow-hidden rounded-2xl border">
        {/* conversation header */}
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

        {/* thread */}
        <div className="bg-background/40 space-y-4 px-4 py-5">
          <ChatMessage message={thread[0]!} characterInitials="LE" />
          <ChatMessage
            message={thread[1]!}
            footer={
              <CorrectionNote
                kind="minor"
                original="Mir geht gut danke!"
                suggestion="Mir geht es gut, danke!"
                note="„gehen“ braucht hier „es“: Mir geht es gut."
              />
            }
          />
          <div className="flex items-start gap-2.5">
            <Avatar initials="LE" size="sm" tone="primary" />
            <div className="border-border bg-surface rounded-2xl rounded-bl-sm border px-3.5 py-2.5 text-sm">
              <span lang="de">
                Und was machst du <span className="vocab-underline">heute</span>
                ?
              </span>
            </div>
          </div>
          <TypingIndicator characterName="Lena" characterInitials="LE" />
        </div>

        {/* composer */}
        <div className="border-border flex items-center gap-2 border-t p-2.5">
          <div className="border-border-strong bg-surface text-muted-foreground flex-1 rounded-full border px-4 py-2 text-sm">
            Nachricht schreiben …
          </div>
          <span className="bg-primary/60 text-primary-foreground grid size-9 place-items-center rounded-full">
            <Send className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      <div className="border-border-strong bg-muted/30 flex flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center">
        <RasterIcon
          src={ILLUSTRATION.noConversations}
          className="h-16 w-auto"
        />
        <p className="text-muted-foreground max-w-xs text-xs">
          Vorschau — echte Gespräche kommen in einem späteren Schritt.
        </p>
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
