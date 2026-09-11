"use client";

import * as React from "react";
import { AudioButton } from "@/components/speaking/audio-button";
import {
  RecordButton,
  type RecordState,
} from "@/components/speaking/record-button";
import { PronunciationScore } from "@/components/speaking/pronunciation-score";
import { SpeakingFeedback } from "@/components/speaking/speaking-feedback";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ConversationHeader } from "@/components/chat/conversation-header";
import { CorrectionNote } from "@/components/chat/correction-note";
import { CHARACTER } from "@/components/icons/raster-icon";
import { Row, Subsection, DemoNote } from "../_kit";
import { demoConversation } from "../_data";

export function ChatSection() {
  const [recording, setRecording] = React.useState(false);
  return (
    <div className="space-y-6">
      <DemoNote>
        Statische Beispielkonversation. Keine KI, kein Netzwerk — nur das
        visuelle System.
      </DemoNote>

      <Subsection title="Gesprächs-Kopf">
        <div className="border-border max-w-md overflow-hidden rounded-xl border">
          <ConversationHeader
            characterName="Lena"
            characterInitials="LE"
            scenario="Sich vorstellen · im Sprachcafé"
            mode="guided"
          />
        </div>
      </Subsection>

      <Subsection title="Nachrichten-Verlauf">
        <div className="border-border bg-background mx-auto max-w-md space-y-4 rounded-xl border p-4">
          <ChatMessage
            message={demoConversation[0]!}
            characterInitials="LE"
            characterAvatar={CHARACTER.lena}
            onPlayAudio={() => {}}
          />
          <ChatMessage message={demoConversation[1]!} />
          <ChatMessage
            message={demoConversation[2]!}
            characterInitials="LE"
            characterAvatar={CHARACTER.lena}
            onPlayAudio={() => {}}
          />
          <ChatMessage
            message={demoConversation[3]!}
            footer={
              <CorrectionNote
                kind="minor"
                original="Mir geht gut, danke!"
                suggestion="Mir geht es gut, danke!"
                note="Bei „gehen“ braucht es hier das kleine Wort „es“."
              />
            }
          />
          <TypingIndicator
            characterName="Lena"
            characterInitials="LE"
            characterAvatar={CHARACTER.lena}
          />
        </div>
      </Subsection>

      <Subsection title="Chat-Eingabe (Text · Senden · Mikrofon)">
        <div className="border-border max-w-md overflow-hidden rounded-xl border">
          <ChatInput
            recording={recording}
            onToggleRecording={() => setRecording((r) => !r)}
            onSend={() => {}}
          />
        </div>
      </Subsection>
    </div>
  );
}

export function CorrectionsSection() {
  return (
    <div className="max-w-md space-y-3">
      <DemoNote>
        Korrekturen bleiben kompakt und unterbrechen das Gespräch nicht.
      </DemoNote>
      <CorrectionNote
        kind="minor"
        original="Mir geht gut danke."
        suggestion="Mir geht es gut, danke."
      />
      <CorrectionNote
        kind="grammar"
        original="Ich habe gegangen nach Hause."
        suggestion="Ich bin nach Hause gegangen."
        note="Bewegungsverben bilden das Perfekt mit „sein“."
      />
      <CorrectionNote
        kind="vocabulary"
        original="Ich bekomme ein Foto von dir."
        suggestion="Ich mache ein Foto von dir."
        note="„bekommen“ heißt to receive — hier passt „machen“."
      />
      <CorrectionNote
        kind="pronunciation"
        suggestion="„ö“ in „schön“ — Lippen runden, Zunge vorn."
        note="Klang eher wie „schon“."
      />
    </div>
  );
}

export function AudioSpeakingSection() {
  const [state, setState] = React.useState<RecordState>("idle");

  function cycle() {
    setState((s) =>
      s === "idle" ? "recording" : s === "recording" ? "processing" : "idle",
    );
  }

  return (
    <div className="space-y-6">
      <DemoNote>
        Nur visuelle Komponenten — kein echtes Audio, keine STT/TTS in Phase 1.
      </DemoNote>

      <Subsection title="Audio abspielen / wiederholen">
        <Row>
          <AudioButton onClick={() => {}}>Abspielen</AudioButton>
          <AudioButton state="playing">Pause</AudioButton>
          <AudioButton state="loading">Lädt</AudioButton>
          <AudioButton mode="replay" variant="ghost" />
          <AudioButton size="icon" variant="outline" label="Anhören" />
        </Row>
      </Subsection>

      <Subsection title="Aufnahme-Zustände (klicken zum Durchschalten)">
        <RecordButton state={state} onClick={cycle} />
      </Subsection>

      <Subsection title="Aussprache-Bewertung (Icon + Wort, nicht nur Farbe)">
        <div className="flex flex-col items-start gap-3">
          <PronunciationScore score={88} />
          <PronunciationScore score={64} />
          <PronunciationScore score={38} />
        </div>
      </Subsection>

      <Subsection title="Sprech-Feedback">
        <div className="max-w-md">
          <SpeakingFeedback
            target="Ich komme aus Italien."
            transcript="Ich komme aus Italien."
            score={82}
            notes={[
              "„komme“ gut getroffen.",
              "Bei „Italien“ die Betonung auf die zweite Silbe legen.",
            ]}
            onPlayTarget={() => {}}
          />
        </div>
      </Subsection>
    </div>
  );
}
