"use client";

import * as React from "react";
import { BookOpen, MessageCircle, GraduationCap } from "lucide-react";
import { CefrRoadmap } from "@/components/progress/cefr-roadmap";
import { VocabularyMastery } from "@/components/progress/vocabulary-mastery";
import { DailyActivity } from "@/components/progress/daily-activity";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingCard, LoadingList } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Subsection } from "../_kit";
import { demoRoadmap, demoDailyActivity } from "../_data";

export function RoadmapSection() {
  return (
    <div className="space-y-5">
      <div className="border-border bg-surface max-w-md rounded-xl border p-5">
        <CefrRoadmap levels={demoRoadmap} />
      </div>
      <p className="text-muted-foreground text-sm">
        A1 ist als aktueller Level markiert und kostenlos. A2–C1 sind gesperrt
        und als Premium gekennzeichnet — sichtbar, aber ohne künstlichen Druck.
      </p>
    </div>
  );
}

export function EmptyStatesSection() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <EmptyState
        icon={BookOpen}
        title="Noch keine Wörter"
        description="Gespeicherte Wörter aus Lektionen und Gesprächen erscheinen hier."
        action={
          <Button size="sm" variant="secondary">
            Erste Lektion starten
          </Button>
        }
      />
      <EmptyState
        icon={MessageCircle}
        title="Noch keine Gespräche"
        description="Starte ein Gespräch, um dein Deutsch im Alltag auszuprobieren."
      />
      <EmptyState
        icon={GraduationCap}
        title="Noch kein Fortschritt"
        description="Sobald du deine erste Lektion abschließt, siehst du hier deine Entwicklung."
      />
      <VocabularyMastery counts={{ new: 0, learning: 0, known: 0 }} />
    </div>
  );
}

export function LoadingStatesSection() {
  return (
    <div className="space-y-4">
      <Subsection title="Lektions-Liste lädt">
        <LoadingList rows={3} />
      </Subsection>
      <Subsection title="Inhaltskarte lädt">
        <div className="max-w-md">
          <LoadingCard />
        </div>
      </Subsection>
    </div>
  );
}

export function ErrorStatesSection() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ErrorState onRetry={() => {}} />
        <ErrorState variant="offline" />
      </div>
      <Subsection title="Aktivität heute (alles offen — kein Fake-Fortschritt)">
        <div className="max-w-sm">
          <DailyActivity items={demoDailyActivity} />
        </div>
      </Subsection>
    </div>
  );
}
