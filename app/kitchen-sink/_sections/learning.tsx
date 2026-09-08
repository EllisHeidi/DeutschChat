"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GermanText } from "@/components/ui/typography";
import { LessonHeader } from "@/components/learning/lesson-header";
import { LessonStepIndicator } from "@/components/learning/lesson-step-indicator";
import { GermanSentence } from "@/components/learning/german-sentence";
import { ExampleSentence } from "@/components/learning/example-sentence";
import { GrammarNote } from "@/components/learning/grammar-note";
import { MultipleChoiceOption } from "@/components/learning/multiple-choice-option";
import { FillInBlank } from "@/components/learning/fill-in-blank";
import { ListeningExercise } from "@/components/learning/listening-exercise";
import { SpeakingExercise } from "@/components/learning/speaking-exercise";
import { LessonCompletion } from "@/components/learning/lesson-completion";
import { WordToken } from "@/components/vocabulary/word-token";
import { VocabularyCard } from "@/components/vocabulary/vocabulary-card";
import { VocabularyDetail } from "@/components/vocabulary/vocabulary-detail";
import { Subsection, DemoNote } from "../_kit";
import { demoVocab } from "../_data";

export function LessonUiSection() {
  const [choice, setChoice] = React.useState<string | null>(null);
  const [blank, setBlank] = React.useState("");
  const correct = "komme";

  return (
    <div className="space-y-6">
      <Subsection title="Lektions-Kopf & Schrittanzeige">
        <div className="border-border overflow-hidden rounded-xl border">
          <LessonHeader
            unitLabel="A1.1 · Erste Schritte"
            title="Sich vorstellen"
            step={2}
            totalSteps={6}
          />
        </div>
        <LessonStepIndicator total={6} current={2} className="max-w-sm" />
      </Subsection>

      <Subsection title="Deutscher Satz, Übersetzung & Beispiel">
        <Card>
          <CardContent className="space-y-4 p-5">
            <GermanSentence translation="My name is Sofia and I come from Italy.">
              Ich heiße Sofia und ich komme aus Italien.
            </GermanSentence>
            <ExampleSentence
              german="Woher kommst du?"
              translation="Where do you come from?"
              onPlayAudio={() => {}}
            />
          </CardContent>
        </Card>
      </Subsection>

      <Subsection title="Wortschatz-Hervorhebung im Satz">
        <Card>
          <CardContent className="p-5 text-lg leading-loose">
            <GermanText>
              <WordToken item={demoVocab.wohnen!} surface="Wohnst" /> du{" "}
              <WordToken item={demoVocab.heute!} /> bei deiner{" "}
              <WordToken item={demoVocab.Familie!} surface="Familie" />?
            </GermanText>
          </CardContent>
        </Card>
        <DemoNote>
          Bekannte Wörter ohne Unterstreichung, Lernwörter gepunktet, neue
          Wörter gepunktet + „Neu“. Tippen öffnet die Wort-Karte.
        </DemoNote>
      </Subsection>

      <Subsection title="Grammatik-Erklärung">
        <GrammarNote title="Verben im Präsens">
          Im Deutschen endet das Verb bei <strong>ich</strong> meist auf{" "}
          <strong>-e</strong>: ich komm<strong>e</strong>, ich heiß
          <strong>e</strong>, ich wohn<strong>e</strong>.
        </GrammarNote>
      </Subsection>

      <Subsection title="Multiple Choice (Standard · ausgewählt · richtig · falsch)">
        <div className="max-w-md space-y-2">
          <MultipleChoiceOption
            marker="A"
            state={choice === "a" ? "selected" : "default"}
            onClick={() => setChoice("a")}
          >
            Ich heiße Sofia.
          </MultipleChoiceOption>
          <MultipleChoiceOption marker="B" state="correct">
            Ich komme aus Italien.
          </MultipleChoiceOption>
          <MultipleChoiceOption marker="C" state="incorrect">
            Ich kommst aus Italien.
          </MultipleChoiceOption>
          <MultipleChoiceOption marker="D" disabled>
            Deaktiviert
          </MultipleChoiceOption>
        </div>
      </Subsection>

      <Subsection title="Lücke füllen">
        <Card>
          <CardContent className="space-y-3 p-5">
            <FillInBlank
              label="Verb einsetzen"
              before="Ich "
              after=" aus Italien."
              value={blank}
              onChange={setBlank}
              state={
                blank.length === 0
                  ? "default"
                  : blank.trim().toLowerCase() === correct
                    ? "correct"
                    : "incorrect"
              }
            />
            <p className="text-muted-foreground text-xs">Lösung: „{correct}“</p>
          </CardContent>
        </Card>
      </Subsection>

      <Subsection title="Hörübung">
        <ListeningExercise
          prompt="Was sagt die Person? Wähle die richtige Antwort."
          onPlay={() => {}}
          onReplay={() => {}}
        >
          <MultipleChoiceOption marker="A">Guten Morgen.</MultipleChoiceOption>
          <MultipleChoiceOption marker="B">Gute Nacht.</MultipleChoiceOption>
        </ListeningExercise>
      </Subsection>

      <Subsection title="Sprechübung">
        <SpeakingExercise
          prompt="Stell dich vor. Sag deinen Namen und woher du kommst."
          target="Ich heiße Sofia und ich komme aus Italien."
          targetTranslation="My name is Sofia and I come from Italy."
          onPlayTarget={() => {}}
        />
      </Subsection>

      <Subsection title="Abschluss-Zustand">
        <LessonCompletion
          stats={[
            { label: "Übungen", value: "8" },
            { label: "Neue Wörter", value: "5" },
            { label: "Genauigkeit", value: "88 %" },
          ]}
          primaryLabel="Weiter zu Lektion 3"
          secondaryLabel="Wiederholen"
        />
      </Subsection>
    </div>
  );
}

export function VocabularySection() {
  const [saved, setSaved] = React.useState(false);
  return (
    <div className="space-y-6">
      <Subsection title="Wort-Zustände inline">
        <Card>
          <CardContent className="p-5 text-lg leading-loose">
            <GermanText>
              Das ist meine{" "}
              <WordToken item={demoVocab.Familie!} surface="Familie" />. Wir{" "}
              <WordToken item={demoVocab.wohnen!} surface="wohnen" /> zusammen
              und <WordToken item={demoVocab.heute!} /> kochen wir zusammen.
            </GermanText>
          </CardContent>
        </Card>
        <div className="text-muted-foreground grid gap-2 text-xs sm:grid-cols-3">
          <p>
            <span className="text-foreground font-medium">wohnen</span> —
            bekannt, keine Unterstreichung
          </p>
          <p>
            <span className="vocab-underline text-foreground font-medium">
              Familie
            </span>{" "}
            — am Lernen, gepunktet
          </p>
          <p>
            <span className="vocab-underline text-foreground font-medium">
              heute
            </span>
            <sup className="text-primary"> Neu</sup> — neu, gepunktet + Marker
          </p>
        </div>
      </Subsection>

      <Subsection title="Wort-Detailkarte (Inhalt des Popovers)">
        <div className="border-border bg-surface max-w-xs rounded-xl border p-4">
          <VocabularyDetail
            item={demoVocab.heute!}
            saved={saved}
            onToggleSave={() => setSaved((s) => !s)}
            onPlayAudio={() => {}}
          />
        </div>
      </Subsection>

      <Subsection title="Wortschatz-Listenkarten">
        <div className="space-y-2.5">
          <VocabularyCard item={demoVocab.heute!} onPlayAudio={() => {}} />
          <VocabularyCard item={demoVocab.Familie!} onPlayAudio={() => {}} />
          <VocabularyCard item={demoVocab.wohnen!} onPlayAudio={() => {}} />
        </div>
      </Subsection>
    </div>
  );
}
