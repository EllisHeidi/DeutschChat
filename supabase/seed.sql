-- DeutschChat — GENERATED FILE. Do not edit by hand.
-- Source: content/curriculum/*  ·  Regenerate: npm run db:seed
--
-- Idempotent (on conflict do nothing). Applied by `supabase db reset` and
-- the pglite validator; run once manually against the hosted project.
-- Levels + skills are seeded by the migrations themselves.

-- ===== vocabulary =====
insert into public.vocabulary
  (lemma, display_form, translation, part_of_speech, article, plural_form, ipa, example_sentence, example_translation, cefr_level)
values
  ('hallo', 'hallo', 'hello / hi', 'interjection', null, null, '/ˈhalo/', 'Hallo! Wie geht es dir?', 'Hi! How are you?', 'A1'),
  ('guten Morgen', 'guten Morgen', 'good morning', 'phrase', null, null, '/ˌɡuːtn̩ ˈmɔʁɡn̩/', 'Guten Morgen! Gut geschlafen?', 'Good morning! Did you sleep well?', 'A1'),
  ('guten Abend', 'guten Abend', 'good evening', 'phrase', null, null, '/ˌɡuːtn̩ ˈaːbn̩t/', 'Guten Abend! Schön, Sie zu sehen.', 'Good evening! Nice to see you.', 'A1'),
  ('tschüss', 'tschüss', 'bye', 'interjection', null, null, '/tʃʏs/', 'Tschüss, bis morgen!', 'Bye, see you tomorrow!', 'A1'),
  ('auf Wiedersehen', 'auf Wiedersehen', 'goodbye', 'phrase', null, null, '/aʊ̯f ˈviːdɐˌzeːən/', 'Auf Wiedersehen und einen schönen Tag!', 'Goodbye and have a nice day!', 'A1'),
  ('danke', 'danke', 'thanks', 'interjection', null, null, '/ˈdaŋkə/', 'Danke für deine Hilfe.', 'Thanks for your help.', 'A1'),
  ('bitte', 'bitte', 'please / you''re welcome', 'interjection', null, null, '/ˈbɪtə/', 'Einen Kaffee, bitte.', 'A coffee, please.', 'A1'),
  ('ja', 'ja', 'yes', 'other', null, null, '/jaː/', 'Ja, das stimmt.', 'Yes, that''s right.', 'A1'),
  ('nein', 'nein', 'no', 'other', null, null, '/naɪ̯n/', 'Nein, danke.', 'No, thanks.', 'A1'),
  ('ich', 'ich', 'I', 'pronoun', null, null, '/ɪç/', 'Ich heiße Heidi.', 'My name is Heidi.', 'A1'),
  ('du', 'du', 'you (informal)', 'pronoun', null, null, '/duː/', 'Woher kommst du?', 'Where are you from?', 'A1'),
  ('Sie', 'Sie', 'you (formal)', 'pronoun', null, null, '/ziː/', 'Wie heißen Sie?', 'What is your name?', 'A1'),
  ('heißen', 'heißen', 'to be called', 'verb', null, null, '/ˈhaɪ̯sn̩/', 'Ich heiße Anna. Und du?', 'My name is Anna. And you?', 'A1'),
  ('sein', 'sein', 'to be', 'verb', null, null, '/zaɪ̯n/', 'Ich bin müde.', 'I''m tired.', 'A1'),
  ('kommen', 'kommen', 'to come', 'verb', null, null, '/ˈkɔmən/', 'Ich komme aus Österreich.', 'I come from Austria.', 'A1'),
  ('wohnen', 'wohnen', 'to live (reside)', 'verb', null, null, '/ˈvoːnən/', 'Wir wohnen in Berlin.', 'We live in Berlin.', 'A1'),
  ('sprechen', 'sprechen', 'to speak', 'verb', null, null, '/ˈʃpʁɛçn̩/', 'Ich spreche ein bisschen Deutsch.', 'I speak a little German.', 'A1'),
  ('gehen', 'gehen', 'to go', 'verb', null, null, '/ˈɡeːən/', 'Wie geht es dir?', 'How are you?', 'A1'),
  ('wie', 'wie', 'how', 'adverb', null, null, '/viː/', 'Wie heißt du?', 'What''s your name?', 'A1'),
  ('woher', 'woher', 'where from', 'adverb', null, null, '/voˈheːɐ̯/', 'Woher kommst du?', 'Where are you from?', 'A1'),
  ('wo', 'wo', 'where', 'adverb', null, null, '/voː/', 'Wo wohnst du?', 'Where do you live?', 'A1'),
  ('wer', 'wer', 'who', 'pronoun', null, null, '/veːɐ̯/', 'Wer ist das?', 'Who is that?', 'A1'),
  ('aus', 'aus', 'from / out of', 'preposition', null, null, '/aʊ̯s/', 'Sie kommt aus der Schweiz.', 'She comes from Switzerland.', 'A1'),
  ('gut', 'gut', 'good / well', 'adjective', null, null, '/ɡuːt/', 'Mir geht es gut, danke.', 'I''m well, thanks.', 'A1'),
  ('alt', 'alt', 'old', 'adjective', null, null, '/alt/', 'Wie alt bist du?', 'How old are you?', 'A1'),
  ('der Name', 'der Name', 'the name', 'noun', 'der', 'die Namen', '/ˈnaːmə/', 'Mein Name ist Heidi.', 'My name is Heidi.', 'A1'),
  ('das Jahr', 'das Jahr', 'the year', 'noun', 'das', 'die Jahre', '/jaːɐ̯/', 'Ich bin dreißig Jahre alt.', 'I''m thirty years old.', 'A1'),
  ('die Sprache', 'die Sprache', 'the language', 'noun', 'die', 'die Sprachen', '/ˈʃpʁaːxə/', 'Deutsch ist eine schöne Sprache.', 'German is a beautiful language.', 'A1'),
  ('Deutsch', 'Deutsch', 'German (language)', 'noun', null, null, '/dɔʏ̯tʃ/', 'Ich lerne Deutsch.', 'I''m learning German.', 'A1'),
  ('Englisch', 'Englisch', 'English (language)', 'noun', null, null, '/ˈɛŋlɪʃ/', 'Sprichst du Englisch?', 'Do you speak English?', 'A1'),
  ('eins', 'eins', 'one', 'numeral', null, null, '/aɪ̯ns/', 'Ich habe nur eins.', 'I only have one.', 'A1'),
  ('zwei', 'zwei', 'two', 'numeral', null, null, '/t͡svaɪ̯/', 'Ich spreche zwei Sprachen.', 'I speak two languages.', 'A1'),
  ('drei', 'drei', 'three', 'numeral', null, null, '/dʁaɪ̯/', 'Wir sind drei Personen.', 'We are three people.', 'A1'),
  ('zehn', 'zehn', 'ten', 'numeral', null, null, '/t͡seːn/', 'Bis zehn zählen ist leicht.', 'Counting to ten is easy.', 'A1')
on conflict (lemma, part_of_speech, coalesce(article, '')) do nothing;

-- ===== grammar =====
insert into public.grammar_points (slug, title, summary, explanation, cefr_level, category)
values ('personalpronomen', 'Personalpronomen (Nominativ)', 'The words for who is doing something: ich, du, er/sie/es, wir, ihr, sie/Sie.', '**ich** = I, **du** = you (a friend), **Sie** = you (polite / a stranger). The verb ending changes with the pronoun, so these two always go together.', 'A1', 'pronouns')
on conflict (slug) do nothing;

insert into public.grammar_points (slug, title, summary, explanation, cefr_level, category)
values ('verb-sein', 'Das Verb „sein“', '„sein“ (to be) is irregular — learn it as a set.', '**ich bin**, **du bist**, **er/sie/es ist**, **wir sind**, **ihr seid**, **sie/Sie sind**. Use it for names, feelings, jobs and age: *Ich bin Heidi.* · *Ich bin müde.* · *Ich bin 30 Jahre alt.*', 'A1', 'verbs')
on conflict (slug) do nothing;

insert into public.grammar_points (slug, title, summary, explanation, cefr_level, category)
values ('regelmaessige-verben-praesens', 'Regelmäßige Verben im Präsens', 'Most verbs follow one pattern in the present tense.', 'Take the stem and add: **ich -e**, **du -st**, **er/sie/es -t**, **wir -en**, **ihr -t**, **sie/Sie -en**. *wohnen* → ich wohn**e**, du wohn**st**, er wohn**t**. Same for *kommen*, *heißen*, *sprechen*.', 'A1', 'verbs')
on conflict (slug) do nothing;

insert into public.grammar_points (slug, title, summary, explanation, cefr_level, category)
values ('w-fragen', 'W-Fragen', 'Questions that start with a W-word. The verb comes second.', '**Wie** heißt du? · **Woher** kommst du? · **Wo** wohnst du? · **Wer** ist das? Pattern: *W-Wort + Verb + Rest*.', 'A1', 'word-order')
on conflict (slug) do nothing;

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'ich bin', 'I am', 0
from public.grammar_points gp
where gp.slug = 'personalpronomen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'ich bin'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'du bist', 'you are', 1
from public.grammar_points gp
where gp.slug = 'personalpronomen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'du bist'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Sie sind', 'you are (formal)', 2
from public.grammar_points gp
where gp.slug = 'personalpronomen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Sie sind'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Ich bin Anna.', 'I''m Anna.', 0
from public.grammar_points gp
where gp.slug = 'verb-sein'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Ich bin Anna.'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Bist du müde?', 'Are you tired?', 1
from public.grammar_points gp
where gp.slug = 'verb-sein'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Bist du müde?'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Sie ist aus Wien.', 'She''s from Vienna.', 2
from public.grammar_points gp
where gp.slug = 'verb-sein'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Sie ist aus Wien.'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Ich komme aus Südafrika.', 'I come from South Africa.', 0
from public.grammar_points gp
where gp.slug = 'regelmaessige-verben-praesens'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Ich komme aus Südafrika.'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Du wohnst in Hamburg.', 'You live in Hamburg.', 1
from public.grammar_points gp
where gp.slug = 'regelmaessige-verben-praesens'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Du wohnst in Hamburg.'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Er heißt Tom.', 'His name is Tom.', 2
from public.grammar_points gp
where gp.slug = 'regelmaessige-verben-praesens'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Er heißt Tom.'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Wie heißt du?', 'What''s your name?', 0
from public.grammar_points gp
where gp.slug = 'w-fragen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Wie heißt du?'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Woher kommst du?', 'Where are you from?', 1
from public.grammar_points gp
where gp.slug = 'w-fragen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Woher kommst du?'
  );

insert into public.grammar_examples (grammar_point_id, german, translation, sort_order)
select gp.id, 'Wo wohnst du?', 'Where do you live?', 2
from public.grammar_points gp
where gp.slug = 'w-fragen'
  and not exists (
    select 1 from public.grammar_examples e
    where e.grammar_point_id = gp.id and e.german = 'Wo wohnst du?'
  );

-- ===== unit: A1 / erste-schritte =====
insert into public.units (level_code, slug, title, description, sort_order, is_published)
values ('A1', 'erste-schritte', 'Erste Schritte', 'Begrüßen, sich vorstellen, Zahlen und Herkunft.', 1, true)
on conflict (level_code, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'begruessungen', 'Begrüßungen', 'Begrüßen und nach dem Befinden fragen.', 'vocabulary', 1, 6, true
from public.units u where u.level_code = 'A1' and u.slug = 'erste-schritte'
on conflict (unit_id, slug) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 1, 'presentation', 'A greeting for any time of day.', '{"german":"Hallo!","translation":"Hi! / Hello!","note":"Casual — works any time of day, with friends."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 1
  and v.lemma = 'hallo'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 2, 'presentation', 'Before about 11 a.m.', '{"german":"Guten Morgen!","translation":"Good morning!"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 2
  and v.lemma = 'guten Morgen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 3, 'presentation', 'From early evening.', '{"german":"Guten Abend!","translation":"Good evening!"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 3
  and v.lemma = 'guten Abend'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 4, 'info', null, '{"title":"Begrüßung nach Tageszeit","body":"German picks the greeting by time of day: **Guten Morgen** (early), **Guten Tag** (midday/afternoon), **Guten Abend** (evening). **Hallo** is always fine and casual."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 5, 'flashcard', null, '{"lemma":"tschüss"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 5
  and v.lemma = 'tschüss'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 6, 'multiple_choice', 'It''s 8 in the morning. What do you say?', '{"question":"Es ist 8 Uhr morgens. Was sagst du?","options":[{"id":"a","text":"Guten Morgen!","correct":true},{"id":"b","text":"Guten Abend!","correct":false},{"id":"c","text":"Gute Nacht!","correct":false}],"explanation":"Bis ca. 11 Uhr sagt man „Guten Morgen!“."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 7, 'presentation', 'Ask how someone is.', '{"german":"Wie geht es dir?","translation":"How are you?","note":"„Wie geht''s?“ is the short, casual version."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 7
  and v.lemma = 'wie'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 7
  and v.lemma = 'gehen'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 7
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 8, 'fill_blank', 'Complete the reply.', '{"before":"Mir geht ","after":" gut, danke.","answer":"es","translation":"I''m well, thanks.","explanation":"„gehen“ braucht hier „es“: *Mir geht **es** gut.*"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 8
  and v.lemma = 'gut'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 9, 'writing_prompt', 'Greet someone in the morning and ask how they are.', '{"ask":"Say: Good morning! How are you?","answer":"Guten Morgen! Wie geht es dir?","acceptable":["Guten Morgen. Wie geht es dir?","Guten Morgen! Wie geht''s?"],"hint":"„Guten Morgen“ + a W-question.","explanation":"„Wie“ startet die Frage, das Verb „geht“ steht direkt danach."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'begruessungen' and li.sort_order = 9
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 10, 'listening', 'Listen and choose what you heard.', '{"audioText":"Guten Abend!","question":"Was hast du gehört?","options":[{"id":"a","text":"Guten Abend!","correct":true},{"id":"b","text":"Guten Morgen!","correct":false},{"id":"c","text":"Gute Nacht!","correct":false}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 11, 'speaking', 'Say it out loud.', '{"targetGerman":"Guten Morgen! Wie geht es dir?","translation":"Good morning! How are you?"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'begruessungen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'sich-vorstellen', 'Sich vorstellen', 'Deinen Namen sagen und die Herkunft nennen.', 'conversation', 2, 7, true
from public.units u where u.level_code = 'A1' and u.slug = 'erste-schritte'
on conflict (unit_id, slug) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 1, 'presentation', null, '{"german":"Wie heißt du?","translation":"What''s your name?","tokens":[{"surface":"Wie","lemma":"wie"},{"surface":"heißt","lemma":"heißen"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 1
  and v.lemma = 'wie'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 1
  and v.lemma = 'heißen'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 1
  and v.lemma = 'du'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 1
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 2, 'presentation', null, '{"german":"Ich heiße Heidi.","translation":"My name is Heidi.","note":"„heißen“ = to be called. „Ich bin Heidi.“ works too.","tokens":[{"surface":"heiße","lemma":"heißen"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 2
  and v.lemma = 'ich'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 2
  and v.lemma = 'heißen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 3, 'info', null, '{"title":"Verben im Präsens","body":"With **ich** the verb usually ends in **-e**, with **du** in **-st**: *ich heiße – du heißt*, *ich komme – du kommst*, *ich wohne – du wohnst*.","examples":[{"german":"ich heiße / du heißt"},{"german":"ich komme / du kommst"},{"german":"ich wohne / du wohnst"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 3
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 4, 'writing_prompt', 'Introduce yourself.', '{"ask":"Say: My name is Heidi.","answer":"Ich heiße Heidi.","acceptable":["Ich bin Heidi."],"commonMistakes":[{"wrong":"Ich heißen Heidi.","explanation":"Bei „ich“ endet das Verb auf **-e**: *heißen → ich heiße*."}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 4
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 5, 'presentation', null, '{"german":"Woher kommst du?","translation":"Where are you from?","tokens":[{"surface":"Woher","lemma":"woher"},{"surface":"kommst","lemma":"kommen"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 5
  and v.lemma = 'woher'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 5
  and v.lemma = 'kommen'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 5
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 6, 'fill_blank', 'Say you''re from South Africa.', '{"before":"Ich ","after":" aus Südafrika.","answer":"komme","translation":"I come from South Africa.","explanation":"*kommen → ich **komme***.","commonMistakes":[{"wrong":"kommen","explanation":"Bei „ich“ endet das Verb auf **-e**: *kommen → ich komme*."}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 6
  and v.lemma = 'kommen'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 6
  and v.lemma = 'aus'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 6
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 7, 'writing_prompt', 'Say where you live.', '{"ask":"Say: I live in South Africa.","answer":"Ich wohne in Südafrika.","hint":"wohnen → ich wohn__","explanation":"Bei **ich** bekommt „wohnen“ die Endung **-e**: *wohnen → ich wohne*.","commonMistakes":[{"wrong":"Ich wohnen in Südafrika.","explanation":"Bei „ich“ bekommt das Verb „wohnen“ im Präsens die Endung **-e**. *wohnen → ich wohne*."}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 7
  and v.lemma = 'wohnen'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 7
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 8, 'multiple_choice', null, '{"question":"„Woher kommst du?“ — Welche Antwort ist richtig?","options":[{"id":"a","text":"Ich komme aus England.","correct":true},{"id":"b","text":"Ich kommen aus England.","correct":false},{"id":"c","text":"Ich aus England komme.","correct":false}],"explanation":"*ich komme* (Endung -e), und das Verb steht an Position 2."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 8
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen' and li.sort_order = 8
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 9, 'listening', null, '{"audioText":"Wie heißt du?","question":"Welche Frage hörst du?","options":[{"id":"a","text":"Wie heißt du?","correct":true},{"id":"b","text":"Woher kommst du?","correct":false},{"id":"c","text":"Wo wohnst du?","correct":false}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 10, 'speaking', 'Introduce yourself out loud.', '{"targetGerman":"Ich heiße Heidi. Ich komme aus Südafrika.","translation":"My name is Heidi. I''m from South Africa."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'sich-vorstellen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'zahlen-alter', 'Zahlen & Alter', 'Zahlen 0–10 und das Alter angeben.', 'vocabulary', 3, 6, true
from public.units u where u.level_code = 'A1' and u.slug = 'erste-schritte'
on conflict (unit_id, slug) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 1, 'presentation', null, '{"german":"null, eins, zwei, drei, vier, fünf","translation":"0, 1, 2, 3, 4, 5","audioText":"null. eins. zwei. drei. vier. fünf."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 2, 'presentation', null, '{"german":"sechs, sieben, acht, neun, zehn","translation":"6, 7, 8, 9, 10","audioText":"sechs. sieben. acht. neun. zehn."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 3, 'flashcard', null, '{"lemma":"zehn"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 3
  and v.lemma = 'zehn'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 4, 'matching', 'Match the number word to the digit.', '{"pairs":[{"id":"1","left":"eins","right":"1"},{"id":"3","left":"drei","right":"3"},{"id":"5","left":"fünf","right":"5"},{"id":"8","left":"acht","right":"8"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 4
  and v.lemma = 'eins'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 4
  and v.lemma = 'drei'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 5, 'multiple_choice', null, '{"question":"Welche Zahl ist „sieben“?","options":[{"id":"a","text":"6","correct":false},{"id":"b","text":"7","correct":true},{"id":"c","text":"8","correct":false}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 6, 'presentation', null, '{"german":"Wie alt bist du?","translation":"How old are you?"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 6
  and v.lemma = 'wie'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 6
  and v.lemma = 'alt'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 6
  and v.lemma = 'sein'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 6
  and gp.slug = 'verb-sein'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 6
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 7, 'presentation', null, '{"german":"Ich bin dreißig Jahre alt.","translation":"I''m thirty years old.","note":"German uses „sein“ for age, not „haben“."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 7
  and v.lemma = 'sein'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 7
  and v.lemma = 'das Jahr'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 7
  and v.lemma = 'alt'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 7
  and gp.slug = 'verb-sein'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 8, 'fill_blank', 'Give your age.', '{"before":"Ich ","after":" 25 Jahre alt.","answer":"bin","translation":"I''m 25 years old.","explanation":"Alter mit **sein**: *ich **bin** … Jahre alt*.","commonMistakes":[{"wrong":"habe","explanation":"Im Deutschen: *Ich **bin** … Jahre alt* (nicht „habe“)."}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter' and li.sort_order = 8
  and gp.slug = 'verb-sein'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 9, 'speaking', null, '{"targetGerman":"Ich bin fünfundzwanzig Jahre alt.","translation":"I''m twenty-five years old."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'zahlen-alter'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'laender-sprachen', 'Länder & Sprachen', 'Länder und Sprachen benennen.', 'vocabulary', 4, 6, true
from public.units u where u.level_code = 'A1' and u.slug = 'erste-schritte'
on conflict (unit_id, slug) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 1, 'presentation', null, '{"german":"Ich komme aus Deutschland.","translation":"I come from Germany.","tokens":[{"surface":"komme","lemma":"kommen"},{"surface":"aus","lemma":"aus"}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 1
  and v.lemma = 'kommen'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 1
  and v.lemma = 'aus'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 2, 'info', null, '{"title":"Länder mit und ohne Artikel","body":"Most countries take no article: *aus Deutschland, aus Südafrika, aus Italien*. A few need one: *aus **der** Schweiz*, *aus **den** USA*."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 3, 'flashcard', null, '{"lemma":"die Sprache"}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 3
  and v.lemma = 'die Sprache'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 4, 'presentation', null, '{"german":"Ich spreche Deutsch und ein bisschen Englisch.","translation":"I speak German and a little English."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 4
  and v.lemma = 'sprechen'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 4
  and v.lemma = 'Deutsch'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 4
  and v.lemma = 'Englisch'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 4
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 5, 'multiple_choice', null, '{"question":"„Wo wohnst du?“ — Welche Antwort passt?","options":[{"id":"a","text":"Ich wohne in Wien.","correct":true},{"id":"b","text":"Ich wohnen in Wien.","correct":false},{"id":"c","text":"Ich in Wien wohne.","correct":false}],"explanation":"*ich wohne*, Verb an Position 2."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 5
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 5
  and gp.slug = 'w-fragen'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 6, 'fill_blank', 'Say which language you speak.', '{"before":"Ich ","after":" Englisch.","answer":"spreche","explanation":"*sprechen → ich **spreche***.","commonMistakes":[{"wrong":"sprechen","explanation":"Bei „ich“: *sprechen → ich spreche*."}]}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 6
  and v.lemma = 'sprechen'
on conflict do nothing;

insert into public.lesson_item_vocabulary (lesson_item_id, vocabulary_id, role)
select li.id, v.id, 'target'
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.vocabulary v
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 6
  and v.lemma = 'Englisch'
on conflict do nothing;

insert into public.lesson_item_grammar (lesson_item_id, grammar_point_id)
select li.id, gp.id
from public.lesson_items li
join public.lessons l on l.id = li.lesson_id
join public.units u on u.id = l.unit_id
cross join public.grammar_points gp
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen' and li.sort_order = 6
  and gp.slug = 'regelmaessige-verben-praesens'
on conflict do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 7, 'writing_prompt', 'Put it together.', '{"ask":"Say: I come from South Africa and I speak English.","answer":"Ich komme aus Südafrika und ich spreche Englisch.","acceptable":["Ich komme aus Südafrika und spreche Englisch."],"hint":"„und“ joins two sentences."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

insert into public.lesson_items (lesson_id, sort_order, item_type, prompt, content)
select l.id, 8, 'speaking', null, '{"targetGerman":"Ich komme aus Südafrika. Ich spreche Englisch und ein bisschen Deutsch.","translation":"I''m from South Africa. I speak English and a little German."}'::jsonb
from public.lessons l join public.units u on u.id = l.unit_id
where u.slug = 'erste-schritte' and l.slug = 'laender-sprachen'
on conflict (lesson_id, sort_order) do nothing;

-- ===== unit: A1 / mein-alltag =====
insert into public.units (level_code, slug, title, description, sort_order, is_published)
values ('A1', 'mein-alltag', 'Mein Alltag', 'Familie, Zuhause, Arbeit und Tagesablauf.', 2, false)
on conflict (level_code, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'familie-freunde', 'Familie & Freunde', null, 'vocabulary', 1, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'mein-alltag'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'zuhause', 'Zuhause', null, 'vocabulary', 2, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'mein-alltag'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'arbeit-schule', 'Arbeit & Schule', null, 'vocabulary', 3, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'mein-alltag'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'tagesablauf', 'Tagesablauf', null, 'vocabulary', 4, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'mein-alltag'
on conflict (unit_id, slug) do nothing;

-- ===== unit: A1 / im-echten-leben =====
insert into public.units (level_code, slug, title, description, sort_order, is_published)
values ('A1', 'im-echten-leben', 'Im echten Leben', 'Essen, Einkaufen, Freizeit und Pläne machen.', 3, false)
on conflict (level_code, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'essen-getraenke', 'Essen & Getränke', null, 'vocabulary', 1, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'im-echten-leben'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'einkaufen', 'Einkaufen', null, 'vocabulary', 2, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'im-echten-leben'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'freizeit', 'Freizeit', null, 'vocabulary', 3, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'im-echten-leben'
on conflict (unit_id, slug) do nothing;

insert into public.lessons (unit_id, slug, title, description, lesson_type, sort_order, estimated_minutes, is_published)
select u.id, 'plaene-machen', 'Pläne machen', null, 'vocabulary', 4, 6, false
from public.units u where u.level_code = 'A1' and u.slug = 'im-echten-leben'
on conflict (unit_id, slug) do nothing;

