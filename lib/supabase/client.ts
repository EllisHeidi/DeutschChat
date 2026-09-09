"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseEnv } from "@/lib/supabase/config";
import type { Database } from "@/types/database";

/**
 * Supabase client for use in Client Components / browser code.
 * Uses the anon key and the user's cookie-based session.
 */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}
