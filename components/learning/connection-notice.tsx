import * as React from "react";
import Link from "next/link";
import { Info } from "lucide-react";

/**
 * Slim, honest status strips shown when the live app can't save progress yet.
 * The learning experience still works — only persistence is unavailable.
 */
function Strip({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/70 backdrop-blur-sm">
      <Info className="mt-px size-3.5 shrink-0" aria-hidden />
      <span className="flex-1">{children}</span>
    </p>
  );
}

export function SetupNotice() {
  return (
    <Strip>
      Supabase ist noch nicht verbunden — Lektionen und die{" "}
      <Link href="/demo/lesson" className="text-white underline">
        Demo
      </Link>{" "}
      funktionieren, Fortschritt wird noch nicht gespeichert.
    </Strip>
  );
}

export function SignInNotice() {
  return (
    <Strip>
      Melde dich an, um deinen Fortschritt zu speichern. Die Anmeldung kommt im
      nächsten Schritt — bis dahin kannst du alles frei ausprobieren.
    </Strip>
  );
}
