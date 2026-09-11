# Step 6 Checkpoint — Real Chat Backend

## Status

**PASS WITH NOTES** — the full vertical slice is implemented, tested, and
verified end-to-end against the real logic and the real database schema,
except for the actual AI reply, which cannot be implemented yet: **no AI
provider exists anywhere in this repository** (no SDK dependency, no env
var, no client). Per the Step 6 instructions, I stopped before choosing one
or inventing credentials. Sending a message today correctly persists the
user's message and then surfaces "Der KI-Gesprächspartner ist noch nicht
eingerichtet." — a real, honest error state, not a fake reply.

## What was implemented

A complete, minimal Chat vertical slice:

- A signed-in user opens `/chat`.
- Their one ongoing conversation (if any) loads with its messages, oldest
  first.
- Typing a message and sending it saves the message, attempts an AI reply,
  and (once a provider is configured) will save and show that reply.
- Refreshing the page, navigating away and back, or signing out and back in
  all preserve the conversation — it's read straight from
  `conversation_messages` on every load, not client state.
- A signed-out visitor sees an explanation and a sign-in link instead of the
  composer — never a fake conversation, never a lesson-progress gate.

**Deliberate scope decision:** Step 6 uses **one ongoing conversation per
user**, not a conversation list/switcher. `chat_scenarios` has zero seed
rows (Step 3 built the table, nothing populated it), so there's no content
yet to justify a scenario picker — building that UI now would be pure scope
creep with nothing to show. The first message a user sends creates the
conversation automatically; there's no separate "New Chat" button. This can
grow into multiple conversations later without a schema change — every
piece of code already threads `conversation_id`, it just always resolves to
the same one for now.

## Chat architecture

New files, mirroring the existing `lib/learning/*` split between read
helpers and `"use server"` mutations:

- **`lib/chat/data.ts`** — `loadActiveConversation(userId)`: read-only,
  RLS-scoped (authenticated client, never the service role). Used by the
  page's Server Component.
- **`lib/chat/actions.ts`** — `"use server"`: `sendMessage(conversationId,
content)` and `retryLastReply(conversationId)`. The only two mutations.
- **`lib/chat/ai.ts`** — the one seam a real AI provider plugs into:
  `generateReply({ history, learnerLevel })`. Currently throws
  `AiNotConfiguredError` — see "AI integration" below.
- **`lib/chat/prompt.ts`** — `buildSystemPrompt(level)`: a small, plain,
  editable system prompt (see "AI response design"). Provider-agnostic.
- **`components/chat/chat-thread.tsx`** — new client component: owns
  sending/pending/error state, renders the message list, empty state,
  typing indicator, and inline error + retry. Reuses the existing
  `ChatMessage`, `ChatInput`, `TypingIndicator` components unchanged.
- **`app/(app)/chat/page.tsx`** — rewritten: loads the user (optional) and
  their conversation, renders the sign-in prompt or `<ChatThread>`. The
  header/badge markup is the same as the old static shell.

## Conversation persistence

- `conversations` (existing Step 3 table, no changes): one row per
  conversation, `user_id` not null, RLS owner-only `for all` policy already
  in place and re-verified by `db:validate`.
- The first `sendMessage(null, text)` call inserts a new `conversations` row
  (`mode: 'normal'`, `status: 'active'` — schema defaults, untouched).
  Every later call passes the real `conversationId`, and it's re-verified
  against `user_id` before any write (see Security).
- `message_count` / `last_message_at` are updated after each insert (no
  trigger exists for this — same manual-rollup pattern
  `lib/learning/actions.ts` already uses for `user_daily_activity` etc.).

## Message persistence

- `conversation_messages` (existing table, no changes): `sender`
  (`user`/`assistant`), `content`, `sequence` (unique per conversation,
  contiguous, computed as `max(sequence) + 1`).
- **The user's message is always saved before the AI is called.** If the AI
  call then fails (today: always, since no provider exists), the user
  message is already committed — nothing is lost, and the UI shows it plus
  an inline retry that re-attempts only the AI turn, never resubmits the
  text.
- History sent to the AI is the last 20 messages, oldest first, `user`/
  `assistant` only (a `system`-sender row, if one ever exists, is filtered
  out — not used today).

## AI integration

**No AI provider is configured.** Inspected the repository first, per the
Step 6 instructions:

- `package.json` — no `openai`, `@anthropic-ai/sdk`, `ai`, or any AI SDK
  dependency.
- `env.ts` — no AI-related variable of any kind.
- No existing AI abstraction, client, or credential anywhere in the tree.

Per your instruction ("If no AI provider exists, STOP and report... I will
provide/configure the AI provider separately"), I did not pick one or add a
dependency. `lib/chat/ai.ts::generateReply()` is the finished seam — clean
signature (`history` + `learnerLevel` in, a `string` reply out), currently
throwing a typed `AiNotConfiguredError` that `lib/chat/actions.ts` catches
and turns into the honest, safe UI message described above.

**To unblock this, I need:**

1. Which provider (OpenAI, Anthropic, or another) and which SDK package to
   add as a dependency.
2. An API key, to be added as a **server-only** environment variable (never
   `NEXT_PUBLIC_*`) — I'll wire it into `env.ts`'s `server` schema and
   document the name (not the value) in `.env.example`, exactly like
   `SUPABASE_SERVICE_ROLE_KEY` is handled today.

Once both are known, `generateReply()` is the only function that needs a
real implementation — nothing else in the app changes.

## AI response design

`lib/chat/prompt.ts::buildSystemPrompt(level)` — a persona ("Lena"), told to:
reply in German at the learner's level, keep replies to ~1-3 sentences, ask
occasional follow-up questions, never turn the conversation into a
worksheet or vocabulary list, and weave in simple corrections naturally
rather than lecturing. Deliberately small and easy to read/edit — not a
prompt framework. `learnerLevel` comes from `learner_profiles.current_level`
(defaults to `A1` if unset), fetched directly — Chat still works with zero
lesson progress, since this only reads the learner's _level setting_, never
their progress.

## Authentication and security

- **No second auth system.** Every read/write goes through the existing
  `getOptionalUser()` / `createClient()` (`lib/supabase/server.ts`) — the
  same authenticated, RLS-scoped client `lib/learning/actions.ts` already
  uses. The service-role client (`lib/supabase/admin.ts`) is not touched
  anywhere in Chat — there is no genuine server-only requirement here that
  the authenticated client can't satisfy.
- **The authenticated user is always derived from the server session**
  (`getOptionalUser()`), never from a client-supplied id. A conversation id
  passed from the client is explicitly re-checked against `user_id` before
  any write — verified by an automated test (`tests/lib/chat-actions.test.ts`:
  "a user cannot send into another user's conversation by passing its id"),
  in addition to RLS itself blocking the same thing at the database layer.
- **Input validation**: trims and rejects empty content, caps length at
  2000 characters, both server-side in `sendMessage` (the only entry point).
- **No secrets in this change.** No API key exists yet to leak; when one is
  added it goes server-only per the plan above. No values were printed
  anywhere in this session.
- **No internal errors reach the client.** `sendMessage`/`retryLastReply`
  only ever return a small set of fixed, safe German strings — never a raw
  Postgres/Supabase/provider error or stack trace.

## Chat independence

Three layers, matching the instruction to test the real data/app layer, not
a UI-only bypass:

1. **Database layer** (pre-existing from Step 3, re-verified by
   `db:validate`, untouched by Step 6): "a brand-new user with 0 lesson
   progress can start a conversation" and "conversations are owner-only" —
   both green.
2. **Server-action layer** (new, `tests/lib/chat-actions.test.ts`): the fake
   Supabase used by these tests only implements `conversations`,
   `conversation_messages`, `learner_profiles` — there is no
   `user_lesson_progress` table in the test double at all, so `sendMessage`
   succeeding against it is itself proof the code path never touches lesson
   progress. Also asserts `lib/chat/actions.ts`'s source contains none of
   `user_lesson_progress`, `getLearnerSnapshot`, `completedLessons`,
   `totalLessons`.
3. **Page/UI layer** (rewritten `tests/components/chat-independence.test.tsx`):
   a signed-in user with zero progress sees the real composer and no
   lock/unlock wording; a signed-out visitor sees no lock tied to Learn
   progress either (their gate is authentication, worded around signing in,
   never lessons); the route's source contains none of the same
   lesson-progress identifiers.

## Demo isolation

Not touched. `app/demo/lesson/` still reads only from
`content/curriculum/demo` and has zero Supabase imports (re-confirmed by
grep). Nothing in Chat's new code references the demo route or vice versa.

## UI integration

Preserves the existing visual shell exactly (header, avatar, "Online" dot,
badge, card chrome) — the only structural change is swapping the old
hardcoded thread for `<ChatThread>`, which reuses `ChatMessage`, `ChatInput`,
and `TypingIndicator` unmodified. States implemented:

- **Loading/sending**: `<TypingIndicator>` while `pending`, input disabled.
- **Error**: inline red alert with the safe message + a "Erneut versuchen"
  retry button, shown only when the last message is still unanswered.
- **Empty**: existing `noConversations` illustration + an inviting prompt to
  just start typing.
- **Signed-out**: illustration + explanation + a link to `/anmelden`.

Not redesigned; not checked against a running browser at 390px/1280px in
this session (no browser tooling available to me) — the dev server is up at
`http://localhost:3000/chat` and on your LAN for a real device, worth a
manual look before calling the UI itself done.

## Tests

- `tests/lib/chat-actions.test.ts` (new, 7 tests): not-signed-in rejection,
  empty-content rejection, conversation creation + user-message persistence
  even when the AI fails, both messages persisted on AI success,
  cross-user ownership rejection, retry no-ops when already answered, retry
  answers an unanswered message without resubmitting it.
- `tests/components/chat-independence.test.tsx` (rewritten, 4 tests): see
  "Chat independence" above.
- All pre-existing tests still pass — **89/89 total**, up from 81 before
  Step 6 (+1 net in the rewritten file, +7 new), zero regressions.

## Known limitations

Explicitly **not** implemented, per the Step 6 scope:

- **The actual AI reply** — blocked on provider choice + credentials (see
  "AI integration"). This is the one real gap in the milestone.
- **Corrections** (`message_corrections`) — schema untouched, no writer.
  `sendMessage`/`retryLastReply` are structured so a correction insert could
  be added alongside the assistant-message insert later without reshaping
  anything.
- **Learning observations** — left untouched, per your instruction, since
  there's no reliable observation detector yet. Next Chat-learning step.
- **Voice / pronunciation / STT / TTS** — not touched.
- **Advanced adaptive learning, Goethe prep, spaced repetition, scenario
  branching, subscription/premium gating** — not touched.
- **Conversation list / multiple conversations / scenario picker** — see
  "Deliberate scope decision" above; the schema supports it, the UI doesn't
  build it yet.
- Manual browser verification (390px/1280px, real sign-in) not done in this
  session — no browser automation available to me here.

## Recommended next step

Two independent things can happen next, in either order:

1. **Wire the AI provider** — once you tell me which one, `lib/chat/ai.ts`
   is the only file that needs a real implementation; everything else
   (persistence, ownership, UI, tests) is already built against that seam.
2. **Manual verification** — sign in on the dev server, send "Hallo! Ich
   heiße Heidi.", confirm the user bubble appears, the "not configured"
   error shows with a working retry button, and refreshing keeps the
   message. This exercises every part of the slice except the actual reply.

After the AI is wired in, the natural Step 7 candidates are: a simple
correction writer (`message_corrections`) on top of the now-real
conversation flow, and turning a chat turn into a `learning_observations`
row once there's a reliable enough signal to record.

## Change Log

**New:**
`lib/chat/data.ts`, `lib/chat/actions.ts`, `lib/chat/ai.ts`,
`lib/chat/prompt.ts`, `components/chat/chat-thread.tsx`,
`tests/lib/chat-actions.test.ts`, `docs/STEP-6-CHECKPOINT.md`.

**Modified:**
`app/(app)/chat/page.tsx` (static shell → real data),
`tests/components/chat-independence.test.tsx` (rewritten for the real
architecture — the old version asserted the route never imported
`getOptionalUser`, which is no longer true now that sign-in genuinely gates
persistence; the underlying principle it protects, no lesson-progress gate,
is unchanged and still tested).

**Database:** no migrations, no schema changes. `conversations` and
`conversation_messages` used exactly as they already existed.
`chat_scenarios` and `message_corrections` remain unused;
`learning_observations` remains untouched.

### Step 6 Sign-off

The repository is ready for **manual testing of the persistence slice**
(sign in, send a message, confirm it saves and survives a refresh, confirm
the "not configured" error and retry work correctly) — that part is done
and validated. It is **not** ready to produce a real AI reply until a
provider is chosen and credentials are supplied; that is the one explicit,
expected gap, not an oversight.
