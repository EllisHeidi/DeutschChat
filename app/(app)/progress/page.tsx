import { Sparkles } from "lucide-react";
import { getLearnerSnapshot } from "@/lib/learning/dashboard";
import { CEFR_LEVELS } from "@/lib/learning/cefr";
import { cn } from "@/lib/utils";
import { Display } from "@/components/ui/typography";
import { LevelRing } from "@/components/progress/level-ring";
import { FeatureIcon } from "@/components/learning/feature-icon";
import { SkillProgressList } from "@/components/learning/skill-progress";
import { VocabularyMastery } from "@/components/progress/vocabulary-mastery";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";
import type { SkillProgressModel } from "@/components/learning/types";

export const metadata = { title: "Fortschritt" };

export default async function ProgressPage() {
  const s = await getLearnerSnapshot();
  const sk = s.skills;

  const skills: SkillProgressModel[] = [
    { key: "vocabulary", label: "Wortschatz", value: sk?.vocabulary ?? null },
    { key: "grammar", label: "Grammatik", value: sk?.grammar ?? null },
    { key: "listening", label: "Hören", value: sk?.listening ?? null },
    { key: "speaking", label: "Sprechen", value: sk?.speaking ?? null },
    { key: "writing", label: "Schreiben", value: sk?.writing ?? null },
  ];

  return (
    <div className="space-y-7">
      <header className="space-y-1">
        <Display>Fortschritt</Display>
      </header>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CEFR_LEVELS.map((code) => (
          <span
            key={code}
            aria-current={code === s.levelCode ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              code === s.levelCode
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {code}
          </span>
        ))}
      </div>

      <LevelRing
        levelCode={s.levelCode}
        completed={s.completedLessons}
        total={s.totalLessons}
      />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Fertigkeiten</h2>
        <div className="border-border bg-surface rounded-xl border p-5">
          <SkillProgressList skills={skills} />
        </div>
      </section>

      <VocabularyMastery
        counts={s.vocab ?? { new: 0, learning: 0, known: 0 }}
      />

      <div className="border-accent/35 bg-accent/10 flex gap-3 rounded-xl border p-4">
        <FeatureIcon icon={Sparkles} tone="gold" size="sm" />
        <div className="space-y-0.5">
          <p className="text-foreground text-sm font-semibold">
            So entsteht dein Profil
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Jede Übung und jedes Gespräch zählt. DeutschChat merkt sich, welche
            Wörter und welche Grammatik dir noch schwerfallen, und schlägt dir
            passende Wiederholungen vor — ohne Zwang.
          </p>
        </div>
      </div>

      {!s.signedIn ? (
        <div className="border-border-strong bg-muted/30 flex flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center">
          <RasterIcon src={ILLUSTRATION.noProgress} className="h-16 w-auto" />
          <p className="text-muted-foreground max-w-xs text-xs">
            Sobald du angemeldet bist, füllt sich diese Seite mit echten Daten.
          </p>
        </div>
      ) : null}
    </div>
  );
}
