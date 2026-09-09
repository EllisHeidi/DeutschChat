import Link from "next/link";
import { LogOut } from "lucide-react";
import { getAccountContext } from "@/lib/auth/user";
import { signOut } from "@/lib/auth/actions";
import { CEFR_LEVEL_NAME } from "@/lib/learning/cefr";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Display } from "@/components/ui/typography";
import { TaglineLockup } from "@/components/layout/tagline-lockup";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

export const metadata = { title: "Profil" };

const NATIVE_LANGUAGE: Record<string, string> = {
  en: "Englisch",
  de: "Deutsch",
  fr: "Französisch",
  es: "Spanisch",
};

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
  const account = await getAccountContext();
  const user = account?.user ?? null;
  const displayName =
    account?.profile?.display_name?.trim() ||
    user?.email?.split("@")[0] ||
    null;
  const initials = (displayName ?? "DU").slice(0, 2).toUpperCase();
  const level = account?.learner?.current_level ?? "A1";
  const nativeLang = account?.learner?.native_language ?? "en";

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
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-base font-semibold">
            {user ? (displayName ?? "Angemeldet") : "Nicht angemeldet"}
          </p>
          <p
            className={
              user
                ? "text-muted-foreground truncate text-sm"
                : "text-muted-foreground text-sm"
            }
          >
            {user?.email ??
              "Melde dich an, um deinen Fortschritt zu speichern."}
          </p>
        </div>
      </div>

      {user ? (
        <>
          <Group title="Lernen">
            <Row
              label="Aktuelles Niveau"
              value={`${level} · ${CEFR_LEVEL_NAME[level]}`}
            />
            <Row
              label="Muttersprache"
              value={NATIVE_LANGUAGE[nativeLang] ?? nativeLang}
            />
            <Row label="Korrekturen" value="Hilfreich" muted />
          </Group>

          <Group title="App">
            <Row label="Sprache der App" value="Deutsch" muted />
            <Row label="Tägliches Ziel" value="10 Minuten" muted />
            <Row label="Erscheinungsbild" value="Hell" muted />
          </Group>

          <p className="text-muted-foreground px-1 text-xs">
            Einstellungen werden in einem späteren Schritt bearbeitbar.
          </p>

          <form action={signOut}>
            <Button type="submit" variant="secondary" className="w-full">
              <LogOut className="size-4" aria-hidden />
              Abmelden
            </Button>
          </form>
        </>
      ) : (
        <div className="border-border bg-surface space-y-3 rounded-xl border p-5 text-center">
          <p className="text-muted-foreground text-sm">
            Lektionen und Chat kannst du auch ohne Konto ausprobieren. Für
            gespeicherten Fortschritt brauchst du eins.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/registrieren">Konto erstellen</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
              <Link href="/anmelden">Anmelden</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="border-border border-t pt-8">
        <TaglineLockup />
      </div>
    </div>
  );
}
