import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  requireSupabaseEnv,
  requireServiceRoleKey,
} from "@/lib/supabase/config";
import type { Database } from "@/types/database";

/**
 * Service-role Supabase client. **Bypasses Row Level Security.** Server-only.
 *
 * Use ONLY for trusted background work that is not acting on behalf of a
 * specific signed-in user (e.g. webhooks, scheduled jobs, admin scripts).
 * For anything in a normal request/response cycle, use `@/lib/supabase/server`
 * so RLS still applies.
 */
export function createAdminClient() {
  const { url } = requireSupabaseEnv();
  return createSupabaseClient<Database>(url, requireServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
