-- DeutschChat — Phase 1 / Step 3
-- 20260909120100_curriculum.sql
-- Shared curriculum content: CEFR levels, skills, the Level → Unit → Lesson →
-- Lesson item hierarchy, vocabulary and grammar.
--
-- RLS model for this file: every table is world-readable (published rows only
-- where a publish flag exists). No INSERT/UPDATE/DELETE policies are granted to
-- anon/authenticated — curriculum is authored through migrations and the
-- service role. Premium gating lives on `levels.is_free` for now; a later
-- migration adds subscription-aware policies.

-- ===========================================================================
-- levels
-- ===========================================================================
create table public.levels (
  code        public.cefr_level primary key,
  name        text not null,
  description text,
  is_free     boolean not null default false,
  sort_order  smallint not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint levels_sort_order_key unique (sort_order),
  constraint levels_name_not_blank check (length(btrim(name)) > 0)
);
comment on table public.levels is
  'CEFR levels A1–C1 with display metadata and free/premium status.';

create trigger levels_set_updated_at
  before update on public.levels
  for each row execute function public.set_updated_at();

insert into public.levels (code, name, description, is_free, sort_order) values
  ('A1', 'Anfänger',                     'Erste Schritte auf Deutsch.',        true,  1),
  ('A2', 'Grundstufe',                   'Alltag und einfache Zusammenhänge.', false, 2),
  ('B1', 'Mittelstufe',                  'Selbstständige Sprachverwendung.',   false, 3),
  ('B2', 'Fortgeschrittene',             'Komplexere Themen und Meinungen.',   false, 4),
  ('C1', 'Fachkundige Sprachkenntnisse', 'Flüssig und differenziert.',         false, 5)
on conflict (code) do nothing;

-- ===========================================================================
-- skills
-- ===========================================================================
create table public.skills (
  key        public.skill_key primary key,
  name       text not null,
  sort_order smallint not null,
  constraint skills_sort_order_key unique (sort_order)
);
comment on table public.skills is 'The skill areas that progress is tracked against.';

insert into public.skills (key, name, sort_order) values
  ('vocabulary', 'Wortschatz', 1),
  ('grammar',    'Grammatik',  2),
  ('reading',    'Lesen',      3),
  ('listening',  'Hören',      4),
  ('writing',    'Schreiben',  5),
  ('speaking',   'Sprechen',   6)
on conflict (key) do nothing;

-- ===========================================================================
-- units
-- ===========================================================================
create table public.units (
  id           uuid primary key default gen_random_uuid(),
  level_code   public.cefr_level not null references public.levels (code) on delete restrict,
  slug         text not null,
  title        text not null,
  description  text,
  sort_order   smallint not null,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint units_level_slug_key unique (level_code, slug),
  constraint units_level_order_key unique (level_code, sort_order),
  constraint units_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint units_title_not_blank check (length(btrim(title)) > 0)
);
create index units_level_published_idx on public.units (level_code, is_published, sort_order);

create trigger units_set_updated_at
  before update on public.units
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- lessons
-- ===========================================================================
create table public.lessons (
  id                uuid primary key default gen_random_uuid(),
  unit_id           uuid not null references public.units (id) on delete cascade,
  slug              text not null,
  title             text not null,
  description       text,
  lesson_type       public.lesson_type not null default 'vocabulary',
  sort_order        smallint not null,
  estimated_minutes smallint check (estimated_minutes is null or estimated_minutes > 0),
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint lessons_unit_slug_key unique (unit_id, slug),
  constraint lessons_unit_order_key unique (unit_id, sort_order),
  constraint lessons_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint lessons_title_not_blank check (length(btrim(title)) > 0)
);
create index lessons_unit_idx on public.lessons (unit_id, sort_order);

create trigger lessons_set_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- vocabulary
-- ===========================================================================
create table public.vocabulary (
  id                  uuid primary key default gen_random_uuid(),
  lemma               text not null,
  display_form        text not null,
  translation         text not null,
  part_of_speech      public.part_of_speech not null,
  article             text check (article is null or article in ('der', 'die', 'das')),
  plural_form         text,
  ipa                 text,
  example_sentence    text,
  example_translation text,
  cefr_level          public.cefr_level not null,
  audio_path          text,
  notes               text,
  metadata            jsonb not null default '{}'::jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint vocabulary_lemma_not_blank check (length(btrim(lemma)) > 0),
  constraint vocabulary_translation_not_blank check (length(btrim(translation)) > 0)
);
-- der See / die See: same lemma + part of speech, different gender.
create unique index vocabulary_lemma_pos_article_key
  on public.vocabulary (lemma, part_of_speech, coalesce(article, ''));
create index vocabulary_level_idx on public.vocabulary (cefr_level);
create index vocabulary_pos_idx on public.vocabulary (part_of_speech);

create trigger vocabulary_set_updated_at
  before update on public.vocabulary
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- grammar_points
-- ===========================================================================
create table public.grammar_points (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  summary     text,
  explanation text,
  cefr_level  public.cefr_level not null,
  category    text,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint grammar_points_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint grammar_points_title_not_blank check (length(btrim(title)) > 0)
);
create index grammar_points_level_idx on public.grammar_points (cefr_level);
create index grammar_points_category_idx on public.grammar_points (category);

create trigger grammar_points_set_updated_at
  before update on public.grammar_points
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- grammar_examples
-- ===========================================================================
create table public.grammar_examples (
  id               uuid primary key default gen_random_uuid(),
  grammar_point_id uuid not null references public.grammar_points (id) on delete cascade,
  german           text not null,
  translation      text,
  sort_order       smallint not null default 0,
  created_at       timestamptz not null default now(),
  constraint grammar_examples_german_not_blank check (length(btrim(german)) > 0)
);
create index grammar_examples_point_idx on public.grammar_examples (grammar_point_id, sort_order);

-- ===========================================================================
-- lesson_items  (activities within a lesson; payload is item-type specific)
-- ===========================================================================
create table public.lesson_items (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid not null references public.lessons (id) on delete cascade,
  sort_order smallint not null,
  item_type  public.lesson_item_type not null,
  prompt     text,
  content    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lesson_items_lesson_order_key unique (lesson_id, sort_order)
);
create index lesson_items_lesson_idx on public.lesson_items (lesson_id, sort_order);

create trigger lesson_items_set_updated_at
  before update on public.lesson_items
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- lesson_item_vocabulary / lesson_item_grammar  (explicit join tables)
-- ===========================================================================
create table public.lesson_item_vocabulary (
  lesson_item_id uuid not null references public.lesson_items (id) on delete cascade,
  vocabulary_id  uuid not null references public.vocabulary (id) on delete cascade,
  role           text not null default 'target' check (role in ('target', 'support')),
  primary key (lesson_item_id, vocabulary_id)
);
create index lesson_item_vocabulary_vocab_idx on public.lesson_item_vocabulary (vocabulary_id);

create table public.lesson_item_grammar (
  lesson_item_id   uuid not null references public.lesson_items (id) on delete cascade,
  grammar_point_id uuid not null references public.grammar_points (id) on delete cascade,
  primary key (lesson_item_id, grammar_point_id)
);
create index lesson_item_grammar_point_idx on public.lesson_item_grammar (grammar_point_id);

-- ===========================================================================
-- Row Level Security — read-only public content
-- ===========================================================================
alter table public.levels                 enable row level security;
alter table public.skills                 enable row level security;
alter table public.units                  enable row level security;
alter table public.lessons                enable row level security;
alter table public.vocabulary             enable row level security;
alter table public.grammar_points         enable row level security;
alter table public.grammar_examples       enable row level security;
alter table public.lesson_items           enable row level security;
alter table public.lesson_item_vocabulary enable row level security;
alter table public.lesson_item_grammar    enable row level security;

grant select on
  public.levels, public.skills, public.units, public.lessons,
  public.vocabulary, public.grammar_points, public.grammar_examples,
  public.lesson_items, public.lesson_item_vocabulary, public.lesson_item_grammar
to anon, authenticated;

-- Pure reference data: always readable.
create policy "levels are readable by everyone"
  on public.levels for select to anon, authenticated using (true);
create policy "skills are readable by everyone"
  on public.skills for select to anon, authenticated using (true);
create policy "vocabulary is readable by everyone"
  on public.vocabulary for select to anon, authenticated using (true);
create policy "grammar points are readable by everyone"
  on public.grammar_points for select to anon, authenticated using (true);
create policy "grammar examples are readable by everyone"
  on public.grammar_examples for select to anon, authenticated using (true);

-- Course hierarchy: only published rows are visible to clients.
create policy "published units are readable"
  on public.units for select to anon, authenticated
  using (is_published);

create policy "lessons of published units are readable"
  on public.lessons for select to anon, authenticated
  using (
    is_published
    and exists (
      select 1 from public.units u
      where u.id = public.lessons.unit_id and u.is_published
    )
  );

create policy "items of published lessons are readable"
  on public.lesson_items for select to anon, authenticated
  using (exists (
    select 1
    from public.lessons l
    join public.units u on u.id = l.unit_id
    where l.id = public.lesson_items.lesson_id
      and l.is_published
      and u.is_published
  ));

create policy "vocabulary links of published items are readable"
  on public.lesson_item_vocabulary for select to anon, authenticated
  using (exists (
    select 1
    from public.lesson_items i
    join public.lessons l on l.id = i.lesson_id
    join public.units u on u.id = l.unit_id
    where i.id = public.lesson_item_vocabulary.lesson_item_id
      and l.is_published
      and u.is_published
  ));

create policy "grammar links of published items are readable"
  on public.lesson_item_grammar for select to anon, authenticated
  using (exists (
    select 1
    from public.lesson_items i
    join public.lessons l on l.id = i.lesson_id
    join public.units u on u.id = l.unit_id
    where i.id = public.lesson_item_grammar.lesson_item_id
      and l.is_published
      and u.is_published
  ));
