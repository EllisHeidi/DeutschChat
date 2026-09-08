/** Presentation types for the chat UI. Not the eventual persisted shape. */

export type ChatRole = "user" | "assistant";

export type ChatMessageModel = {
  id: string;
  role: ChatRole;
  content: string;
  /** Pre-formatted time label, e.g. "14:32". */
  time?: string;
  /** Assistant messages can be played aloud (visual only in Phase 1). */
  playable?: boolean;
};

export type CorrectionKind =
  "minor" | "grammar" | "vocabulary" | "pronunciation";

export type ConversationMode = "guided" | "normal" | "challenge";
