import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { CHARACTER } from "@/components/icons/raster-icon";
import { getOptionalUser } from "@/lib/auth/user";
import { loadActiveConversation } from "@/lib/chat/data";

export const metadata = { title: "Chats" };

const timeFormat = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * The "leave a conversation" destination — a WhatsApp-style chat list.
 * Only Lena exists today; this is where more personas show up once they do,
 * so leaving a conversation lands somewhere with room to grow instead of
 * dumping the user back on the dashboard. The preview row is real — it
 * reads the actual last message, not placeholder text.
 *
 * Full-bleed (see app-shell.tsx) so this page owns a plain white background
 * and its own scroll, and the row can span edge to edge without fighting the
 * shared page wrapper's padding.
 */
export default async function ChatPeoplePage() {
  const user = await getOptionalUser();
  const { messages } = user
    ? await loadActiveConversation(user.id)
    : { messages: [] };
  const last = messages.at(-1);

  const preview = last
    ? `${last.sender === "user" ? "Du: " : ""}${last.content}`
    : "Deine KI-Lernbegleiterin für Deutsch";
  const time = last ? timeFormat.format(new Date(last.created_at)) : null;

  return (
    <div className="bg-surface flex h-full min-h-0 flex-col overflow-y-auto">
      <Link
        href="/chat"
        className="border-border hover:bg-muted focus-visible:ring-ring flex h-20 shrink-0 items-center gap-4 border-y px-4 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:h-24 sm:px-6 lg:px-8"
      >
        <Avatar initials="LE" size="lg" tone="primary" src={CHARACTER.lena} />
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-base font-semibold">Lena</p>
          <p className="text-muted-foreground truncate text-sm">{preview}</p>
        </div>
        {time ? (
          <span className="text-muted-foreground shrink-0 text-xs">{time}</span>
        ) : null}
      </Link>

      <p className="text-muted-foreground px-4 py-4 text-center text-xs sm:px-6 lg:px-8">
        Weitere Gesprächspartner folgen bald.
      </p>
    </div>
  );
}
