import * as React from "react";
import Link from "next/link";
import { Info, TriangleAlert } from "lucide-react";

/**
 * Slim status strips on the dashboard. Each reflects a real runtime condition —
 * they are never shown just to fill space, and Learn / Chat keep working
 * regardless of which (if any) is visible.
 */
function Strip({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
}) {
  const Icon = tone === "warn" ? TriangleAlert : Info;
  return (
    <p
      className={
        tone === "warn"
          ? "flex items-start gap-2 rounded-lg border border-amber-300/40 bg-amber-500/15 px-3 py-2 text-xs text-amber-50 backdrop-blur-sm"
          : "flex items-start gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/75 backdrop-blur-sm"
      }
    >
      <Icon className="mt-px size-3.5 shrink-0" aria-hidden />
      <span className="flex-1">{children}</span>
    </p>
  );
}

/** Supabase env vars are absent (local dev before setup). */
export function SetupNotice() {
  return (
    <Strip>
      Supabase ist nicht konfiguriert — Lektionen und die{" "}
      <Link href="/demo/lesson" className="font-medium text-white underline">
        Demo
      </Link>{" "}
      funktionieren, Fortschritt wird nicht gespeichert.
    </Strip>
  );
}

/** Supabase is configured but a request failed at runtime. */
export function ConnectionErrorNotice() {
  return (
    <Strip tone="warn">
      Verbindung zur Datenbank fehlgeschlagen. Dein Fortschritt wird gerade
      nicht geladen oder gespeichert — versuche es später erneut.
    </Strip>
  );
}

/** Configured, connected, but nobody is signed in. */
export function SignInNotice() {
  return (
    <Strip>
      <Link href="/anmelden" className="font-medium text-white underline">
        Melde dich an
      </Link>
      , um deinen Fortschritt zu speichern — Lektionen und Chat kannst du auch
      so ausprobieren.
    </Strip>
  );
}
