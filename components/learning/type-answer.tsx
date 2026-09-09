"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * The TYPE activity: the learner produces a full German sentence from an
 * English prompt. Answer checking is deterministic and lives in the parent.
 */
export function TypeAnswer({
  ask,
  hint,
  answered,
  invalid,
  onSubmit,
  className,
}: {
  ask: string;
  hint?: string;
  answered: boolean;
  invalid?: boolean;
  onSubmit: (value: string) => void;
  className?: string;
}) {
  const [value, setValue] = React.useState("");
  const id = React.useId();

  return (
    <form
      className={cn("space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!answered && value.trim().length > 0) onSubmit(value);
      }}
    >
      <label htmlFor={id} className="text-foreground block text-sm font-medium">
        {ask}
      </label>
      <Input
        id={id}
        lang="de"
        autoComplete="off"
        autoCapitalize="sentences"
        spellCheck={false}
        value={value}
        invalid={invalid}
        disabled={answered}
        placeholder="Auf Deutsch schreiben …"
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => setValue(e.target.value)}
        className="text-base"
      />
      {hint && !answered ? (
        <p id={`${id}-hint`} className="text-muted-foreground text-xs">
          Tipp: {hint}
        </p>
      ) : null}
      {!answered ? (
        <Button type="submit" disabled={value.trim().length === 0}>
          Prüfen
        </Button>
      ) : null}
    </form>
  );
}
