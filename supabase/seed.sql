-- DeutschChat — Phase 1 / Step 3
-- supabase/seed.sql
--
-- DEVELOPMENT / TEST DATA ONLY. This is NOT the A1 curriculum (that arrives in
-- Step 4). It exists so a freshly-migrated database has a few readable content
-- rows to sanity-check RLS and the client wiring against. Safe to run more than
-- once (all inserts are idempotent). Never seeds user/progress data.
--
-- Applied automatically by `supabase db reset`. Not pushed by `supabase db push`.

-- Reference rows for levels + skills are created by the migrations themselves.

insert into public.vocabulary
  (lemma, display_form, translation, part_of_speech, article, ipa,
   example_sentence, example_translation, cefr_level)
values
  ('hallo', 'hallo', 'hello', 'interjection', null, '/ˈhalo/',
   'Hallo! Wie geht es dir?', 'Hello! How are you?', 'A1'),
  ('heute', 'heute', 'today', 'adverb', null, '/ˈhɔʏ̯tə/',
   'Heute lerne ich Deutsch.', 'Today I am learning German.', 'A1'),
  ('Familie', 'die Familie', 'family', 'noun', 'die', '/faˈmiːli̯ə/',
   'Meine Familie wohnt in Hamburg.', 'My family lives in Hamburg.', 'A1')
on conflict (lemma, part_of_speech, coalesce(article, '')) do nothing;

insert into public.grammar_points (slug, title, summary, cefr_level, category)
values
  ('present-tense-regular-verbs',
   'Präsens: regelmäßige Verben',
   'Regular verbs in the present tense take the endings -e, -st, -t, -en, -t, -en.',
   'A1', 'verbs')
on conflict (slug) do nothing;

insert into public.chat_scenarios
  (slug, title, description, cefr_level, persona_name, persona_description,
   setting, goals, sort_order, is_published)
values
  ('sich-vorstellen',
   'Sich vorstellen',
   'Introduce yourself: name, where you are from, and the languages you speak.',
   'A1',
   'Lena',
   'A friendly language-exchange partner who speaks slowly and encouragingly.',
   'im Sprachcafé',
   '["Say your name", "Say where you are from", "Ask the other person a question"]'::jsonb,
   1,
   true)
on conflict (slug) do nothing;
