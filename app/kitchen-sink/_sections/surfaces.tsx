"use client";

import * as React from "react";
import {
  BookOpen,
  Home,
  MessageCircle,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsListUnderline,
  TabsTrigger,
  TabsTriggerUnderline,
} from "@/components/ui/tabs";
import {
  BottomNav,
  DesktopNav,
  MobileHeader,
  type NavItem,
} from "@/components/layout/nav";
import { LessonCard } from "@/components/learning/lesson-card";
import { ContinueLearningCard } from "@/components/learning/continue-learning-card";
import { LevelProgressCard } from "@/components/learning/level-progress-card";
import { SkillProgressList } from "@/components/learning/skill-progress";
import { StatCard } from "@/components/progress/stat-card";
import { ChatScenarioCard } from "@/components/chat/chat-scenario-card";
import { PremiumLockCard } from "@/components/learning/premium-lock-card";
import { Row, Subsection, DemoNote } from "../_kit";
import { demoLessons, demoSkills } from "../_data";

export function CardsSection() {
  return (
    <div className="space-y-5">
      <DemoNote>
        Beispielwerte. Fortschritt ist bewusst 0 % / „noch nicht begonnen“,
        solange keine echten Lerndaten existieren.
      </DemoNote>

      <Subsection title="Standard-Karte & Varianten">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>surface — die Basiskarte</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Für die meisten Inhalte.
            </CardContent>
            <CardFooter>
              <Button size="sm">Aktion</Button>
              <Button size="sm" variant="ghost">
                Abbrechen
              </Button>
            </CardFooter>
          </Card>
          <Card variant="accent">
            <CardHeader>
              <CardTitle>Accent</CardTitle>
              <CardDescription>Lernen &amp; Fortschritt</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Goldakzent für lernbezogene Hervorhebungen.
            </CardContent>
          </Card>
          <Card variant="muted">
            <CardHeader>
              <CardTitle>Muted</CardTitle>
              <CardDescription>zurückgenommene Sekundärfläche</CardDescription>
            </CardHeader>
          </Card>
          <Card variant="outline" interactive>
            <CardHeader>
              <CardTitle>Outline · interactive</CardTitle>
              <CardDescription>mit Hover-Zustand</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Subsection>

      <Subsection title="Continue-Learning-Karte">
        <ContinueLearningCard
          emoji="👋"
          title="Hallo & Begrüßungen"
          unitLabel="A1.1 · Erste Schritte · Lektion 1"
          progress={null}
        />
      </Subsection>

      <Subsection title="Level-Fortschritt">
        <div className="grid gap-3 sm:grid-cols-2">
          <LevelProgressCard
            levelCode="A1"
            levelName="Anfänger"
            completed={0}
            total={12}
            isFree
          />
          <LevelProgressCard
            levelCode="A2"
            levelName="Grundstufe"
            completed={0}
            total={14}
            isFree={false}
          />
        </div>
      </Subsection>

      <Subsection title="Lektions-Karten (Status: abgeschlossen · läuft · verfügbar · gesperrt)">
        <div className="space-y-2.5">
          {demoLessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i + 1} />
          ))}
        </div>
      </Subsection>

      <Subsection title="Fertigkeiten & Statistik-Karten">
        <Card>
          <CardHeader>
            <CardTitle>Fertigkeiten</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillProgressList skills={demoSkills} />
          </CardContent>
        </Card>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard
            icon={BookOpen}
            label="Wörter gespeichert"
            value="—"
            hint="Noch keine"
          />
          <StatCard icon={TrendingUp} label="Serie" value="0 Tage" />
          <StatCard label="Lektionen" value="0 / 12" />
        </div>
      </Subsection>

      <Subsection title="Chat-Szenario-Karte">
        <div className="space-y-2.5">
          <ChatScenarioCard
            title="Im Café bestellen"
            description="Bestelle einen Kaffee und ein Stück Kuchen. Frag nach dem Preis."
            characterName="Lena"
            characterInitials="LE"
            level="A1"
          />
          <ChatScenarioCard
            title="Beim Arzt"
            description="Beschreibe deine Beschwerden und verstehe die Fragen der Ärztin."
            characterName="Dr. Kaya"
            characterInitials="DK"
            level="A2"
            locked
          />
        </div>
      </Subsection>

      <Subsection title="Premium / gesperrte Karte (ehrlich, ohne Dark Pattern)">
        <PremiumLockCard
          levelCode="A2"
          levelName="Grundstufe"
          description="A2 baut auf A1 auf: Vergangenheit, mehr Alltag, längere Gespräche."
        />
      </Subsection>
    </div>
  );
}

export function ProgressSection() {
  return (
    <div className="space-y-6">
      <DemoNote>Alle Werte sind Beispiel-/Demowerte für die Ansicht.</DemoNote>

      <Subsection title="Linearer Fortschritt">
        <div className="max-w-sm space-y-3">
          <Progress value={0} label="A1 Fortschritt (Start)" />
          <Progress value={40} label="Lektion Fortschritt" tone="accent" />
          <Progress value={72} label="Beispiel" tone="primary" />
          <Progress
            value={72}
            label="Beispiel klein"
            size="sm"
            tone="foreground"
          />
        </div>
      </Subsection>

      <Subsection title="Kreisförmiger Fortschritt">
        <Row>
          <CircularProgress value={0} label="Tagesziel">
            <span className="text-xs font-semibold">0%</span>
          </CircularProgress>
          <CircularProgress value={45} label="Wortschatz" tone="accent">
            <span className="text-xs font-semibold">45%</span>
          </CircularProgress>
          <CircularProgress value={80} label="Hören" tone="primary" size={88}>
            <span className="text-sm font-semibold">80%</span>
          </CircularProgress>
        </Row>
      </Subsection>

      <Subsection title="Fertigkeits-Fortschritt (ohne Daten)">
        <div className="max-w-sm">
          <SkillProgressList skills={demoSkills} />
        </div>
      </Subsection>
    </div>
  );
}

const learnChatTabs = (
  <Tabs defaultValue="learn" className="max-w-md">
    <TabsList className="w-full">
      <TabsTrigger value="learn">
        <BookOpen aria-hidden />
        Lernen
      </TabsTrigger>
      <TabsTrigger value="chat">
        <MessageCircle aria-hidden />
        Chat
      </TabsTrigger>
    </TabsList>
    <TabsContent value="learn">
      <p className="text-muted-foreground text-sm">
        Strukturierter A1-Kurs mit Lektionen, Wortschatz und Übungen.
      </p>
    </TabsContent>
    <TabsContent value="chat">
      <p className="text-muted-foreground text-sm">
        Realistische Gespräche mit KI-Charakteren.
      </p>
    </TabsContent>
  </Tabs>
);

export function TabsSection() {
  return (
    <div className="space-y-6">
      <Subsection title="Segmentierte Tabs — Lernen | Chat">
        {learnChatTabs}
      </Subsection>

      <Subsection title="Unterstrichene Tabs — Prüfungsfertigkeiten">
        <Tabs defaultValue="lesen">
          <TabsListUnderline>
            <TabsTriggerUnderline value="lesen">Lesen</TabsTriggerUnderline>
            <TabsTriggerUnderline value="hoeren">Hören</TabsTriggerUnderline>
            <TabsTriggerUnderline value="schreiben">
              Schreiben
            </TabsTriggerUnderline>
            <TabsTriggerUnderline value="sprechen">
              Sprechen
            </TabsTriggerUnderline>
          </TabsListUnderline>
          <TabsContent value="lesen" className="text-muted-foreground text-sm">
            Leseverstehen: kurze Texte, Schilder, Nachrichten.
          </TabsContent>
          <TabsContent value="hoeren" className="text-muted-foreground text-sm">
            Hörverstehen: Ansagen und kurze Dialoge.
          </TabsContent>
          <TabsContent
            value="schreiben"
            className="text-muted-foreground text-sm"
          >
            Schreiben: eine kurze Nachricht verfassen.
          </TabsContent>
          <TabsContent
            value="sprechen"
            className="text-muted-foreground text-sm"
          >
            Sprechen: sich vorstellen, Fragen stellen.
          </TabsContent>
        </Tabs>
      </Subsection>
    </div>
  );
}

const navItems: NavItem[] = [
  { key: "home", label: "Start", icon: Home, href: "#nav" },
  { key: "learn", label: "Lernen", icon: BookOpen, href: "#nav" },
  { key: "chat", label: "Chat", icon: MessageCircle, href: "#nav" },
  { key: "progress", label: "Fortschritt", icon: TrendingUp, href: "#nav" },
];

export function NavigationSection() {
  return (
    <div className="space-y-6">
      <DemoNote>
        Rein visuell — echtes Routing folgt in einem späteren Schritt. Links
        sind Platzhalter.
      </DemoNote>

      <Subsection title="Desktop-Kopfzeile">
        <div className="border-border overflow-hidden rounded-xl border">
          <DesktopNav
            items={navItems}
            activeKey="learn"
            trailing={
              <>
                <IconButton icon={Search} label="Suchen" variant="ghost" />
                <IconButton
                  icon={Settings}
                  label="Einstellungen"
                  variant="ghost"
                />
              </>
            }
          />
        </div>
      </Subsection>

      <Subsection title="Mobile Kopfzeile">
        <div className="border-border max-w-sm overflow-hidden rounded-xl border">
          <MobileHeader
            trailing={
              <IconButton
                icon={Settings}
                label="Einstellungen"
                variant="ghost"
              />
            }
          />
        </div>
      </Subsection>

      <Subsection title="Mobile Bottom-Navigation">
        <div className="border-border mx-auto max-w-sm overflow-hidden rounded-xl border">
          <BottomNav items={navItems} activeKey="home" />
        </div>
      </Subsection>
    </div>
  );
}
