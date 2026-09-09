-- DeutschChat — Phase 1 / Step 3
-- 20260909120200_learner.sql
-- Per-user identity, preferences and learning progress.
--
-- RLS model for this file: every table is private to its owner. Policies use
-- `for all` with `using` + `with check` both asserting ownership, so a user can
-- only ever read or write their own rows. There is intentionally no policy that
-- exposes another user's data.

-- ===========================================================================
-- profiles  (public-facing account info; identity stays in auth.users)
-- ===========================================================================
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text check (
    display_name is null or length(btrim(display_name)) between 1 and 80
  ),
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
comment on table public.profiles is
  'Public-facing account info. Auth credentials never leave auth.users.';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- learner_profiles  (learning configuration, kept separate from `profiles`)
-- ===========================================================================
create table public.learner_profiles (
  id                   uuid primary key references auth.users (id) on delete cascade,
  current_level        public.cefr_level not null default 'A1',
  target_level         public.cefr_level,
  native_language      text not null default 'en',
  ui_locale            text not null default 'en',
  timezone             text,
  learning_preferences jsonb not null default '{}'::jsonb,
  onboarded_at         timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
comment on table public.learner_profiles is
  'Learner-specific configuration (level, locale, preferences).';

create trigger learner_profiles_set_updated_at
  before update on public.learner_profiles
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- new-user bootstrap: create profile + learner_profile rows on signup
-- ===========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(
      btrim(coalesce(
        new.raw_user_meta_data ->> 'display_name',
        new.raw_user_meta_data ->> 'full_name',
        ''
      )),
      ''
    )
  )
  on conflict (id) do nothing;

  insert into public.learner_profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;
comment on function public.handle_new_user() is
  'AFTER INSERT on auth.users: seeds public.profiles and public.learner_profiles.';

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- user_lesson_progress
-- ===========================================================================
create table public.user_lesson_progress (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references auth.users (id) on delete cascade,
  lesson_id            uuid not null references public.lessons (id) on delete cascade,
  status               public.progress_status not null default 'not_started',
  completed_item_count smallint not null default 0 check (completed_item_count >= 0),
  total_item_count     smallint not null default 0 check (total_item_count >= 0),
  score                numeric(5, 2) check (score is null or score between 0 and 100),
  started_at           timestamptz,
  completed_at         timestamptz,
  last_activity_at     timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint user_lesson_progress_user_lesson_key unique (user_id, lesson_id)
);
create index user_lesson_progress_user_status_idx
  on public.user_lesson_progress (user_id, status);

create trigger user_lesson_progress_set_updated_at
  before update on public.user_lesson_progress
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- user_vocabulary_progress  (New / Learning / Known / Needs review)
-- ===========================================================================
create table public.user_vocabulary_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  vocabulary_id    uuid not null references public.vocabulary (id) on delete cascade,
  status           public.vocab_status not null default 'new',
  strength         smallint not null default 0 check (strength between 0 and 100),
  times_seen       integer not null default 0 check (times_seen >= 0),
  times_correct    integer not null default 0 check (times_correct >= 0),
  first_learned_at timestamptz,
  last_reviewed_at timestamptz,
  due_at           timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint user_vocabulary_progress_user_vocab_key unique (user_id, vocabulary_id)
);
create index user_vocabulary_progress_user_status_idx
  on public.user_vocabulary_progress (user_id, status);
create index user_vocabulary_progress_due_idx
  on public.user_vocabulary_progress (user_id, due_at) where due_at is not null;

create trigger user_vocabulary_progress_set_updated_at
  before update on public.user_vocabulary_progress
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- user_grammar_progress  (New / Learning / Weak / Mastered)
-- ===========================================================================
create table public.user_grammar_progress (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  grammar_point_id  uuid not null references public.grammar_points (id) on delete cascade,
  status            public.grammar_status not null default 'new',
  strength          smallint not null default 0 check (strength between 0 and 100),
  success_count     integer not null default 0 check (success_count >= 0),
  error_count       integer not null default 0 check (error_count >= 0),
  last_practiced_at timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint user_grammar_progress_user_point_key unique (user_id, grammar_point_id)
);
create index user_grammar_progress_user_status_idx
  on public.user_grammar_progress (user_id, status);

create trigger user_grammar_progress_set_updated_at
  before update on public.user_grammar_progress
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- user_skill_progress  (per skill, per level)
-- ===========================================================================
create table public.user_skill_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  skill_key        public.skill_key not null,
  level_code       public.cefr_level not null,
  score            smallint not null default 0 check (score between 0 and 100),
  activity_count   integer not null default 0 check (activity_count >= 0),
  last_activity_at timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint user_skill_progress_user_skill_level_key unique (user_id, skill_key, level_code)
);
create index user_skill_progress_user_idx on public.user_skill_progress (user_id);

create trigger user_skill_progress_set_updated_at
  before update on public.user_skill_progress
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- user_daily_activity  (one row per user per day; source for streaks/dashboard)
-- ===========================================================================
create table public.user_daily_activity (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  activity_date     date not null,
  lessons_completed smallint not null default 0 check (lessons_completed >= 0),
  items_practiced   smallint not null default 0 check (items_practiced >= 0),
  minutes_spent     smallint not null default 0 check (minutes_spent >= 0),
  vocab_reviewed    smallint not null default 0 check (vocab_reviewed >= 0),
  messages_sent     smallint not null default 0 check (messages_sent >= 0),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint user_daily_activity_user_date_key unique (user_id, activity_date)
);
create index user_daily_activity_user_date_idx
  on public.user_daily_activity (user_id, activity_date desc);

create trigger user_daily_activity_set_updated_at
  before update on public.user_daily_activity
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- learning_observations
-- The bridge between LEARN and CHAT: one row per atomic learning signal,
-- whatever produced it. Nullable FKs point back to the source. A later step
-- adds the `message_id` foreign key (once conversation_messages exists).
-- ===========================================================================
create table public.learning_observations (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  source           public.observation_source not null,
  result           public.observation_result not null,
  skill_key        public.skill_key,
  lesson_item_id   uuid references public.lesson_items (id) on delete set null,
  message_id       uuid,
  vocabulary_id    uuid references public.vocabulary (id) on delete set null,
  grammar_point_id uuid references public.grammar_points (id) on delete set null,
  detail           jsonb not null default '{}'::jsonb,
  observed_at      timestamptz not null default now(),
  created_at       timestamptz not null default now(),
  constraint learning_observations_has_subject check (
    lesson_item_id is not null
    or message_id is not null
    or vocabulary_id is not null
    or grammar_point_id is not null
  )
);
create index learning_observations_user_time_idx
  on public.learning_observations (user_id, observed_at desc);
create index learning_observations_vocab_idx
  on public.learning_observations (vocabulary_id) where vocabulary_id is not null;
create index learning_observations_grammar_idx
  on public.learning_observations (grammar_point_id) where grammar_point_id is not null;

-- ===========================================================================
-- Row Level Security — owner-only
-- ===========================================================================
alter table public.profiles                 enable row level security;
alter table public.learner_profiles         enable row level security;
alter table public.user_lesson_progress     enable row level security;
alter table public.user_vocabulary_progress enable row level security;
alter table public.user_grammar_progress    enable row level security;
alter table public.user_skill_progress      enable row level security;
alter table public.user_daily_activity      enable row level security;
alter table public.learning_observations    enable row level security;

grant select, insert, update, delete on
  public.profiles, public.learner_profiles, public.user_lesson_progress,
  public.user_vocabulary_progress, public.user_grammar_progress,
  public.user_skill_progress, public.user_daily_activity,
  public.learning_observations
to authenticated;

create policy "own profile" on public.profiles
  for all to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "own learner profile" on public.learner_profiles
  for all to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "own lesson progress" on public.user_lesson_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own vocabulary progress" on public.user_vocabulary_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own grammar progress" on public.user_grammar_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own skill progress" on public.user_skill_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own daily activity" on public.user_daily_activity
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own learning observations" on public.learning_observations
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
