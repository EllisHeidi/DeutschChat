# Database

Postgres on Supabase. Schema is defined in versioned SQL migrations under
[`../supabase/migrations/`](../supabase/migrations) — that is the source of
truth. `types/database.ts` is generated from it.

## Migrations

| File                        | Contents                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `20260909120000_init_enums` | Enums + the shared `set_updated_at()` trigger helper                                    |
| `20260909120100_curriculum` | Levels, skills, units → lessons → lesson items, vocabulary, grammar                     |
| `20260909120200_learner`    | Profiles, learner profiles, per-user progress, learning observations, `handle_new_user` |
| `20260909120300_chat`       | Chat scenarios, conversations, messages, corrections                                    |

Apply locally against pglite with `npm run db:validate`; apply to the hosted
project with `npm run db:push` once linked.

## Model

### Identity

- `auth.users` (Supabase-managed) is the only source of identity.
- `profiles` — public-facing account info (`display_name`, `avatar_url`), keyed
  by the auth user id.
- `learner_profiles` — learning config (`current_level`, `target_level`,
  `native_language`, `ui_locale`, `learning_preferences` jsonb).
- A trigger (`handle_new_user`) creates both rows on signup.

### Curriculum (shared, read-only content)

```
levels (A1…C1, is_free)          skills (reading, listening, …)
  └─ units (published?)
       └─ lessons (published?, lesson_type)
            └─ lesson_items (item_type, content jsonb)
                 ├─ lesson_item_vocabulary → vocabulary
                 └─ lesson_item_grammar    → grammar_points
vocabulary (lemma, translation, part_of_speech, cefr_level, …)
grammar_points ─ grammar_examples
```

`levels.is_free` represents access (A1 free, A2–C1 premium). Subscription-aware
RLS is a later migration; nothing is enforced in the DB yet.

Item payloads (`lesson_items.content`) are jsonb because activity shapes are
genuinely polymorphic per `item_type`. Everything relational — ordering, links
to vocab/grammar, publish state — is columns and join tables.

### Per-user learning data (private)

| Table                      | Purpose                                                                   |
| -------------------------- | ------------------------------------------------------------------------- |
| `user_lesson_progress`     | status + completion + score per lesson                                    |
| `user_vocabulary_progress` | per-word: `new / learning / known / needs_review`, strength, SRS `due_at` |
| `user_grammar_progress`    | per-point: `new / learning / weak / mastered`, strength                   |
| `user_skill_progress`      | score per skill per level                                                 |
| `user_daily_activity`      | one row per day — streaks / dashboard                                     |
| `learning_observations`    | one row per atomic learning signal (see below)                            |

`strength` columns exist so mastery can be _stored_ once we compute it — the
adaptive algorithm is not built. New learners have zero rows everywhere, so the
dashboard renders honest empty states.

### Chat (scaffolding — no AI yet)

```
chat_scenarios (published?, persona, goals jsonb)
conversations (user, scenario?, mode, status)
  └─ conversation_messages (sender, content, sequence)
       └─ message_corrections (kind, original/corrected, → grammar_point / vocabulary)
```

### LEARN ↔ CHAT bridge

`learning_observations` is the connective tissue. Every row belongs to a user
and points back — via nullable FKs — to whatever produced it:

```
learning_observations
  source: lesson | conversation | review | exam
  result: correct | incorrect | partial | exposure
  → lesson_item_id      (a lesson attempt)
  → message_id          (a chat message)
  → vocabulary_id       (which word)
  → grammar_point_id    (which grammar point)
```

A chat correction can therefore feed the same mastery signal a lesson does.
The intelligence that reads these and updates `user_*_progress` is future work;
the data model already supports it.

## Row Level Security

RLS is enabled on **every** table.

- **Content** (`levels`, `skills`, `vocabulary`, `grammar_*`, `units`,
  `lessons`, `lesson_items`, joins, `chat_scenarios`): world-readable —
  reference tables always, everything else only when `is_published`. No
  client writes; content is authored via migrations / the service role.
- **Per-user tables**: a single `for all` policy per table,
  `using` + `with check` both asserting `auth.uid() = user_id` (or `= id` for
  the profile tables). A user can only ever read or write their own rows;
  there is no policy that exposes another user's data.

`npm run db:validate` proves this: it applies the migrations to an in-process
Postgres and checks that one user cannot read or write another user's rows and
that `anon` sees no private data.

## Clients

| Import                  | Runs where                                   | Key          | RLS    |
| ----------------------- | -------------------------------------------- | ------------ | ------ |
| `@/lib/supabase/client` | browser / Client Components                  | anon         | yes    |
| `@/lib/supabase/server` | Server Components / Actions / Route Handlers | anon         | yes    |
| `@/lib/supabase/admin`  | trusted server jobs only                     | service_role | **no** |

`middleware.ts` refreshes the session cookie on every request (no-op until
Supabase is configured). All three factories throw a helpful error if the
relevant env vars are missing.
