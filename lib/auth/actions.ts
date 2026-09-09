"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "@/env";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

/**
 * Authentication server actions. Thin wrappers over Supabase Auth using the
 * cookie-bound server client, so the session lands in an httpOnly cookie and
 * the browser never sees a token directly.
 *
 * The rest of the app degrades gracefully when signed out — these actions are
 * the only way in, never a gate in front of Learn or Chat.
 */

export type AuthResult =
  { error: string } | { ok: true; needsConfirm?: boolean };

const credentials = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z
    .string()
    .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
    .max(72, "Das Passwort darf höchstens 72 Zeichen lang sein."),
});

const signUpSchema = credentials.extend({
  displayName: z.preprocess((v) => {
    if (typeof v !== "string") return undefined;
    const t = v.trim();
    return t.length > 0 ? t : undefined;
  }, z.string().max(80, "Der Name darf höchstens 80 Zeichen lang sein.").optional()),
});

function notConfigured(): AuthResult {
  return {
    error:
      "Die Anmeldung ist noch nicht verfügbar — Supabase ist nicht verbunden.",
  };
}

/** Absolute origin for auth email redirect links. */
async function siteOrigin(): Promise<string> {
  const configured = env.NEXT_PUBLIC_SITE_URL;
  if (configured && !configured.includes("localhost")) return configured;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : configured;
}

export async function signUp(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) return notConfigured();

  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${await siteOrigin()}/auth/callback`,
      data: parsed.data.displayName
        ? { display_name: parsed.data.displayName }
        : undefined,
    },
  });

  if (error) return { error: translateAuthError(error.message) };

  // Confirmation on: no session yet, identities present -> check inbox.
  const needsConfirm = !data.session;
  if (needsConfirm) return { ok: true, needsConfirm: true };

  redirect("/");
}

export async function signIn(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  if (!isSupabaseConfigured()) return notConfigured();

  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: translateAuthError(error.message) };

  redirect("/");
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}

/** Map the handful of Supabase auth errors users actually hit to German. */
function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "E-Mail oder Passwort ist falsch.";
  if (m.includes("email not confirmed"))
    return "Bitte bestätige zuerst deine E-Mail-Adresse.";
  if (
    m.includes("user already registered") ||
    m.includes("already been registered")
  )
    return "Diese E-Mail-Adresse ist bereits registriert. Melde dich an.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Zu viele Versuche. Bitte versuche es später erneut.";
  if (m.includes("password"))
    return "Das Passwort erfüllt die Anforderungen nicht.";
  return "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.";
}
