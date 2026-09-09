"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LessonHeader } from "@/components/learning/lesson-header";
import { LessonCompletion } from "@/components/learning/lesson-completion";
import {
  LessonItemView,
  type ItemAnswer,
} from "@/components/learning/lesson-item-view";
import {
  itemIsInteractive,
  type PlayableLesson,
} from "@/lib/learning/lesson-content";
import { computeLessonScore } from "@/lib/learning/progress";
import {
  completeLesson,
  startLesson,
  type LessonItemResult,
} from "@/lib/learning/actions";
import type { VocabularyItem } from "@/components/vocabulary/types";

export type LessonPlayerProps = {
  lesson: PlayableLesson;
  vocab: Record<string, VocabularyItem>;
  lessonId: string | null;
  vocabLemmas: string[];
  /** Persist progress to the database (false for demo / signed-out preview). */
  persist: boolean;
  /** Called instead of routing when the lesson finishes (used by the demo). */
  onFinished?: (score: number) => void;
  onExit?: () => void;
  /** Where "Weiter" goes from the completion screen (default: /learn). */
  continueHref?: string;
  className?: string;
};

export function LessonPlayer({
  lesson,
  vocab,
  lessonId,
  vocabLemmas,
  persist,
  onFinished,
  onExit,
  continueHref = "/learn",
  className,
}: LessonPlayerProps) {
  const router = useRouter();
  const total = lesson.items.length;

  const [index, setIndex] = React.useState(0);
  const [answered, setAnswered] = React.useState<ItemAnswer | null>(null);
  const [outcomes, setOutcomes] = React.useState<LessonItemResult[]>([]);
  const [finished, setFinished] = React.useState(false);
  const [savedScore, setSavedScore] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (persist && lessonId) void startLesson(lessonId);
  }, [persist, lessonId]);

  const item = lesson.items[index];
  const interactive = item ? itemIsInteractive(item.itemType) : false;
  const canContinue = !interactive || answered !== null;

  function exit() {
    if (onExit) return onExit();
    router.push("/learn");
  }

  function advance() {
    if (!item || !canContinue) return;
    const next: LessonItemResult = {
      itemId: item.id,
      itemType: item.itemType,
      interactive,
      correct: interactive ? (answered?.correct ?? false) : true,
    };
    const all = [...outcomes, next];
    setOutcomes(all);

    if (index + 1 >= total) {
      setFinished(true);
      if (persist && lessonId) {
        void completeLesson({
          lessonId,
          unitSlug: lesson.unitSlug,
          lessonSlug: lesson.lessonSlug,
          estimatedMinutes: lesson.estimatedMinutes,
          vocabLemmas,
          results: all,
        }).then((r) => setSavedScore(r.score));
      }
      onFinished?.(computeLessonScore(all));
      return;
    }
    setIndex(index + 1);
    setAnswered(null);
  }

  function restart() {
    setIndex(0);
    setAnswered(null);
    setOutcomes([]);
    setFinished(false);
    setSavedScore(null);
  }

  const score = savedScore ?? computeLessonScore(outcomes);
  const correctCount = outcomes.filter(
    (o) => o.interactive && o.correct,
  ).length;
  const interactiveCount = outcomes.filter((o) => o.interactive).length;

  return (
    <div className={cn("bg-background flex min-h-dvh flex-col", className)}>
      <LessonHeader
        unitLabel={`${lesson.levelCode} · ${lesson.unitTitle}`}
        title={lesson.title}
        step={finished ? total : index + 1}
        totalSteps={total}
        onClose={exit}
      />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 sm:px-6">
        {finished ? (
          <div className="flex flex-1 items-center py-8">
            <LessonCompletion
              className="w-full"
              title="Lektion geschafft"
              message={
                interactiveCount > 0
                  ? `${correctCount} von ${interactiveCount} Übungen richtig.`
                  : "Gut gemacht — weiter geht's."
              }
              stats={[
                { label: "Ergebnis", value: `${score}%` },
                { label: "Übungen", value: String(interactiveCount) },
                { label: "Neue Wörter", value: String(vocabLemmas.length) },
              ]}
              primaryLabel={onFinished ? "Von vorne" : "Weiter"}
              onPrimary={() =>
                onFinished ? restart() : router.push(continueHref)
              }
              secondaryLabel={onFinished ? undefined : "Nochmal üben"}
              onSecondary={onFinished ? undefined : restart}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col justify-start pt-6 pb-6 sm:pt-12">
              {item ? (
                <LessonItemView
                  key={item.id}
                  item={item}
                  vocab={vocab}
                  onAnswer={setAnswered}
                />
              ) : null}
            </div>
            <div className="border-border bg-background/95 sticky bottom-0 -mx-4 flex border-t px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
              <Button
                className="w-full"
                disabled={!canContinue}
                onClick={advance}
              >
                {index + 1 >= total ? "Fertig" : "Weiter"}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
