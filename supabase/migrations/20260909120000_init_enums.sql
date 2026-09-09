-- DeutschChat — Phase 1 / Step 3
-- 20260909120000_init_enums.sql
-- Enums (controlled vocabularies) and the shared updated_at trigger helper.
-- No tables are created here.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.cefr_level as enum ('A1', 'A2', 'B1', 'B2', 'C1');

create type public.skill_key as enum (
  'reading', 'listening', 'writing', 'speaking', 'vocabulary', 'grammar'
);

create type public.lesson_type as enum (
  'vocabulary', 'grammar', 'reading', 'listening',
  'writing', 'speaking', 'conversation', 'review'
);

create type public.lesson_item_type as enum (
  'presentation', 'flashcard', 'multiple_choice', 'fill_blank',
  'listening', 'speaking', 'writing_prompt', 'matching', 'info'
);

create type public.part_of_speech as enum (
  'noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition',
  'conjunction', 'article', 'numeral', 'interjection', 'phrase', 'other'
);

create type public.vocab_status as enum ('new', 'learning', 'known', 'needs_review');
create type public.grammar_status as enum ('new', 'learning', 'weak', 'mastered');
create type public.progress_status as enum ('not_started', 'in_progress', 'completed');

create type public.conversation_mode as enum ('guided', 'normal', 'challenge');
create type public.conversation_status as enum ('active', 'completed', 'abandoned');
create type public.message_sender as enum ('user', 'assistant', 'system');
create type public.correction_kind as enum (
  'minor', 'grammar', 'vocabulary', 'pronunciation', 'spelling'
);

create type public.observation_source as enum ('lesson', 'conversation', 'review', 'exam');
create type public.observation_result as enum ('correct', 'incorrect', 'partial', 'exposure');

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at fresh on UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'BEFORE UPDATE row trigger: sets NEW.updated_at = now().';
