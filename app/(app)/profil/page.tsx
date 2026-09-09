import { ChevronRight } from "lucide-react";
import { getOptionalUser } from "@/lib/auth/user";
import { Avatar } from "@/components/ui/avatar";
import { Display } from "@/components/ui/typography";
import { TaglineLockup } from "@/components/layout/tagline-lockup";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

export const metadata = { title: "Profil" };

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
      <span className="text-foreground">{label}</span>
      <span
        className={
          muted ? "text-muted-foreground" : "text-muted-foreground font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-muted-foreground px-1 text-xs font-semibold tracking-wide uppercase">
        {title}
      </h2>
      <div className="border-border bg-surface divide-border divide-y overflow-hidden rounded-xl border">
        {children}
      </div>
    </section>
  );
}

export default async function ProfilePage() {
  const user = await getOptionalUser();
  const name = user?.email?.split("@")[0] ?? "Gast";
  const initials = name.slice(0, 2);

  return (
    <div className="space-y-7">
      <header className="space-y-1">
        <Display>Profil</Display>
      </header>

      <div className="border-border bg-surface flex items-center gap-3.5 rounded-xl border p-4">
        {user ? (
          <Avatar initials={initials} size="lg" tone="primary" />
        ) : (
          <RasterIcon
            src={ILLUSTRATION.noProfile}
            className="size-12 shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="text-foreground text-base font-semibold">
            {user ? name : "Noch nicht angemeldet"}
          </p>
          <p className="text-muted-foreground truncate text-sm">
            {user?.email ?? "Anmeldung folgt im nächsten Schritt"}
          </p>
        </div>
      </div>

      <Group title="App">
        <Row label="Sprache der App" value="Deutsch" />
        <Row label="Tägliches Ziel" value="10 Minuten" />
        <Row label="Erscheinungsbild" value="Hell" />
      </Group>

      <Group title="Lernen">
        <Row label="Muttersprache" value="Englisch" />
        <Row label="Korrekturen" value="Hilfreich" />
        <Row label="Übersetzungen anzeigen" value="An" muted />
      </Group>

      <p className="text-muted-foreground flex items-center gap-1.5 px-1 text-xs">
        Einstellungen werden im nächsten Schritt bearbeitbar
        <ChevronRight className="size-3" aria-hidden />
      </p>

      <div className="border-border border-t pt-8">
        <TaglineLockup />
      </div>
    </div>
  );
}
