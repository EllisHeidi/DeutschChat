import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Tests never validate real env or hit a network. Provide harmless stand-ins
// so `@/env` and the Supabase client factories are usable in unit tests.
process.env.SKIP_ENV_VALIDATION = "1";
process.env.NEXT_PUBLIC_SUPABASE_URL ??= "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??= "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY ??= "test-service-role-key";
process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";

afterEach(() => {
  cleanup();
});
