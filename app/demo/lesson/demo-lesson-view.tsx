"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { LessonPlayer } from "@/components/learning/lesson-player";
import type { PlayableLesson } from "@/lib/learning/lesson-content";
import type { VocabularyItem } from "@/components/vocabulary/types";

/**
 * Standalone demo shell for `/demo/lesson`. No auth, no Supabase, no
 * persistence. One quiet "restart" control for re-recording; nothing else the
 * viewer would notice.
 */
export function DemoLessonView({
  lesson,
  vocab,
}: {
  lesson: PlayableLesson;
  vocab: Record<string, VocabularyItem>;
}) {
  const [runId, setRunId] = React.useState(0);
  const restart = () => setRunId((n) => n + 1);

  return (
    <div className="bg-background relative min-h-dvh">
      <button
        type="button"
        onClick={restart}
        aria-label="Demo neu starten"
        title="Demo neu starten"
        className="border-border bg-surface/80 text-muted-foreground hover:text-foreground focus-visible:ring-ring fixed top-3 right-3 z-50 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <RotateCcw className="size-3.5" aria-hidden />
        Neu
      </button>

      <LessonPlayer
        key={runId}
        lesson={lesson}
        vocab={vocab}
        lessonId={null}
        vocabLemmas={Object.keys(vocab)}
        persist={false}
        onExit={restart}
        onFinished={() => {}}
      />
    </div>
  );
}
