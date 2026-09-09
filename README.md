# DeutschChat

Learn German by really using it — a structured **A1** curriculum plus realistic
AI conversations, sharing one learner profile.

> **A1 is free. Always. Premium starts at A2.**

## Status

**Phase 1 — Foundation.** Complete: scaffold & tooling (Step 1), the design
system + `/kitchen-sink` (Step 2), and the Supabase/Postgres schema, RLS and
client wiring (Step 3). The A1 curriculum, authentication screens and the
learner dashboard land in the following steps.

The app compiles and runs with **no Supabase credentials** — anything that
talks to the database throws a clear "not configured" error until
`.env.local` is filled in.

## Tech stack

| Area      | Choice                                               |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19), TypeScript strict |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)          |
| UI        | shadcn/ui + lucide-react (added in Step 2)           |
| Backend   | Supabase (Postgres, Auth, RLS) — hosted project      |
| Testing   | Vitest + Testing Library                             |
| Tooling   | ESLint (flat) + Prettier + typed env (`@t3-oss/env`) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project values
npm run dev
```

Open http://localhost:3000.

### Environment variables

All env access goes through [`env.ts`](./env.ts) — never read `process.env`
directly. See [`.env.example`](./.env.example) for the full list. `.env.local` is
gitignored and must never be committed. The `service_role` key is server-only.

## Database

The schema lives in [`supabase/migrations/`](./supabase/migrations) — the source
of truth. See [`docs/database.md`](./docs/database.md) for the model and RLS
approach.

```bash
npm run db:validate            # apply migrations to an in-process Postgres and check structure + RLS

# once you have a hosted Supabase project:
export SUPABASE_ACCESS_TOKEN=... # https://supabase.com/dashboard/account/tokens
npx supabase link --project-ref <your-project-ref>
npm run db:push                # apply supabase/migrations/* to the project
npm run db:types               # regenerate types/database.ts from the live schema
```

## Scripts

| Script                | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `npm run dev`         | Start the dev server                                |
| `npm run build`       | Production build                                    |
| `npm run typecheck`   | `tsc --noEmit`                                      |
| `npm run lint`        | ESLint                                              |
| `npm run test`        | Vitest (single run)                                 |
| `npm run format`      | Prettier write                                      |
| `npm run check`       | typecheck + lint + test                             |
| `npm run db:validate` | Run migrations against pglite; check schema + RLS   |
| `npm run db:push`     | `supabase db push` (needs a linked project)         |
| `npm run db:types`    | Regenerate `types/database.ts` from the live schema |
| `npm run db:diff`     | `supabase db diff`                                  |
| `npm run db:link`     | `supabase link`                                     |

## Architecture

Layered, with boundaries enforced by folder + lint rules:

```
components/**    presentation only — no DB or network
app/**           route segments compose data + UI (server components by default)
lib/supabase/**  the only place that talks to the database
                   client.ts   browser (anon key)
                   server.ts    server components / actions (anon key, RLS applies)
                   admin.ts     service role — bypasses RLS, server-only
                   middleware.ts session refresh
lib/learning/**  domain helpers (CEFR levels, mastery states)
types/database.ts generated Supabase types (regenerate with `npm run db:types`)
supabase/**      schema, RLS policies and seed (migrations)
```

Full notes in [`docs/`](./docs).
