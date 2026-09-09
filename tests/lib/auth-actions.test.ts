import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Auth server actions. Supabase + the Next request helpers are mocked; we only
 * assert validation, the not-configured guard, and that a happy path hands off
 * to Supabase and redirects.
 */

const authMock = {
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
};

let configured = true;

vi.mock("@/lib/supabase/config", () => ({
  isSupabaseConfigured: () => configured,
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: authMock }),
}));
vi.mock("@/env", () => ({
  env: { NEXT_PUBLIC_SITE_URL: "https://deutschchat.example" },
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ host: "deutschchat.example" }),
}));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`);
  },
}));

async function load() {
  return import("@/lib/auth/actions");
}

function form(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, v);
  return fd;
}

beforeEach(() => {
  configured = true;
  authMock.signInWithPassword.mockReset();
  authMock.signUp.mockReset();
  authMock.signOut.mockReset();
});

afterEach(() => {
  vi.resetModules();
});

describe("signIn", () => {
  it("rejects an invalid email before calling Supabase", async () => {
    const { signIn } = await load();
    const res = await signIn(
      null,
      form({ email: "nope", password: "12345678" }),
    );
    expect(res).toEqual({ error: expect.stringMatching(/E-Mail/) });
    expect(authMock.signInWithPassword).not.toHaveBeenCalled();
  });

  it("rejects a short password", async () => {
    const { signIn } = await load();
    const res = await signIn(
      null,
      form({ email: "a@b.de", password: "short" }),
    );
    expect(res).toEqual({ error: expect.stringMatching(/Passwort/) });
  });

  it("returns a friendly message on bad credentials", async () => {
    authMock.signInWithPassword.mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });
    const { signIn } = await load();
    const res = await signIn(
      null,
      form({ email: "a@b.de", password: "password1" }),
    );
    expect(res).toEqual({ error: "E-Mail oder Passwort ist falsch." });
  });

  it("redirects home on success", async () => {
    authMock.signInWithPassword.mockResolvedValue({ error: null });
    const { signIn } = await load();
    await expect(
      signIn(null, form({ email: "a@b.de", password: "password1" })),
    ).rejects.toThrow("REDIRECT:/");
    expect(authMock.signInWithPassword).toHaveBeenCalledWith({
      email: "a@b.de",
      password: "password1",
    });
  });

  it("degrades gracefully when Supabase is not configured", async () => {
    configured = false;
    const { signIn } = await load();
    const res = await signIn(
      null,
      form({ email: "a@b.de", password: "password1" }),
    );
    expect(res).toEqual({ error: expect.stringMatching(/nicht verbunden/) });
  });
});

describe("signUp", () => {
  it("passes the display name through and asks for confirmation", async () => {
    authMock.signUp.mockResolvedValue({ data: { session: null }, error: null });
    const { signUp } = await load();
    const res = await signUp(
      null,
      form({
        email: "new@user.de",
        password: "password1",
        displayName: "Heidi",
      }),
    );
    expect(res).toEqual({ ok: true, needsConfirm: true });
    expect(authMock.signUp).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "new@user.de",
        password: "password1",
        options: expect.objectContaining({
          data: { display_name: "Heidi" },
        }),
      }),
    );
  });

  it("redirects immediately when a session comes back (no confirmation)", async () => {
    authMock.signUp.mockResolvedValue({
      data: { session: { access_token: "x" } },
      error: null,
    });
    const { signUp } = await load();
    await expect(
      signUp(null, form({ email: "new@user.de", password: "password1" })),
    ).rejects.toThrow("REDIRECT:/");
  });

  it("explains a duplicate registration", async () => {
    authMock.signUp.mockResolvedValue({
      data: { session: null },
      error: { message: "User already registered" },
    });
    const { signUp } = await load();
    const res = await signUp(
      null,
      form({ email: "dupe@user.de", password: "password1" }),
    );
    expect(res).toEqual({
      error: expect.stringMatching(/bereits registriert/),
    });
  });
});

describe("signOut", () => {
  it("ends the Supabase session and redirects home", async () => {
    authMock.signOut.mockResolvedValue({ error: null });
    const { signOut } = await load();
    await expect(signOut()).rejects.toThrow("REDIRECT:/");
    expect(authMock.signOut).toHaveBeenCalled();
  });

  it("still redirects home when Supabase is not configured", async () => {
    configured = false;
    const { signOut } = await load();
    await expect(signOut()).rejects.toThrow("REDIRECT:/");
    expect(authMock.signOut).not.toHaveBeenCalled();
  });
});
