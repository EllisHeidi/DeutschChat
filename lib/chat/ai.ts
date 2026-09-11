import "server-only";

import OpenAI from "openai";
import { env } from "@/env";
import type { CefrLevel } from "@/lib/learning/cefr";
import { buildSystemPrompt } from "@/lib/chat/prompt";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type GenerateReplyInput = {
  /** Prior turns, oldest first. Already trimmed to a reasonable window. */
  history: ChatTurn[];
  learnerLevel: CefrLevel;
};

/**
 * Thrown when no AI provider is configured (no `OPENAI_API_KEY`). Callers
 * must show a clear, honest error state — never a fake or hardcoded reply.
 */
export class AiNotConfiguredError extends Error {
  constructor() {
    super("No AI provider is configured for Chat.");
    this.name = "AiNotConfiguredError";
  }
}

/**
 * DeutschChat's conversation model. Responses API only (not Chat
 * Completions, not Realtime) — see docs/STEP-6B-CHECKPOINT.md for why this
 * specific model was chosen.
 */
const MODEL = "gpt-5.6-luna";

function getClient(): OpenAI {
  if (!env.OPENAI_API_KEY) throw new AiNotConfiguredError();
  return new OpenAI({ apiKey: env.OPENAI_API_KEY });
}

/**
 * Generates the assistant's next turn via the OpenAI Responses API. This is
 * the one seam a provider plugs into — nothing else in the app knows which
 * provider is used or how the prompt is built.
 */
export async function generateReply(
  input: GenerateReplyInput,
): Promise<string> {
  const client = getClient();

  const response = await client.responses.create({
    model: MODEL,
    instructions: buildSystemPrompt(input.learnerLevel),
    input: input.history.map((turn) => ({
      role: turn.role,
      content: turn.content,
    })),
  });

  const text = response.output_text?.trim();
  if (!text) throw new Error("OpenAI returned an empty response.");
  return text;
}

/**
 * Translates a single German word/phrase to English, using the sentence it
 * appeared in for context (handles inflection and idiom better than a
 * static dictionary would). Backs the tap-to-translate feature on Lena's
 * messages in Chat — freeform AI text has no fixed vocabulary list to look
 * up against, so this reuses the same provider rather than a second system.
 */
export async function translateWord(
  word: string,
  sentence: string,
): Promise<string> {
  const client = getClient();

  const response = await client.responses.create({
    model: MODEL,
    instructions:
      "You translate a single German word or short phrase to English for a language learner. " +
      "Use the surrounding German sentence only as context to pick the right sense. " +
      "Reply with ONLY the English translation — a word or short phrase, no punctuation, no quotes, no explanation.",
    input: `Satz: "${sentence}"\nWort: "${word}"`,
  });

  const text = response.output_text?.trim();
  if (!text) throw new Error("OpenAI returned an empty response.");
  return text;
}
