import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isSupabaseConfigured,
  requireSupabaseEnv,
} from "@/lib/supabase/config";
import type { Database } from "@/types/database";

/**
 * Refreshes the Supabase auth session on every request and forwards the
 * updated cookies. Auth *enforcement* (redirects for protected routes) is not
 * done here yet — that arrives with the auth step. If Supabase is not
 * configured this is a no-op so the app still runs.
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  if (!isSupabaseConfigured()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const { url, anonKey } = requireSupabaseEnv();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // IMPORTANT: do not run other logic between creating the client and calling
  // getUser() — it must be the first thing that touches the session.
  await supabase.auth.getUser();

  return response;
}
