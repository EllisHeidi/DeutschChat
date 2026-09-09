import type { Curriculum } from "@/content/curriculum/types";

/**
 * A1 curriculum — source of truth.
 *
 * Step 4 fully authors **A1.1 — Erste Schritte** (4 lessons). A1.2 and A1.3 are
 * present as unpublished structure so the roadmap is real and the model holds
 * the whole shape; their lessons are filled in later steps.
 *
 * German is written to be natural and beginner-appropriate. `**bold**` in
 * explanations is rendered.
 */

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------
const vocabulary: Curriculum["vocabulary"] = [
  {
    lemma: "hallo",
    displayForm: "hallo",
    translation: "hello / hi",
    partOfSpeech: "interjection",
    ipa: "/ˈhalo/",
    example: "Hallo! Wie geht es dir?",
    exampleTranslation: "Hi! How are you?",
    cefrLevel: "A1",
  },
  {
    lemma: "guten Morgen",
    displayForm: "guten Morgen",
    translation: "good morning",
    partOfSpeech: "phrase",
    ipa: "/ˌɡuːtn̩ ˈmɔʁɡn̩/",
    example: "Guten Morgen! Gut geschlafen?",
    exampleTranslation: "Good morning! Did you sleep well?",
    cefrLevel: "A1",
  },
  {
    lemma: "guten Abend",
    displayForm: "guten Abend",
    translation: "good evening",
    partOfSpeech: "phrase",
    ipa: "/ˌɡuːtn̩ ˈaːbn̩t/",
    example: "Guten Abend! Schön, Sie zu sehen.",
    exampleTranslation: "Good evening! Nice to see you.",
    cefrLevel: "A1",
  },
  {
    lemma: "tschüss",
    displayForm: "tschüss",
    translation: "bye",
    partOfSpeech: "interjection",
    ipa: "/tʃʏs/",
    example: "Tschüss, bis morgen!",
    exampleTranslation: "Bye, see you tomorrow!",
    cefrLevel: "A1",
  },
  {
    lemma: "auf Wiedersehen",
    displayForm: "auf Wiedersehen",
    translation: "goodbye",
    partOfSpeech: "phrase",
    ipa: "/aʊ̯f ˈviːdɐˌzeːən/",
    example: "Auf Wiedersehen und einen schönen Tag!",
    exampleTranslation: "Goodbye and have a nice day!",
    cefrLevel: "A1",
  },
  {
    lemma: "danke",
    displayForm: "danke",
    translation: "thanks",
    partOfSpeech: "interjection",
    ipa: "/ˈdaŋkə/",
    example: "Danke für deine Hilfe.",
    exampleTranslation: "Thanks for your help.",
    cefrLevel: "A1",
  },
  {
    lemma: "bitte",
    displayForm: "bitte",
    translation: "please / you're welcome",
    partOfSpeech: "interjection",
    ipa: "/ˈbɪtə/",
    example: "Einen Kaffee, bitte.",
    exampleTranslation: "A coffee, please.",
    cefrLevel: "A1",
  },
  {
    lemma: "ja",
    displayForm: "ja",
    translation: "yes",
    partOfSpeech: "other",
    ipa: "/jaː/",
    example: "Ja, das stimmt.",
    exampleTranslation: "Yes, that's right.",
    cefrLevel: "A1",
  },
  {
    lemma: "nein",
    displayForm: "nein",
    translation: "no",
    partOfSpeech: "other",
    ipa: "/naɪ̯n/",
    example: "Nein, danke.",
    exampleTranslation: "No, thanks.",
    cefrLevel: "A1",
  },
  {
    lemma: "ich",
    displayForm: "ich",
    translation: "I",
    partOfSpeech: "pronoun",
    ipa: "/ɪç/",
    example: "Ich heiße Heidi.",
    exampleTranslation: "My name is Heidi.",
    cefrLevel: "A1",
  },
  {
    lemma: "du",
    displayForm: "du",
    translation: "you (informal)",
    partOfSpeech: "pronoun",
    ipa: "/duː/",
    example: "Woher kommst du?",
    exampleTranslation: "Where are you from?",
    cefrLevel: "A1",
  },
  {
    lemma: "Sie",
    displayForm: "Sie",
    translation: "you (formal)",
    partOfSpeech: "pronoun",
    ipa: "/ziː/",
    example: "Wie heißen Sie?",
    exampleTranslation: "What is your name?",
    cefrLevel: "A1",
  },
  {
    lemma: "heißen",
    displayForm: "heißen",
    translation: "to be called",
    partOfSpeech: "verb",
    ipa: "/ˈhaɪ̯sn̩/",
    example: "Ich heiße Anna. Und du?",
    exampleTranslation: "My name is Anna. And you?",
    cefrLevel: "A1",
  },
  {
    lemma: "sein",
    displayForm: "sein",
    translation: "to be",
    partOfSpeech: "verb",
    ipa: "/zaɪ̯n/",
    example: "Ich bin müde.",
    exampleTranslation: "I'm tired.",
    cefrLevel: "A1",
  },
  {
    lemma: "kommen",
    displayForm: "kommen",
    translation: "to come",
    partOfSpeech: "verb",
    ipa: "/ˈkɔmən/",
    example: "Ich komme aus Österreich.",
    exampleTranslation: "I come from Austria.",
    cefrLevel: "A1",
  },
  {
    lemma: "wohnen",
    displayForm: "wohnen",
    translation: "to live (reside)",
    partOfSpeech: "verb",
    ipa: "/ˈvoːnən/",
    example: "Wir wohnen in Berlin.",
    exampleTranslation: "We live in Berlin.",
    cefrLevel: "A1",
  },
  {
    lemma: "sprechen",
    displayForm: "sprechen",
    translation: "to speak",
    partOfSpeech: "verb",
    ipa: "/ˈʃpʁɛçn̩/",
    example: "Ich spreche ein bisschen Deutsch.",
    exampleTranslation: "I speak a little German.",
    cefrLevel: "A1",
  },
  {
    lemma: "gehen",
    displayForm: "gehen",
    translation: "to go",
    partOfSpeech: "verb",
    ipa: "/ˈɡeːən/",
    example: "Wie geht es dir?",
    exampleTranslation: "How are you?",
    cefrLevel: "A1",
  },
  {
    lemma: "wie",
    displayForm: "wie",
    translation: "how",
    partOfSpeech: "adverb",
    ipa: "/viː/",
    example: "Wie heißt du?",
    exampleTranslation: "What's your name?",
    cefrLevel: "A1",
  },
  {
    lemma: "woher",
    displayForm: "woher",
    translation: "where from",
    partOfSpeech: "adverb",
    ipa: "/voˈheːɐ̯/",
    example: "Woher kommst du?",
    exampleTranslation: "Where are you from?",
    cefrLevel: "A1",
  },
  {
    lemma: "wo",
    displayForm: "wo",
    translation: "where",
    partOfSpeech: "adverb",
    ipa: "/voː/",
    example: "Wo wohnst du?",
    exampleTranslation: "Where do you live?",
    cefrLevel: "A1",
  },
  {
    lemma: "wer",
    displayForm: "wer",
    translation: "who",
    partOfSpeech: "pronoun",
    ipa: "/veːɐ̯/",
    example: "Wer ist das?",
    exampleTranslation: "Who is that?",
    cefrLevel: "A1",
  },
  {
    lemma: "aus",
    displayForm: "aus",
    translation: "from / out of",
    partOfSpeech: "preposition",
    ipa: "/aʊ̯s/",
    example: "Sie kommt aus der Schweiz.",
    exampleTranslation: "She comes from Switzerland.",
    cefrLevel: "A1",
  },
  {
    lemma: "gut",
    displayForm: "gut",
    translation: "good / well",
    partOfSpeech: "adjective",
    ipa: "/ɡuːt/",
    example: "Mir geht es gut, danke.",
    exampleTranslation: "I'm well, thanks.",
    cefrLevel: "A1",
  },
  {
    lemma: "alt",
    displayForm: "alt",
    translation: "old",
    partOfSpeech: "adjective",
    ipa: "/alt/",
    example: "Wie alt bist du?",
    exampleTranslation: "How old are you?",
    cefrLevel: "A1",
  },
  {
    lemma: "der Name",
    displayForm: "der Name",
    translation: "the name",
    partOfSpeech: "noun",
    article: "der",
    pluralForm: "die Namen",
    ipa: "/ˈnaːmə/",
    example: "Mein Name ist Heidi.",
    exampleTranslation: "My name is Heidi.",
    cefrLevel: "A1",
  },
  {
    lemma: "das Jahr",
    displayForm: "das Jahr",
    translation: "the year",
    partOfSpeech: "noun",
    article: "das",
    pluralForm: "die Jahre",
    ipa: "/jaːɐ̯/",
    example: "Ich bin dreißig Jahre alt.",
    exampleTranslation: "I'm thirty years old.",
    cefrLevel: "A1",
  },
  {
    lemma: "die Sprache",
    displayForm: "die Sprache",
    translation: "the language",
    partOfSpeech: "noun",
    article: "die",
    pluralForm: "die Sprachen",
    ipa: "/ˈʃpʁaːxə/",
    example: "Deutsch ist eine schöne Sprache.",
    exampleTranslation: "German is a beautiful language.",
    cefrLevel: "A1",
  },
  {
    lemma: "Deutsch",
    displayForm: "Deutsch",
    translation: "German (language)",
    partOfSpeech: "noun",
    ipa: "/dɔʏ̯tʃ/",
    example: "Ich lerne Deutsch.",
    exampleTranslation: "I'm learning German.",
    cefrLevel: "A1",
  },
  {
    lemma: "Englisch",
    displayForm: "Englisch",
    translation: "English (language)",
    partOfSpeech: "noun",
    ipa: "/ˈɛŋlɪʃ/",
    example: "Sprichst du Englisch?",
    exampleTranslation: "Do you speak English?",
    cefrLevel: "A1",
  },
  {
    lemma: "eins",
    displayForm: "eins",
    translation: "one",
    partOfSpeech: "numeral",
    ipa: "/aɪ̯ns/",
    example: "Ich habe nur eins.",
    exampleTranslation: "I only have one.",
    cefrLevel: "A1",
  },
  {
    lemma: "zwei",
    displayForm: "zwei",
    translation: "two",
    partOfSpeech: "numeral",
    ipa: "/t͡svaɪ̯/",
    example: "Ich spreche zwei Sprachen.",
    exampleTranslation: "I speak two languages.",
    cefrLevel: "A1",
  },
  {
    lemma: "drei",
    displayForm: "drei",
    translation: "three",
    partOfSpeech: "numeral",
    ipa: "/dʁaɪ̯/",
    example: "Wir sind drei Personen.",
    exampleTranslation: "We are three people.",
    cefrLevel: "A1",
  },
  {
    lemma: "zehn",
    displayForm: "zehn",
    translation: "ten",
    partOfSpeech: "numeral",
    ipa: "/t͡seːn/",
    example: "Bis zehn zählen ist leicht.",
    exampleTranslation: "Counting to ten is easy.",
    cefrLevel: "A1",
  },
];

// ---------------------------------------------------------------------------
// Grammar points
// ---------------------------------------------------------------------------
const grammarPoints: Curriculum["grammarPoints"] = [
  {
    slug: "personalpronomen",
    title: "Personalpronomen (Nominativ)",
    summary:
      "The words for who is doing something: ich, du, er/sie/es, wir, ihr, sie/Sie.",
    explanation:
      "**ich** = I, **du** = you (a friend), **Sie** = you (polite / a stranger). " +
      "The verb ending changes with the pronoun, so these two always go together.",
    cefrLevel: "A1",
    category: "pronouns",
    examples: [
      { german: "ich bin", translation: "I am" },
      { german: "du bist", translation: "you are" },
      { german: "Sie sind", translation: "you are (formal)" },
    ],
  },
  {
    slug: "verb-sein",
    title: "Das Verb „sein“",
    summary: "„sein“ (to be) is irregular — learn it as a set.",
    explanation:
      "**ich bin**, **du bist**, **er/sie/es ist**, **wir sind**, **ihr seid**, **sie/Sie sind**. " +
      "Use it for names, feelings, jobs and age: *Ich bin Heidi.* · *Ich bin müde.* · *Ich bin 30 Jahre alt.*",
    cefrLevel: "A1",
    category: "verbs",
    examples: [
      { german: "Ich bin Anna.", translation: "I'm Anna." },
      { german: "Bist du müde?", translation: "Are you tired?" },
      { german: "Sie ist aus Wien.", translation: "She's from Vienna." },
    ],
  },
  {
    slug: "regelmaessige-verben-praesens",
    title: "Regelmäßige Verben im Präsens",
    summary: "Most verbs follow one pattern in the present tense.",
    explanation:
      "Take the stem and add: **ich -e**, **du -st**, **er/sie/es -t**, **wir -en**, **ihr -t**, **sie/Sie -en**. " +
      "*wohnen* → ich wohn**e**, du wohn**st**, er wohn**t**. Same for *kommen*, *heißen*, *sprechen*.",
    cefrLevel: "A1",
    category: "verbs",
    examples: [
      {
        german: "Ich komme aus Südafrika.",
        translation: "I come from South Africa.",
      },
      { german: "Du wohnst in Hamburg.", translation: "You live in Hamburg." },
      { german: "Er heißt Tom.", translation: "His name is Tom." },
    ],
  },
  {
    slug: "w-fragen",
    title: "W-Fragen",
    summary: "Questions that start with a W-word. The verb comes second.",
    explanation:
      "**Wie** heißt du? · **Woher** kommst du? · **Wo** wohnst du? · **Wer** ist das? " +
      "Pattern: *W-Wort + Verb + Rest*.",
    cefrLevel: "A1",
    category: "word-order",
    examples: [
      { german: "Wie heißt du?", translation: "What's your name?" },
      { german: "Woher kommst du?", translation: "Where are you from?" },
      { german: "Wo wohnst du?", translation: "Where do you live?" },
    ],
  },
];

// ---------------------------------------------------------------------------
// A1.1 — Erste Schritte
// ---------------------------------------------------------------------------
const ersteSchritte: Curriculum["units"][number] = {
  levelCode: "A1",
  slug: "erste-schritte",
  title: "Erste Schritte",
  description: "Begrüßen, sich vorstellen, Zahlen und Herkunft.",
  sortOrder: 1,
  published: true,
  lessons: [
    {
      slug: "begruessungen",
      title: "Begrüßungen",
      description: "Begrüßen und nach dem Befinden fragen.",
      lessonType: "vocabulary",
      estimatedMinutes: 6,
      items: [
        {
          itemType: "presentation",
          prompt: "A greeting for any time of day.",
          content: {
            german: "Hallo!",
            translation: "Hi! / Hello!",
            note: "Casual — works any time of day, with friends.",
          },
          vocab: ["hallo"],
        },
        {
          itemType: "presentation",
          prompt: "Before about 11 a.m.",
          content: {
            german: "Guten Morgen!",
            translation: "Good morning!",
          },
          vocab: ["guten Morgen"],
        },
        {
          itemType: "presentation",
          prompt: "From early evening.",
          content: {
            german: "Guten Abend!",
            translation: "Good evening!",
          },
          vocab: ["guten Abend"],
        },
        {
          itemType: "info",
          content: {
            title: "Begrüßung nach Tageszeit",
            body: "German picks the greeting by time of day: **Guten Morgen** (early), **Guten Tag** (midday/afternoon), **Guten Abend** (evening). **Hallo** is always fine and casual.",
          },
        },
        {
          itemType: "flashcard",
          content: { lemma: "tschüss" },
          vocab: ["tschüss"],
        },
        {
          itemType: "multiple_choice",
          prompt: "It's 8 in the morning. What do you say?",
          content: {
            question: "Es ist 8 Uhr morgens. Was sagst du?",
            options: [
              { id: "a", text: "Guten Morgen!", correct: true },
              { id: "b", text: "Guten Abend!", correct: false },
              { id: "c", text: "Gute Nacht!", correct: false },
            ],
            explanation: "Bis ca. 11 Uhr sagt man „Guten Morgen!“.",
          },
        },
        {
          itemType: "presentation",
          prompt: "Ask how someone is.",
          content: {
            german: "Wie geht es dir?",
            translation: "How are you?",
            note: "„Wie geht's?“ is the short, casual version.",
          },
          vocab: ["wie", "gehen"],
          grammar: ["w-fragen"],
        },
        {
          itemType: "fill_blank",
          prompt: "Complete the reply.",
          content: {
            before: "Mir geht ",
            after: " gut, danke.",
            answer: "es",
            translation: "I'm well, thanks.",
            explanation: "„gehen“ braucht hier „es“: *Mir geht **es** gut.*",
          },
          vocab: ["gut"],
        },
        {
          itemType: "writing_prompt",
          prompt: "Greet someone in the morning and ask how they are.",
          content: {
            ask: "Say: Good morning! How are you?",
            answer: "Guten Morgen! Wie geht es dir?",
            acceptable: [
              "Guten Morgen. Wie geht es dir?",
              "Guten Morgen! Wie geht's?",
            ],
            hint: "„Guten Morgen“ + a W-question.",
            explanation:
              "„Wie“ startet die Frage, das Verb „geht“ steht direkt danach.",
          },
          grammar: ["w-fragen"],
        },
        {
          itemType: "listening",
          prompt: "Listen and choose what you heard.",
          content: {
            audioText: "Guten Abend!",
            question: "Was hast du gehört?",
            options: [
              { id: "a", text: "Guten Abend!", correct: true },
              { id: "b", text: "Guten Morgen!", correct: false },
              { id: "c", text: "Gute Nacht!", correct: false },
            ],
          },
        },
        {
          itemType: "speaking",
          prompt: "Say it out loud.",
          content: {
            targetGerman: "Guten Morgen! Wie geht es dir?",
            translation: "Good morning! How are you?",
          },
        },
      ],
    },
    {
      slug: "sich-vorstellen",
      title: "Sich vorstellen",
      description: "Deinen Namen sagen und die Herkunft nennen.",
      lessonType: "conversation",
      estimatedMinutes: 7,
      items: [
        {
          itemType: "presentation",
          content: {
            german: "Wie heißt du?",
            translation: "What's your name?",
            tokens: [
              { surface: "Wie", lemma: "wie" },
              { surface: "heißt", lemma: "heißen" },
            ],
          },
          vocab: ["wie", "heißen", "du"],
          grammar: ["w-fragen"],
        },
        {
          itemType: "presentation",
          content: {
            german: "Ich heiße Heidi.",
            translation: "My name is Heidi.",
            note: "„heißen“ = to be called. „Ich bin Heidi.“ works too.",
            tokens: [{ surface: "heiße", lemma: "heißen" }],
          },
          vocab: ["ich", "heißen"],
        },
        {
          itemType: "info",
          content: {
            title: "Verben im Präsens",
            body: "With **ich** the verb usually ends in **-e**, with **du** in **-st**: *ich heiße – du heißt*, *ich komme – du kommst*, *ich wohne – du wohnst*.",
            examples: [
              { german: "ich heiße / du heißt" },
              { german: "ich komme / du kommst" },
              { german: "ich wohne / du wohnst" },
            ],
          },
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "writing_prompt",
          prompt: "Introduce yourself.",
          content: {
            ask: "Say: My name is Heidi.",
            answer: "Ich heiße Heidi.",
            acceptable: ["Ich bin Heidi."],
            commonMistakes: [
              {
                wrong: "Ich heißen Heidi.",
                explanation:
                  "Bei „ich“ endet das Verb auf **-e**: *heißen → ich heiße*.",
              },
            ],
          },
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "presentation",
          content: {
            german: "Woher kommst du?",
            translation: "Where are you from?",
            tokens: [
              { surface: "Woher", lemma: "woher" },
              { surface: "kommst", lemma: "kommen" },
            ],
          },
          vocab: ["woher", "kommen"],
          grammar: ["w-fragen"],
        },
        {
          itemType: "fill_blank",
          prompt: "Say you're from South Africa.",
          content: {
            before: "Ich ",
            after: " aus Südafrika.",
            answer: "komme",
            translation: "I come from South Africa.",
            explanation: "*kommen → ich **komme***.",
            commonMistakes: [
              {
                wrong: "kommen",
                explanation:
                  "Bei „ich“ endet das Verb auf **-e**: *kommen → ich komme*.",
              },
            ],
          },
          vocab: ["kommen", "aus"],
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "writing_prompt",
          prompt: "Say where you live.",
          content: {
            ask: "Say: I live in South Africa.",
            answer: "Ich wohne in Südafrika.",
            hint: "wohnen → ich wohn__",
            explanation:
              "Bei **ich** bekommt „wohnen“ die Endung **-e**: *wohnen → ich wohne*.",
            commonMistakes: [
              {
                wrong: "Ich wohnen in Südafrika.",
                explanation:
                  "Bei „ich“ bekommt das Verb „wohnen“ im Präsens die Endung **-e**. *wohnen → ich wohne*.",
              },
            ],
          },
          vocab: ["wohnen"],
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "multiple_choice",
          content: {
            question: "„Woher kommst du?“ — Welche Antwort ist richtig?",
            options: [
              { id: "a", text: "Ich komme aus England.", correct: true },
              { id: "b", text: "Ich kommen aus England.", correct: false },
              { id: "c", text: "Ich aus England komme.", correct: false },
            ],
            explanation:
              "*ich komme* (Endung -e), und das Verb steht an Position 2.",
          },
          grammar: ["regelmaessige-verben-praesens", "w-fragen"],
        },
        {
          itemType: "listening",
          content: {
            audioText: "Wie heißt du?",
            question: "Welche Frage hörst du?",
            options: [
              { id: "a", text: "Wie heißt du?", correct: true },
              { id: "b", text: "Woher kommst du?", correct: false },
              { id: "c", text: "Wo wohnst du?", correct: false },
            ],
          },
        },
        {
          itemType: "speaking",
          prompt: "Introduce yourself out loud.",
          content: {
            targetGerman: "Ich heiße Heidi. Ich komme aus Südafrika.",
            translation: "My name is Heidi. I'm from South Africa.",
          },
        },
      ],
    },
    {
      slug: "zahlen-alter",
      title: "Zahlen & Alter",
      description: "Zahlen 0–10 und das Alter angeben.",
      lessonType: "vocabulary",
      estimatedMinutes: 6,
      items: [
        {
          itemType: "presentation",
          content: {
            german: "null, eins, zwei, drei, vier, fünf",
            translation: "0, 1, 2, 3, 4, 5",
            audioText: "null. eins. zwei. drei. vier. fünf.",
          },
        },
        {
          itemType: "presentation",
          content: {
            german: "sechs, sieben, acht, neun, zehn",
            translation: "6, 7, 8, 9, 10",
            audioText: "sechs. sieben. acht. neun. zehn.",
          },
        },
        {
          itemType: "flashcard",
          content: { lemma: "zehn" },
          vocab: ["zehn"],
        },
        {
          itemType: "matching",
          prompt: "Match the number word to the digit.",
          content: {
            pairs: [
              { id: "1", left: "eins", right: "1" },
              { id: "3", left: "drei", right: "3" },
              { id: "5", left: "fünf", right: "5" },
              { id: "8", left: "acht", right: "8" },
            ],
          },
          vocab: ["eins", "drei"],
        },
        {
          itemType: "multiple_choice",
          content: {
            question: "Welche Zahl ist „sieben“?",
            options: [
              { id: "a", text: "6", correct: false },
              { id: "b", text: "7", correct: true },
              { id: "c", text: "8", correct: false },
            ],
          },
        },
        {
          itemType: "presentation",
          content: {
            german: "Wie alt bist du?",
            translation: "How old are you?",
          },
          vocab: ["wie", "alt", "sein"],
          grammar: ["verb-sein", "w-fragen"],
        },
        {
          itemType: "presentation",
          content: {
            german: "Ich bin dreißig Jahre alt.",
            translation: "I'm thirty years old.",
            note: "German uses „sein“ for age, not „haben“.",
          },
          vocab: ["sein", "das Jahr", "alt"],
          grammar: ["verb-sein"],
        },
        {
          itemType: "fill_blank",
          prompt: "Give your age.",
          content: {
            before: "Ich ",
            after: " 25 Jahre alt.",
            answer: "bin",
            translation: "I'm 25 years old.",
            explanation: "Alter mit **sein**: *ich **bin** … Jahre alt*.",
            commonMistakes: [
              {
                wrong: "habe",
                explanation:
                  "Im Deutschen: *Ich **bin** … Jahre alt* (nicht „habe“).",
              },
            ],
          },
          grammar: ["verb-sein"],
        },
        {
          itemType: "speaking",
          content: {
            targetGerman: "Ich bin fünfundzwanzig Jahre alt.",
            translation: "I'm twenty-five years old.",
          },
        },
      ],
    },
    {
      slug: "laender-sprachen",
      title: "Länder & Sprachen",
      description: "Länder und Sprachen benennen.",
      lessonType: "vocabulary",
      estimatedMinutes: 6,
      items: [
        {
          itemType: "presentation",
          content: {
            german: "Ich komme aus Deutschland.",
            translation: "I come from Germany.",
            tokens: [
              { surface: "komme", lemma: "kommen" },
              { surface: "aus", lemma: "aus" },
            ],
          },
          vocab: ["kommen", "aus"],
        },
        {
          itemType: "info",
          content: {
            title: "Länder mit und ohne Artikel",
            body: "Most countries take no article: *aus Deutschland, aus Südafrika, aus Italien*. A few need one: *aus **der** Schweiz*, *aus **den** USA*.",
          },
        },
        {
          itemType: "flashcard",
          content: { lemma: "die Sprache" },
          vocab: ["die Sprache"],
        },
        {
          itemType: "presentation",
          content: {
            german: "Ich spreche Deutsch und ein bisschen Englisch.",
            translation: "I speak German and a little English.",
          },
          vocab: ["sprechen", "Deutsch", "Englisch"],
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "multiple_choice",
          content: {
            question: "„Wo wohnst du?“ — Welche Antwort passt?",
            options: [
              { id: "a", text: "Ich wohne in Wien.", correct: true },
              { id: "b", text: "Ich wohnen in Wien.", correct: false },
              { id: "c", text: "Ich in Wien wohne.", correct: false },
            ],
            explanation: "*ich wohne*, Verb an Position 2.",
          },
          grammar: ["regelmaessige-verben-praesens", "w-fragen"],
        },
        {
          itemType: "fill_blank",
          prompt: "Say which language you speak.",
          content: {
            before: "Ich ",
            after: " Englisch.",
            answer: "spreche",
            explanation: "*sprechen → ich **spreche***.",
            commonMistakes: [
              {
                wrong: "sprechen",
                explanation: "Bei „ich“: *sprechen → ich spreche*.",
              },
            ],
          },
          vocab: ["sprechen", "Englisch"],
          grammar: ["regelmaessige-verben-praesens"],
        },
        {
          itemType: "writing_prompt",
          prompt: "Put it together.",
          content: {
            ask: "Say: I come from South Africa and I speak English.",
            answer: "Ich komme aus Südafrika und ich spreche Englisch.",
            acceptable: ["Ich komme aus Südafrika und spreche Englisch."],
            hint: "„und“ joins two sentences.",
          },
        },
        {
          itemType: "speaking",
          content: {
            targetGerman:
              "Ich komme aus Südafrika. Ich spreche Englisch und ein bisschen Deutsch.",
            translation:
              "I'm from South Africa. I speak English and a little German.",
          },
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// A1.2 / A1.3 — structure only (unpublished; lessons authored in later steps)
// ---------------------------------------------------------------------------
function stub(
  slug: string,
  title: string,
): Curriculum["units"][number]["lessons"][number] {
  return {
    slug,
    title,
    description: "",
    lessonType: "vocabulary",
    estimatedMinutes: 6,
    items: [],
  };
}

const meinAlltag: Curriculum["units"][number] = {
  levelCode: "A1",
  slug: "mein-alltag",
  title: "Mein Alltag",
  description: "Familie, Zuhause, Arbeit und Tagesablauf.",
  sortOrder: 2,
  published: false,
  lessons: [
    stub("familie-freunde", "Familie & Freunde"),
    stub("zuhause", "Zuhause"),
    stub("arbeit-schule", "Arbeit & Schule"),
    stub("tagesablauf", "Tagesablauf"),
  ],
};

const imEchtenLeben: Curriculum["units"][number] = {
  levelCode: "A1",
  slug: "im-echten-leben",
  title: "Im echten Leben",
  description: "Essen, Einkaufen, Freizeit und Pläne machen.",
  sortOrder: 3,
  published: false,
  lessons: [
    stub("essen-getraenke", "Essen & Getränke"),
    stub("einkaufen", "Einkaufen"),
    stub("freizeit", "Freizeit"),
    stub("plaene-machen", "Pläne machen"),
  ],
};

export const a1: Curriculum = {
  vocabulary,
  grammarPoints,
  units: [ersteSchritte, meinAlltag, imEchtenLeben],
};
