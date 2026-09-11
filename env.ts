import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Centralised, type-safe environment access.
 *
 * - `server` vars are never exposed to the browser bundle.
 * - `client` vars must be prefixed with `NEXT_PUBLIC_`.
 * - Import from `@/env` instead of reading `process.env` directly.
 *
 * The Supabase vars are optional so the app compiles and runs before a Supabase
 * project has been created. When they ARE set they are still validated. Code
 * that needs them calls `requireSupabaseEnv()` / `isSupabaseConfigured()` from
 * `@/lib/supabase/config`, which fail loudly with setup instructions.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    // Server-side Supabase access (RLS-bypassing). Never import into client code.
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    // Chat's AI provider (lib/chat/ai.ts). Never import into client code.
    OPENAI_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
  // Set SKIP_ENV_VALIDATION=1 for lint/typecheck/CI steps that don't need real secrets.
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
