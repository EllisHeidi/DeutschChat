# Step 5 Checkpoint — Supabase + Authentication

Inspection date: repository state as of the current working tree (HEAD `15260e4` "step 5 - supabase + auth", plus uncommitted follow-up fixes described below).

## Status

**PASS WITH NOTES**

The Supabase backend, authentication, and real persistence described in Step 5 are implemented, hosted, and verified — both by this inspection and by the user's own manual production testing. The "notes" are: (1) three deployment-fix files exist on disk but are not yet committed, and (2) one architectural finding worth recording about _why_ the earlier production auth bug happened, now that it's fixed, so it doesn't reappear.

## Production Verification

Manually confirmed by the user in production (`https://deutsch-chat-eta.vercel.app`) and consistent with the code paths inspected below:

- Registration creates a real Supabase Auth user.
- Email confirmation flow completes and lands the user in the app.
- Login and logout work.
- Profile and learner profile load after authentication.
- A1 curriculum loads from the hosted database (not local fallback content).
- Lessons load, complete, and write real progress.
- Progress is visibly persisted (survives reload / re-login), not browser-local state.

## Database Verification

- **Schema**: 5 migrations, applied in order to the hosted project (ref `vtfjpofkudzyhnluijmf`, West EU): `init_enums`, `curriculum`, `learner`, `chat`, and the additive `service_role_grants` fix. `npm run db:validate` (pglite, local) confirms 22 tables, RLS enabled on every one, one policy per table (22 total).
- **Seed**: A1.1 unit with 4 published lessons, 38 lesson items, 34 vocabulary rows, 4 grammar points / 12 examples, correctly cross-linked. Seed is confirmed idempotent (`db:validate`) and matches what `lib/learning/curriculum.ts` reads (DB-first with a same-source local fallback, so hosted structure and app expectations can't drift apart).
- **RLS**: owner-only `for all` policies on every private table (`profiles`, `learner_profiles`, `user_lesson_progress`, `user_vocabulary_progress`, `user_grammar_progress`, `user_skill_progress`, `user_daily_activity`, `learning_observations`, and the chat scaffolding tables). Verified both locally (pglite: cross-user isolation, anon blocked from private data, anon reads published content only) and against the live hosted project (`npm run db:check`: anon reads public curriculum, anon blocked from every private table, anon write rejected with `permission denied`).
- **Service role**: `service role reaches every expected table — 20/20` on the live project, via the additive `20260911090000_service_role_grants.sql` migration (grants only — no RLS bypass beyond Postgres's own `service_role` `BYPASSRLS`, no schema change). `createAdminClient()` exists in `lib/supabase/admin.ts` but is not imported anywhere in current app code — the running app performs 100% of its reads/writes as `anon`/`authenticated` under RLS; the service-role client is dormant infrastructure, not something request handling relies on today.
- **`npm run db:check` (live, read-only)**: all 7 checks pass — anon reads (levels, lessons, items, vocabulary), anon blocked from private tables, anon write rejected, service role reaches 20/20 tables.

## Authentication Verification

- `lib/auth/actions.ts` — `signUp`/`signIn`/`signOut` server actions, all first-checking `isSupabaseConfigured()` and returning a translated German error (never throwing) when it's not. Zod-validated input, German error translation for the handful of real Supabase Auth errors, `emailRedirectTo` built from `NEXT_PUBLIC_SITE_URL` or the request's own host as a fallback.
- `app/auth/callback/route.ts` — exchanges the Supabase email-confirmation `code` for a session cookie, redirects into the app (or back to `/anmelden?fehler=bestaetigung` on failure); restricts `next` to same-origin relative paths only.
- Profile + learner-profile creation: the `handle_new_user()` trigger (`on_auth_user_created`, `security definer`, `20260909120200_learner.sql`) inserts both rows on sign-up — the single source of truth. `lib/auth/user.ts::getAccountContext()` reads both, and only performs an idempotent upsert as a safety net for accounts that predate the trigger; it does not duplicate the trigger's logic.
- `getOptionalUser()` never redirects or throws when signed out or unconfigured — Learn and Chat both stay usable. `middleware.ts` → `lib/supabase/middleware.ts::updateSession()` refreshes the session cookie on every request and is a no-op when Supabase isn't configured.
- `tests/lib/auth-actions.test.ts` covers the action layer (176 lines); passing.

## Environment / Deployment Verification

(Variable **names** only — no values inspected or printed.)

| Variable                        | Scope           | Purpose                                 |
| ------------------------------- | --------------- | --------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | client + server | Project URL                             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Anon key, RLS-bound                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | server only     | Admin client, dormant in app code today |
| `NEXT_PUBLIC_SITE_URL`          | client + server | Auth email redirect base                |

- Config wiring is centralized in `env.ts` (`@t3-oss/env-nextjs`), the sole reader of these four names app-wide (confirmed by grep — the only other references are the dev-only `scripts/db/check-connection.ts` and the test-only `vitest.setup.ts` fallback).
- Supabase Auth: Site URL set to `https://deutsch-chat-eta.vercel.app`, redirect allow-list includes `/auth/callback` — user-confirmed, matches what `app/auth/callback/route.ts` expects.
- `.env.example` contains placeholders only, no real values. `.gitignore` excludes `.env`, `.env*.local`, `/supabase/.env`. `git ls-files | grep -i env` shows only `.env.example` tracked. No secrets found in tracked files.
- **Architectural note on the earlier production bug** (now resolved by a fresh build): `NEXT_PUBLIC_*` values are inlined into the compiled output at `next build` time, not read at request runtime. This build here demonstrates the mechanism directly — with `.env.local` present, `next build` renders `/` as **ƒ Dynamic**, because `getOptionalUser()` calls `cookies()`, which forces dynamic rendering. If those vars are absent at build time, `isSupabaseConfigured()` short-circuits _before_ `cookies()` is ever touched, so `/` gets prerendered once as **static** and permanently bakes in the "not configured" banner — exactly what was observed in production before the rebuild. Worth remembering for any future deploy: a "Redeploy" that reuses an existing build artifact (rather than running a fresh `next build`) will not pick up newly-added `NEXT_PUBLIC_*` values.

## Automated Validation

| Command                                     | Result                               |
| ------------------------------------------- | ------------------------------------ |
| `npm run typecheck`                         | ✅ pass                              |
| `npm run lint`                              | ✅ pass                              |
| `npm run format:check`                      | ✅ pass                              |
| `npm run test`                              | ✅ pass — 81/81 tests, 15/15 files   |
| `npm run build`                             | ✅ pass (Next.js 16.3.4 / Turbopack) |
| `npm run db:validate` (pglite, local)       | ✅ pass — all checks green           |
| `npm run db:check` (live hosted, read-only) | ✅ pass — all 7 checks green         |

No failures. Nothing was modified to make any of these pass.

## Architecture Verification

- ✅ **Learn is backed by Supabase.** `lib/learning/curriculum.ts` reads lessons/items from the hosted DB when configured, with a same-source local fallback only when it isn't.
- ✅ **Auth is backed by Supabase.** Cookie-based `@supabase/ssr` sessions; no parallel auth system.
- ✅ **User progress is persisted.** `lib/learning/actions.ts::completeLesson()` writes lesson progress, vocabulary exposure, skill progress, grammar progress, one `learning_observations` row per answered item, and a daily-activity rollup, in a single server action, gated only on the user actually being signed in (`getOptionalUser()`), never faked.
- ✅ **Chat is NOT yet implemented.** `app/(app)/chat/page.tsx` is a static UI shell with a hardcoded example thread; no Supabase import, no server action wired to a table. The DB scaffolding (`chat_scenarios`, `conversations`, `conversation_messages`, `message_corrections`) exists from an earlier step but nothing in current app code reads or writes it (confirmed by grep).
- ✅ **Chat is NOT gated by Learn progress.** No auth check, no progress check, no redirect in the chat route. `tests/components/chat-independence.test.tsx` asserts this at both the rendered-output and source-code level (fails if `getOptionalUser`, `getAccountContext`, `user_lesson_progress`, or a redirect ever creeps into that file). `db:validate` additionally checks "a brand-new user with 0 lesson progress can start a conversation" at the RLS level.
- ✅ **Demo remains isolated.** `app/demo/lesson/` reads only from `content/curriculum/demo` (static TS content); no Supabase import anywhere under `app/demo/`.

## Known Limitations / Future Work

- **Three files exist on disk but are not committed** (per the standing "do not commit" instruction for this phase): `app/(auth)/layout.tsx` (logo swap to match the nav wordmark), `supabase/config.toml` (`major_version` corrected to match the hosted project's actual Postgres 17), `types/database.ts` (regenerated from the live schema). One new file is untracked: `supabase/migrations/20260911090000_service_role_grants.sql`. All four are validated (typecheck, lint, `db:validate`, and the migration is already applied to the hosted project) — they're waiting on an explicit commit/push instruction, not on further work.
- Chat has a data model but no AI backend, no realtime, no STT/TTS, no message persistence path — explicitly out of scope for Step 5, confirmed still true.
- No adaptive learning / SRS scheduling yet — `user_vocabulary_progress.due_at` and `user_grammar_progress` exist in the schema but nothing currently reads or writes a due-date-driven review queue.
- No Goethe exam system — not present in schema or app code.
- No subscription/premium gating logic — `isFreeLevel()` exists for UI display only; nothing enforces it server-side yet.
- `createAdminClient()` (service-role) is defined but unused by any request path — fine today, but a future feature that needs it (e.g. a webhook or scheduled job) should route through it deliberately rather than reaching for the anon client with elevated assumptions.
- The `middleware` file convention is flagged as deprecated by Next.js 16.3.4 in favor of `proxy` (non-blocking build warning, not a Step 5 regression — worth a note for a future maintenance pass).

## Recommended Next Step

**Step 6 should build the real Chat backend**, since Learn's persistence is now solid and Chat is the next thing the DB schema already anticipates but the app doesn't yet deliver:

1. Wire `conversations` / `conversation_messages` to real reads/writes behind server actions (mirroring the pattern already proven in `lib/learning/actions.ts`), still gated on nothing but "signed in optional" — persistence for signed-in users, ephemeral for signed-out, never a hard gate.
2. Introduce the actual AI conversation call (OpenAI or equivalent) — explicitly excluded from Step 5, now the natural next boundary.
3. Feed `learning_observations` from real chat turns (the `message_id` FK and `message_corrections` table are already there, unused) — this is what makes Chat start contributing to the learner profile, not just Learn.
4. Leave adaptive learning, Goethe exam, and subscriptions for a later step, per the same exclusions that applied to Step 5.

## Change Log

Step 5 (`15260e4`, 28 files, +1457/-63) introduced:

- `lib/auth/actions.ts`, `lib/auth/user.ts` — auth server actions + user/account context.
- `app/(auth)/layout.tsx`, `anmelden/page.tsx`, `registrieren/page.tsx`, `components/auth/auth-form.tsx` — sign-in/sign-up UI.
- `app/auth/callback/route.ts` — email-confirmation landing route.
- `lib/learning/actions.ts` — real lesson-completion persistence (progress, vocab, skill, grammar, observations, daily activity).
- `lib/learning/dashboard.ts`, `progress.ts`, `curriculum.ts` extended for live-DB reads with graceful fallback.
- `components/learning/connection-notice.tsx` — the three real (never faked) connection-state banners: not configured / connection error / signed out.
- `scripts/db/check-connection.ts`, `scripts/db/validate.ts` — hosted and local validation harnesses.
- `docs/SUPABASE.md` — deploy guide.
- Test coverage: `tests/lib/auth-actions.test.ts`, `tests/components/chat-independence.test.tsx`, `tests/lib/lesson-progress.test.ts`, `tests/lib/curriculum.test.ts`.

Post-commit deployment work (this session, files on disk, not yet committed):

- Linked and pushed migrations + seed to the hosted Supabase project.
- Regenerated `types/database.ts` from the live schema.
- Added `supabase/migrations/20260911090000_service_role_grants.sql` after discovering `service_role` had `BYPASSRLS` but no table `GRANT`s (a real, previously-undetected gap between RLS and Postgres privileges) — validated locally, applied to hosted, confirmed via before/after `db:check` (0/20 → 20/20).
- Corrected `supabase/config.toml`'s `major_version` (16 → 17) to match the hosted project's actual Postgres version — a CLI-config fix, not a migration.
- Diagnosed and resolved the production "Supabase ist nicht verbunden" bug: the deployed build artifact predated the `NEXT_PUBLIC_*` env vars being added on Vercel; a genuine fresh `next build` (not a re-promotion of the old artifact) fixed it. User has since manually verified registration, confirmation, login, logout, and persisted progress all work in production.
- Swapped the auth pages' logo (`app/(auth)/layout.tsx`) from the generic `Logo` component to the same wordmark image (`BRAND.wordmark`) the real nav sidebar/top bar uses.

### Step 5 Sign-off

The repository is **ready to proceed to Step 6**. Every automated gate is green, hosted RLS and the service-role grant gap are both verified fixed against the live project, and the user has independently confirmed the full auth + persistence loop works in production. The only open item is committing the four pending deployment-fix files (auth layout logo, `config.toml`, `types/database.ts`, the new migration) — recommend doing that as its own small commit before starting Step 6, so Step 6 doesn't get bundled with unrelated Step 5 cleanup.
