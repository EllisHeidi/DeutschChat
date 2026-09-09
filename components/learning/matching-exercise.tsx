"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GermanText } from "@/components/ui/typography";

type Pair = { id: string; left: string; right: string };

/**
 * Tap a German word, then tap its match. Correct pairs lock in; a wrong pair
 * flashes and clears. Completes once every pair is matched.
 */
export function MatchingExercise({
  pairs,
  answered,
  onComplete,
  className,
}: {
  pairs: Pair[];
  answered: boolean;
  onComplete: (allCorrect: boolean) => void;
  className?: string;
}) {
  // Deterministic shuffle (seeded by the pair ids) so server and client agree.
  const rights = React.useMemo(() => seededShuffle(pairs), [pairs]);

  const [matched, setMatched] = React.useState<Set<string>>(new Set());
  const [pickLeft, setPickLeft] = React.useState<string | null>(null);
  const [wrong, setWrong] = React.useState<[string, string] | null>(null);
  const [mistakes, setMistakes] = React.useState(0);

  function pick(side: "left" | "right", id: string) {
    if (answered || matched.has(id)) return;
    if (side === "left") {
      setPickLeft((cur) => (cur === id ? null : id));
      return;
    }
    if (!pickLeft) return;
    if (pickLeft === id) {
      const next = new Set(matched).add(id);
      setMatched(next);
      setPickLeft(null);
      if (next.size === pairs.length) onComplete(mistakes === 0);
    } else {
      setWrong([pickLeft, id]);
      setMistakes((m) => m + 1);
      window.setTimeout(() => {
        setWrong(null);
        setPickLeft(null);
      }, 550);
    }
  }

  return (
    <div className={cn("grid grid-cols-2 gap-2.5", className)}>
      <ul className="space-y-2">
        {pairs.map((p) => (
          <li key={p.id}>
            <Tile
              locked={matched.has(p.id)}
              active={pickLeft === p.id}
              bad={wrong?.[0] === p.id}
              onClick={() => pick("left", p.id)}
            >
              <GermanText>{p.left}</GermanText>
            </Tile>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {rights.map((p) => (
          <li key={p.id}>
            <Tile
              locked={matched.has(p.id)}
              bad={wrong?.[1] === p.id}
              onClick={() => pick("right", p.id)}
            >
              {p.right}
            </Tile>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tile({
  children,
  locked,
  active,
  bad,
  onClick,
}: {
  children: React.ReactNode;
  locked: boolean;
  active?: boolean;
  bad?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      aria-pressed={active}
      className={cn(
        "focus-visible:ring-ring flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-2",
        locked && "border-success/50 bg-success/10 text-muted-foreground",
        !locked && active && "border-primary bg-primary/8",
        !locked && bad && "border-destructive bg-destructive/8",
        !locked &&
          !active &&
          !bad &&
          "border-border-strong bg-surface hover:bg-muted/50",
      )}
    >
      <span>{children}</span>
      {locked ? (
        <Check
          className="text-success size-3.5 shrink-0"
          aria-label="Richtig"
        />
      ) : null}
    </button>
  );
}

/** Fisher–Yates with a PRNG seeded from the pair ids — stable across SSR/hydration. */
function seededShuffle(pairs: Pair[]): Pair[] {
  let seed = 0;
  for (const p of pairs) {
    for (let i = 0; i < p.id.length; i++) {
      seed = (seed * 31 + p.id.charCodeAt(i)) | 0;
    }
  }
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x9e3779b9) | 0;
    let t = Math.imul(seed ^ (seed >>> 16), 0x21f0aaad);
    t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
    return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
  const arr = [...pairs];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}
