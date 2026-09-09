import type { Enums } from "@/lib/supabase/types";

/**
 * CEFR level helpers for the app layer.
 *
 * The `levels` table is the data source of truth (display names, descriptions,
 * `is_free`). This module is the *type* + ordering source of truth so the rest
 * of the app never hard-codes level strings.
 */

export type CefrLevel = Enums<"cefr_level">;

/** Ascending order, matching `levels.sort_order`. */
export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;

/** Levels that are free forever. */
export const FREE_CEFR_LEVELS = ["A1"] as const;

/**
 * German display names, mirroring `levels.name`. Kept here too so the app has
 * them before Supabase is connected.
 */
export const CEFR_LEVEL_NAME: Record<CefrLevel, string> = {
  A1: "Anfänger",
  A2: "Grundstufe",
  B1: "Mittelstufe",
  B2: "Fortgeschrittene",
  C1: "Fachkundige Sprachkenntnisse",
};

export function isCefrLevel(value: string): value is CefrLevel {
  return (CEFR_LEVELS as readonly string[]).includes(value);
}

export function isFreeLevel(level: CefrLevel): boolean {
  return (FREE_CEFR_LEVELS as readonly CefrLevel[]).includes(level);
}

export function isPremiumLevel(level: CefrLevel): boolean {
  return !isFreeLevel(level);
}

/** `-1` if a is lower than b, `0` if equal, `1` if higher. */
export function compareCefrLevels(a: CefrLevel, b: CefrLevel): number {
  return Math.sign(CEFR_LEVELS.indexOf(a) - CEFR_LEVELS.indexOf(b));
}

/** The next level up, or `null` at the top. */
export function nextCefrLevel(level: CefrLevel): CefrLevel | null {
  const i = CEFR_LEVELS.indexOf(level);
  return CEFR_LEVELS[i + 1] ?? null;
}
