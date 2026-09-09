import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AppUser = { id: string; email: string | null };

/**
 * The signed-in user, or `null` when Supabase is not configured or nobody is
 * signed in. Authentication *screens* arrive in a later step — for now routes
 * degrade gracefully rather than redirecting.
 */
export async function getOptionalUser(): Promise<AppUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return { id: data.user.id, email: data.user.email ?? null };
}
