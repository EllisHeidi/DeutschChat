import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type AppUser = { id: string; email: string | null };

export type AccountContext = {
  user: AppUser;
  profile: Pick<Tables<"profiles">, "display_name" | "avatar_url"> | null;
  learner: Pick<
    Tables<"learner_profiles">,
    "current_level" | "native_language" | "ui_locale" | "onboarded_at"
  > | null;
};

/**
 * The signed-in user, or `null` when Supabase is not configured or nobody is
 * signed in. Routes degrade gracefully rather than redirecting — Learn and Chat
 * are usable signed out; signing in only adds persistence.
 */
export async function getOptionalUser(): Promise<AppUser | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

/**
 * User plus their profile / learner_profile rows.
 *
 * The `handle_new_user` database trigger creates those rows on sign-up. This
 * also runs an idempotent safety-net upsert so a session is never left without
 * them (e.g. an account created before the trigger existed). It is NOT a second
 * source of truth — the trigger is authoritative; this only fills gaps.
 */
export async function getAccountContext(): Promise<AccountContext | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const user: AppUser = {
    id: auth.user.id,
    email: auth.user.email ?? null,
  };

  const [{ data: profile }, { data: learner }] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("learner_profiles")
      .select("current_level, native_language, ui_locale, onboarded_at")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  if (profile && learner) {
    return { user, profile, learner };
  }

  // Safety net: the trigger should have made these. Fill any gap idempotently.
  if (!profile) {
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        display_name:
          (auth.user.user_metadata?.display_name as string | undefined) ?? null,
      },
      { onConflict: "id", ignoreDuplicates: true },
    );
  }
  if (!learner) {
    await supabase
      .from("learner_profiles")
      .upsert({ id: user.id }, { onConflict: "id", ignoreDuplicates: true });
  }

  const [{ data: profile2 }, { data: learner2 }] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("learner_profiles")
      .select("current_level, native_language, ui_locale, onboarded_at")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  return { user, profile: profile2, learner: learner2 };
}
