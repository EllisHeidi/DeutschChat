# Connecting the hosted Supabase project

Everything in the app is already wired to Supabase — it reads real data when the
environment variables are present and degrades gracefully when they are not.
The steps below are the operator actions that can't be done from code.

## 1. Environment variables

The app needs exactly these. On Vercel the Supabase integration provisions them;
confirm the names under **Vercel → Project → Settings → Environment Variables**.

| Name                            | Where it's used             | Secret? |
| ------------------------------- | --------------------------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | browser + server            | no      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server            | no      |
| `SUPABASE_SERVICE_ROLE_KEY`     | server only (scripts/admin) | **yes** |
| `NEXT_PUBLIC_SITE_URL`          | auth email redirect links   | no      |

`SUPABASE_SERVICE_ROLE_KEY` must never be `NEXT_PUBLIC_` and is never imported
into client code (`lib/supabase/admin.ts` is `server-only`).

For local work, copy `.env.example` → `.env.local` and fill the same four.

## 2. Apply the schema + curriculum

```bash
export SUPABASE_ACCESS_TOKEN=...           # dashboard → account → access tokens
npx supabase link --project-ref <ref>      # <ref> from the project URL
npx supabase db push --include-seed        # 4 migrations + supabase/seed.sql
npm run db:types                           # regenerate types/database.ts (optional)
```

- The **4 migrations** create the 22 tables, enums, indexes, triggers and RLS
  policies, and seed the `levels` / `skills` reference rows.
- `--include-seed` also runs `supabase/seed.sql` (curriculum: units, lessons,
  lesson_items, vocabulary, grammar). It is idempotent (`on conflict do nothing`).
- **Without the seed, lessons still play** (the app falls back to the
  version-controlled TS content) **but progress can't persist** — the DB has no
  `lessons` rows to reference.

## 3. Auth URL configuration (Supabase dashboard)

**Authentication → URL Configuration:**

- **Site URL:** your production origin, e.g. `https://deutsch-chat-eta.vercel.app`
- **Redirect URLs (allow-list):** add
  - `https://deutsch-chat-eta.vercel.app/**`
  - `https://deutsch-chat-eta.vercel.app/auth/callback`
  - `http://localhost:3000/**` (for local dev)

Email confirmation is **on** by default. For fast local testing you can turn it
off under **Authentication → Providers → Email → Confirm email**.

## 4. Verify the live connection

```bash
npm run db:check        # reads .env.local, makes NO writes
```

Checks that anon can read published curriculum, cannot read/write private
tables, and (with the service-role key) that every table is reachable.

Deeper RLS enforcement (cross-user isolation, chat independence) is covered by
`npm run db:validate`, which runs the same migrations against an in-process
Postgres.

## How the pieces fit

| Concern                | Client                       | Notes                                   |
| ---------------------- | ---------------------------- | --------------------------------------- |
| Browser / client comps | `lib/supabase/client.ts`     | anon key, cookie session, RLS applies   |
| Server comps / actions | `lib/supabase/server.ts`     | anon key + cookies, acts as the user    |
| Session refresh        | `lib/supabase/middleware.ts` | runs on every request                   |
| Privileged / scripts   | `lib/supabase/admin.ts`      | service role, `server-only`, RLS bypass |

New sign-ups get a `profiles` + `learner_profiles` row from the
`handle_new_user` database trigger (`20260909120200_learner.sql`).
`getAccountContext()` has an idempotent safety-net upsert for the rare gap.
