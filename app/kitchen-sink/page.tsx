import type { Metadata } from "next";
import { Logo } from "@/components/layout/logo";
import { Section } from "./_kit";
import {
  BadgesSection,
  ButtonsSection,
  ColorsSection,
  InputsSection,
  TypographySection,
} from "./_sections/primitives";
import {
  CardsSection,
  NavigationSection,
  ProgressSection,
  TabsSection,
} from "./_sections/surfaces";
import { LessonUiSection, VocabularySection } from "./_sections/learning";
import {
  AudioSpeakingSection,
  ChatSection,
  CorrectionsSection,
} from "./_sections/conversation";
import {
  EmptyStatesSection,
  ErrorStatesSection,
  LoadingStatesSection,
  RoadmapSection,
} from "./_sections/system";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const toc = [
  { id: "colors", index: "01", title: "Colors", Component: ColorsSection },
  {
    id: "typography",
    index: "02",
    title: "Typography",
    Component: TypographySection,
  },
  { id: "buttons", index: "03", title: "Buttons", Component: ButtonsSection },
  { id: "inputs", index: "04", title: "Inputs", Component: InputsSection },
  { id: "cards", index: "05", title: "Cards", Component: CardsSection },
  { id: "badges", index: "06", title: "Badges", Component: BadgesSection },
  {
    id: "progress",
    index: "07",
    title: "Progress",
    Component: ProgressSection,
  },
  { id: "tabs", index: "08", title: "Tabs", Component: TabsSection },
  {
    id: "navigation",
    index: "09",
    title: "Navigation",
    Component: NavigationSection,
  },
  {
    id: "lesson-ui",
    index: "10",
    title: "Lesson UI",
    Component: LessonUiSection,
  },
  {
    id: "vocabulary",
    index: "11",
    title: "Vocabulary",
    Component: VocabularySection,
  },
  { id: "chat", index: "12", title: "Chat", Component: ChatSection },
  {
    id: "corrections",
    index: "13",
    title: "Corrections",
    Component: CorrectionsSection,
  },
  {
    id: "audio-speaking",
    index: "14",
    title: "Audio & Speaking",
    Component: AudioSpeakingSection,
  },
  {
    id: "roadmap",
    index: "15",
    title: "CEFR Roadmap",
    Component: RoadmapSection,
  },
  {
    id: "empty-states",
    index: "16",
    title: "Empty States",
    Component: EmptyStatesSection,
  },
  {
    id: "loading-states",
    index: "17",
    title: "Loading States",
    Component: LoadingStatesSection,
  },
  {
    id: "error-states",
    index: "18",
    title: "Error States",
    Component: ErrorStatesSection,
  },
];

const sectionDescriptions: Record<string, string> = {
  colors: "Brand palette and the semantic tokens components actually consume.",
  typography: "The Inter-only type scale, from eyebrow to German body text.",
  buttons: "Variants, sizes, states and icon buttons.",
  inputs: "Text, search, password, textarea — with hint and error handling.",
  cards: "Surface, accent, lesson, level, scenario and premium cards.",
  badges: "Level, access, vocabulary status and skill labels.",
  progress: "Linear and circular progress, honest zero states.",
  tabs: "Segmented (Lernen | Chat) and underlined (exam skills).",
  navigation: "Desktop header, mobile header, bottom navigation — visual only.",
  "lesson-ui": "The building blocks of a lesson, as one coherent flow.",
  vocabulary: "Word states, the tap-to-reveal detail card and list cards.",
  chat: "Message bubbles, header, composer and typing indicator.",
  corrections: "Compact, non-blocking correction notes.",
  "audio-speaking":
    "Playback, recording and pronunciation feedback — no real audio.",
  roadmap: "A1 → C1, with A1 free and A2+ shown honestly as Premium.",
  "empty-states": "Intentional empty screens for vocab, chat and progress.",
  "loading-states": "Skeletons that match the real layout.",
  "error-states":
    "Error and offline states, plus the honest daily-activity row.",
};

export default function KitchenSinkPage() {
  return (
    <div className="bg-background min-h-dvh">
      <header className="border-border bg-surface border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-muted-foreground text-sm">Design System</span>
          </div>
          <span className="border-border-strong text-muted-foreground rounded-full border border-dashed px-2.5 py-1 text-xs">
            Interne Review-Seite
          </span>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-10 px-5 py-8">
        <nav
          aria-label="Abschnitte"
          className="sticky top-8 hidden h-fit w-44 shrink-0 lg:block"
        >
          <ol className="space-y-0.5 text-sm">
            {toc.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring flex gap-2 rounded-md px-2 py-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="tabular-nums">{s.index}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main className="min-w-0 flex-1 space-y-14">
          <p className="text-muted-foreground max-w-prose text-sm">
            Alle Komponenten mit realistischen deutschen Beispielen. Die Daten
            hier sind reine Demowerte und werden nicht gespeichert. Fortschritt
            wird bewusst als 0 % / leer dargestellt, solange es keine echten
            Lerndaten gibt.
          </p>

          {toc.map(({ id, index, title, Component }) => (
            <Section
              key={id}
              id={id}
              index={index}
              title={title}
              description={sectionDescriptions[id]}
            >
              <Component />
            </Section>
          ))}
        </main>
      </div>
    </div>
  );
}
