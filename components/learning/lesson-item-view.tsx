"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GermanText, Eyebrow } from "@/components/ui/typography";
import { GrammarNote } from "@/components/learning/grammar-note";
import { MultipleChoiceOption } from "@/components/learning/multiple-choice-option";
import { FillInBlank } from "@/components/learning/fill-in-blank";
import { ListeningExercise } from "@/components/learning/listening-exercise";
import { SpeakingExercise } from "@/components/learning/speaking-exercise";
import { VocabularyDetail } from "@/components/vocabulary/vocabulary-detail";
import { VocabTokens } from "@/components/learning/vocab-tokens";
import { RichText } from "@/components/learning/rich-text";
import { AnswerFeedback } from "@/components/learning/answer-feedback";
import { TypeAnswer } from "@/components/learning/type-answer";
import { MatchingExercise } from "@/components/learning/matching-exercise";
import { PlayButton } from "@/components/learning/play-button";
import { checkAnswer, type AnswerCheck } from "@/lib/learning/validate-answer";
import type { PlayableItem } from "@/lib/learning/lesson-content";
import type { VocabularyItem } from "@/components/vocabulary/types";

export type ItemAnswer = { correct: boolean };

type ViewProps = {
  item: PlayableItem;
  vocab: Record<string, VocabularyItem>;
  onAnswer: (answer: ItemAnswer) => void;
};

/**
 * Renders a single lesson item and, for interactive types, reports the result
 * once via `onAnswer`. Presentation / info / flashcard / speaking items are
 * read-and-continue and never call `onAnswer` (the player advances them).
 */
export function LessonItemView({ item, vocab, onAnswer }: ViewProps) {
  return (
    <div className="space-y-4">
      {item.prompt ? (
        <p className="text-muted-foreground text-sm">{item.prompt}</p>
      ) : null}
      <Body item={item} vocab={vocab} onAnswer={onAnswer} />
    </div>
  );
}

function Body({ item, vocab, onAnswer }: ViewProps) {
  switch (item.itemType) {
    case "presentation":
      return <PresentationView item={item} vocab={vocab} />;
    case "info":
      return <InfoView item={item} />;
    case "flashcard":
      return <FlashcardView item={item} vocab={vocab} />;
    case "speaking":
      return <SpeakingView item={item} />;
    case "multiple_choice":
    case "listening":
      return <ChoiceView item={item} onAnswer={onAnswer} />;
    case "fill_blank":
      return <FillBlankView item={item} onAnswer={onAnswer} />;
    case "writing_prompt":
      return <WritingView item={item} onAnswer={onAnswer} />;
    case "matching":
      return <MatchingView item={item} onAnswer={onAnswer} />;
    default:
      return null;
  }
}

/* ------------------------------ read-only ------------------------------ */

function PresentationView({
  item,
  vocab,
}: {
  item: Extract<PlayableItem, { itemType: "presentation" }>;
  vocab: Record<string, VocabularyItem>;
}) {
  const { german, translation, note, tokens, audioText } = item.content;
  return (
    <div className="space-y-4">
      <div className="border-border bg-surface space-y-3.5 rounded-2xl border p-5">
        {tokens && tokens.length > 0 ? (
          <VocabTokens
            german={german}
            tokens={tokens}
            vocab={vocab}
            className="text-[1.6rem] leading-tight font-semibold tracking-tight"
          />
        ) : (
          <GermanText
            as="p"
            className="text-[1.6rem] leading-tight font-semibold tracking-tight"
          >
            {german}
          </GermanText>
        )}
        <p className="text-muted-foreground text-sm">{translation}</p>
        <PlayButton
          size="sm"
          variant="outline"
          label="Satz anhören"
          text={audioText ?? german}
        >
          Anhören
        </PlayButton>
      </div>
      {note ? (
        <p className="text-muted-foreground px-1 text-xs leading-relaxed">
          <span aria-hidden>💡 </span>
          <RichText>{note}</RichText>
        </p>
      ) : null}
      {tokens && tokens.length > 0 ? (
        <p className="text-muted-foreground px-1 text-xs">
          Tippe auf ein <span className="vocab-underline">unterstrichenes</span>{" "}
          Wort für die Bedeutung.
        </p>
      ) : null}
    </div>
  );
}

function InfoView({
  item,
}: {
  item: Extract<PlayableItem, { itemType: "info" }>;
}) {
  const { title, body, examples } = item.content;
  return (
    <GrammarNote title={title}>
      <p className="leading-relaxed">
        <RichText>{body}</RichText>
      </p>
      {examples && examples.length > 0 ? (
        <ul className="mt-2 space-y-0.5">
          {examples.map((ex, i) => (
            <li key={i} className="text-sm">
              <GermanText>{ex.german}</GermanText>
              {ex.translation ? (
                <span className="text-muted-foreground">
                  {" "}
                  — {ex.translation}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </GrammarNote>
  );
}

function FlashcardView({
  item,
  vocab,
}: {
  item: Extract<PlayableItem, { itemType: "flashcard" }>;
  vocab: Record<string, VocabularyItem>;
}) {
  const entry = vocab[item.content.lemma];
  if (!entry) return null;
  return (
    <div className="border-border bg-surface space-y-3.5 rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <Eyebrow className="text-muted-foreground">Neues Wort</Eyebrow>
        <Badge variant="new" size="sm">
          Neu
        </Badge>
      </div>
      <VocabularyDetail item={entry} showSave={false} />
    </div>
  );
}

function SpeakingView({
  item,
}: {
  item: Extract<PlayableItem, { itemType: "speaking" }>;
}) {
  const [recordState, setRecordState] = React.useState<
    "idle" | "recording" | "processing"
  >("idle");

  function cycle() {
    setRecordState("recording");
    setTimeout(() => {
      setRecordState("processing");
      setTimeout(() => setRecordState("idle"), 700);
    }, 1400);
  }

  return (
    <SpeakingExercise
      prompt={item.prompt ?? "Sag den Satz laut."}
      target={item.content.targetGerman}
      targetTranslation={item.content.translation}
      recordState={recordState}
      onRecord={cycle}
    />
  );
}

/* ------------------------------ interactive ------------------------------ */

function ChoiceView({
  item,
  onAnswer,
}: {
  item: Extract<PlayableItem, { itemType: "multiple_choice" | "listening" }>;
  onAnswer: (a: ItemAnswer) => void;
}) {
  const [choiceId, setChoiceId] = React.useState<string | null>(null);
  const answered = choiceId !== null;
  const options = item.content.options;

  function choose(id: string) {
    if (answered) return;
    setChoiceId(id);
    onAnswer({ correct: options.find((o) => o.id === id)?.correct ?? false });
  }

  const list = (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const state = !answered
          ? "default"
          : opt.correct
            ? "correct"
            : opt.id === choiceId
              ? "incorrect"
              : "default";
        return (
          <MultipleChoiceOption
            key={opt.id}
            marker={String.fromCharCode(65 + i)}
            state={state}
            disabled={answered}
            onClick={() => choose(opt.id)}
          >
            {opt.text}
          </MultipleChoiceOption>
        );
      })}
      {answered && item.content.explanation ? (
        <p className="text-muted-foreground pt-1 text-xs">
          💡 <RichText>{item.content.explanation}</RichText>
        </p>
      ) : null}
    </div>
  );

  if (item.itemType === "listening") {
    return (
      <ListeningExercise
        prompt={item.content.question}
        onPlay={() => {}}
        onReplay={() => {}}
      >
        {list}
      </ListeningExercise>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <GermanText as="p" className="font-medium">
          {item.content.question}
        </GermanText>
        {list}
      </CardContent>
    </Card>
  );
}

function FillBlankView({
  item,
  onAnswer,
}: {
  item: Extract<PlayableItem, { itemType: "fill_blank" }>;
  onAnswer: (a: ItemAnswer) => void;
}) {
  const [value, setValue] = React.useState("");
  const [check, setCheck] = React.useState<AnswerCheck | null>(null);
  const c = item.content;

  function submit() {
    if (check || value.trim().length === 0) return;
    const result = checkAnswer(value, {
      answer: c.answer,
      acceptable: c.acceptable,
      explanation: c.explanation,
      commonMistakes: c.commonMistakes,
    });
    setCheck(result);
    onAnswer({ correct: result.status === "correct" });
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <FillInBlank
          label="Lücke ausfüllen"
          before={c.before}
          after={c.after}
          value={value}
          onChange={setValue}
          state={
            check == null
              ? "default"
              : check.status === "correct"
                ? "correct"
                : "incorrect"
          }
        />
        {c.translation ? (
          <p className="text-muted-foreground text-xs">{c.translation}</p>
        ) : null}
        {check == null ? (
          <button
            type="button"
            onClick={submit}
            disabled={value.trim().length === 0}
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Prüfen
          </button>
        ) : (
          <AnswerFeedback check={check} original={value} />
        )}
      </CardContent>
    </Card>
  );
}

function WritingView({
  item,
  onAnswer,
}: {
  item: Extract<PlayableItem, { itemType: "writing_prompt" }>;
  onAnswer: (a: ItemAnswer) => void;
}) {
  const [check, setCheck] = React.useState<AnswerCheck | null>(null);
  const [typed, setTyped] = React.useState("");
  const c = item.content;

  function submit(value: string) {
    setTyped(value);
    const result = checkAnswer(value, {
      answer: c.answer,
      acceptable: c.acceptable,
      explanation: c.explanation,
      commonMistakes: c.commonMistakes,
    });
    setCheck(result);
    onAnswer({ correct: result.status === "correct" });
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <TypeAnswer
          ask={c.ask}
          hint={c.hint}
          answered={check != null}
          invalid={check != null && check.status !== "correct"}
          onSubmit={submit}
        />
        {check != null ? (
          <AnswerFeedback check={check} original={typed} />
        ) : null}
      </CardContent>
    </Card>
  );
}

function MatchingView({
  item,
  onAnswer,
}: {
  item: Extract<PlayableItem, { itemType: "matching" }>;
  onAnswer: (a: ItemAnswer) => void;
}) {
  const [done, setDone] = React.useState(false);
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <MatchingExercise
          pairs={item.content.pairs}
          answered={done}
          onComplete={(allCorrect) => {
            setDone(true);
            onAnswer({ correct: allCorrect });
          }}
        />
        {done ? (
          <p className="text-success text-sm font-medium">Alles zugeordnet!</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
