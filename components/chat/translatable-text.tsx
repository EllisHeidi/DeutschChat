"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { translateChatWord } from "@/lib/chat/actions";

/** Splits a token into leading punctuation, the word itself, trailing punctuation. */
const WORD_PATTERN = /^(\P{L}*)(\p{L}[\p{L}'-]*)(\P{L}*)$/u;

type Translation =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; text: string }
  | { status: "error"; message: string };

/** A single tappable word in one of Lena's messages — shows its English translation on click. */
function WordPopover({ word, sentence }: { word: string; sentence: string }) {
  const [state, setState] = React.useState<Translation>({ status: "idle" });
  const cache = React.useRef<Map<string, string>>(new Map());

  async function handleOpenChange(open: boolean) {
    if (!open || state.status === "loading") return;
    const key = word.toLowerCase();
    const cached = cache.current.get(key);
    if (cached) {
      setState({ status: "done", text: cached });
      return;
    }
    setState({ status: "loading" });
    const result = await translateChatWord(word, sentence);
    if (result.ok) {
      cache.current.set(key, result.translation);
      setState({ status: "done", text: result.translation });
    } else {
      setState({ status: "error", message: result.error });
    }
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className="vocab-underline hover:bg-accent/10 focus-visible:ring-ring rounded-sm transition-colors outline-none focus-visible:ring-2"
        aria-label={`${word} – Übersetzung anzeigen`}
      >
        {word}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-auto min-w-24 p-2.5 text-center"
      >
        {state.status === "loading" ? (
          <span className="text-muted-foreground text-xs">Übersetzen …</span>
        ) : state.status === "done" ? (
          <span className="text-foreground text-sm font-medium">
            {state.text}
          </span>
        ) : state.status === "error" ? (
          <span className="text-destructive text-xs">{state.message}</span>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

/** Renders `text` with every German word individually tappable for an English translation. */
export function TranslatableText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const tokens = React.useMemo(() => text.split(/(\s+)/), [text]);

  return (
    <span className={cn("whitespace-pre-wrap", className)} lang="de">
      {tokens.map((token, i) => {
        const match = token.match(WORD_PATTERN);
        if (!match) return <React.Fragment key={i}>{token}</React.Fragment>;
        const [, lead, word, trail] = match;
        return (
          <React.Fragment key={i}>
            {lead}
            <WordPopover word={word!} sentence={text} />
            {trail}
          </React.Fragment>
        );
      })}
    </span>
  );
}
