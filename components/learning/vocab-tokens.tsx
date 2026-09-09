"use client";

import * as React from "react";
import { GermanText } from "@/components/ui/typography";
import { WordToken } from "@/components/vocabulary/word-token";
import type { VocabularyItem } from "@/components/vocabulary/types";

type Token = { surface: string; lemma: string };

/**
 * Renders a German sentence with author-marked words as tappable
 * <WordToken>s — the dotted-underline vocabulary interaction. Matching is by
 * exact substring (first occurrence), which is deterministic for authored
 * content.
 */
export function VocabTokens({
  german,
  tokens,
  vocab,
  className,
}: {
  german: string;
  tokens?: Token[];
  vocab: Record<string, VocabularyItem>;
  className?: string;
}) {
  const parts = splitByTokens(german, tokens ?? []);

  return (
    <GermanText
      as="p"
      className={className ?? "text-xl leading-snug font-medium"}
    >
      {parts.map((part, i) =>
        part.type === "text" ? (
          <React.Fragment key={i}>{part.value}</React.Fragment>
        ) : vocab[part.lemma] ? (
          <WordToken key={i} item={vocab[part.lemma]!} surface={part.value} />
        ) : (
          <React.Fragment key={i}>{part.value}</React.Fragment>
        ),
      )}
    </GermanText>
  );
}

type Part =
  | { type: "text"; value: string }
  | { type: "token"; value: string; lemma: string };

function splitByTokens(text: string, tokens: Token[]): Part[] {
  if (tokens.length === 0) return [{ type: "text", value: text }];

  const parts: Part[] = [];
  let rest = text;
  const remaining = [...tokens];

  while (rest.length > 0 && remaining.length > 0) {
    let bestIndex = -1;
    let bestToken: Token | null = null;
    for (const token of remaining) {
      const idx = rest.indexOf(token.surface);
      if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
        bestIndex = idx;
        bestToken = token;
      }
    }
    if (bestIndex === -1 || !bestToken) break;

    if (bestIndex > 0) {
      parts.push({ type: "text", value: rest.slice(0, bestIndex) });
    }
    parts.push({
      type: "token",
      value: bestToken.surface,
      lemma: bestToken.lemma,
    });
    rest = rest.slice(bestIndex + bestToken.surface.length);
    remaining.splice(remaining.indexOf(bestToken), 1);
  }

  if (rest.length > 0) parts.push({ type: "text", value: rest });
  return parts;
}
