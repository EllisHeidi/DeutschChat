import { env } from "@/env";

const SETUP_HINT =
  "Supabase is not configured. Copy .env.example to .env.local and set " +
  "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY " +
  "(Supabase dashboard → Project Settings → API).";

/** True once the public Supabase URL + anon key are both present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Returns the public Supabase connection values, or throws with setup steps. */
export function requireSupabaseEnv(): { url: string; anonKey: string } {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error(SETUP_HINT);
  return { url, anonKey };
}

/** Returns the service-role key (server-only), or throws with setup steps. */
export function requireServiceRoleKey(): string {
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local " +
        "(Supabase dashboard → Project Settings → API → service_role). Server only.",
    );
  }
  return key;
}
