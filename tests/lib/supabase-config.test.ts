import { afterEach, describe, expect, it, vi } from "vitest";

/** Load `@/lib/supabase/config` with `@/env` mocked to a specific shape. */
async function loadConfig(env: Record<string, string | undefined>) {
  vi.resetModules();
  vi.doMock("@/env", () => ({ env }));
  return import("@/lib/supabase/config");
}

afterEach(() => {
  vi.doUnmock("@/env");
  vi.resetModules();
});

describe("supabase config guards", () => {
  it("reports configured when url + anon key are present", async () => {
    const mod = await loadConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    });
    expect(mod.isSupabaseConfigured()).toBe(true);
    expect(mod.requireSupabaseEnv()).toEqual({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
    });
  });

  it("reports not configured and throws a helpful error when missing", async () => {
    const mod = await loadConfig({});
    expect(mod.isSupabaseConfigured()).toBe(false);
    expect(() => mod.requireSupabaseEnv()).toThrow(/not configured/i);
  });

  it("throws when the service-role key is requested but unset", async () => {
    const mod = await loadConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    });
    expect(() => mod.requireServiceRoleKey()).toThrow(
      /SUPABASE_SERVICE_ROLE_KEY/,
    );
  });
});
