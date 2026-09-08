# DeutschChat

Learn German by really using it — a structured **A1** curriculum plus realistic
AI conversations, sharing one learner profile.

> **A1 is free. Always. Premium starts at A2.**

## Status

**Phase 1 — Foundation.** Step 1 (scaffold & tooling) complete. The marketing
site, authentication, Supabase schema, curriculum seed and the learner dashboard
land in the following steps.

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

## Scripts

| Script              | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the dev server                      |
| `npm run build`     | Production build                          |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run lint`      | ESLint                                    |
| `npm run test`      | Vitest (single run)                       |
| `npm run format`    | Prettier write                            |
| `npm run check`     | typecheck + lint + test                   |
| `npm run db:*`      | Supabase CLI helpers (wired up in Step 3) |

Lint/typecheck/CI steps that don't need real secrets can set
`SKIP_ENV_VALIDATION=1`.

## Architecture

Layered, with boundaries enforced by folder + lint rules:

```
components/**   presentation only — no DB or network
app/**          route segments compose data + UI (server components by default)
lib/**          domain modules: auth, learning, ai, speech, billing, analytics
lib/supabase/** the only place that talks to the database
supabase/**     schema, RLS policies and seed (migrations)
```

Full notes in [`docs/`](./docs) (added through Phase 1).
