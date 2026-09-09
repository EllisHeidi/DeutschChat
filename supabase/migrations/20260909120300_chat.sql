-- DeutschChat — Phase 1 / Step 3
-- 20260909120300_chat.sql
-- Conversation scaffolding for the future AI CHAT experience.
-- No AI, no realtime, no voice — data model only.
--
-- RLS model: `chat_scenarios` is published-read public content. Conversations,
-- messages and corrections are private to their owner. `conversation_messages`
-- and `message_corrections` carry a denormalised `user_id` so ownership checks
-- stay a single-column comparison.

-- ===========================================================================
-- chat_scenarios  (shared content)
-- ===========================================================================
create table public.chat_scenarios (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  description         text,
  cefr_level          public.cefr_level not null,
  persona_name        text not null,
  persona_description text,
  setting             text,
  goals               jsonb not null default '[]'::jsonb,
  sort_order          smallint,
  is_published        boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint chat_scenarios_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint chat_scenarios_title_not_blank check (length(btrim(title)) > 0)
);
comment on table public.chat_scenarios is
  'Predefined conversation scenarios (scenario, persona, goals).';
create index chat_scenarios_level_idx
  on public.chat_scenarios (cefr_level, is_published, sort_order);

create trigger chat_scenarios_set_updated_at
  before update on public.chat_scenarios
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- conversations  (one per session; owned)
-- ===========================================================================
create table public.conversations (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  scenario_id     uuid references public.chat_scenarios (id) on delete set null,
  mode            public.conversation_mode not null default 'normal',
  status          public.conversation_status not null default 'active',
  title           text,
  message_count   integer not null default 0 check (message_count >= 0),
  started_at      timestamptz not null default now(),
  last_message_at timestamptz,
  ended_at        timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index conversations_user_status_idx
  on public.conversations (user_id, status, last_message_at desc);

create trigger conversations_set_updated_at
  before update on public.conversations
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- conversation_messages  (owned; immutable — no updated_at)
-- ===========================================================================
create table public.conversation_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id         uuid not null references auth.users (id) on delete cascade,
  sender          public.message_sender not null,
  content         text not null,
  sequence        integer not null check (sequence > 0),
  audio_path      text,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  constraint conversation_messages_seq_key unique (conversation_id, sequence)
);
create index conversation_messages_conversation_idx
  on public.conversation_messages (conversation_id, sequence);

-- ===========================================================================
-- message_corrections  (owned; the "Fast richtig!" artefact + learning links)
-- ===========================================================================
create table public.message_corrections (
  id                      uuid primary key default gen_random_uuid(),
  message_id              uuid not null references public.conversation_messages (id) on delete cascade,
  user_id                 uuid not null references auth.users (id) on delete cascade,
  correction_kind         public.correction_kind not null default 'minor',
  original_text           text not null,
  corrected_text          text not null,
  explanation             text,
  grammar_point_id        uuid references public.grammar_points (id) on delete set null,
  vocabulary_id           uuid references public.vocabulary (id) on delete set null,
  learning_observation_id uuid references public.learning_observations (id) on delete set null,
  created_at              timestamptz not null default now()
);
create index message_corrections_user_time_idx
  on public.message_corrections (user_id, created_at desc);
create index message_corrections_message_idx
  on public.message_corrections (message_id);

-- ===========================================================================
-- Complete the learning_observations <-> conversation_messages link
-- ===========================================================================
alter table public.learning_observations
  add constraint learning_observations_message_id_fkey
  foreign key (message_id)
  references public.conversation_messages (id) on delete set null;

create index learning_observations_message_idx
  on public.learning_observations (message_id) where message_id is not null;

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.chat_scenarios        enable row level security;
alter table public.conversations         enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.message_corrections   enable row level security;

grant select on public.chat_scenarios to anon, authenticated;
grant select, insert, update, delete on
  public.conversations, public.conversation_messages, public.message_corrections
to authenticated;

create policy "published scenarios are readable"
  on public.chat_scenarios for select to anon, authenticated
  using (is_published);

create policy "own conversations" on public.conversations
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own messages" on public.conversation_messages
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.conversations c
      where c.id = public.conversation_messages.conversation_id
        and c.user_id = (select auth.uid())
    )
  );

create policy "own corrections" on public.message_corrections
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
