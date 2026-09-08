/**
 * View-model for vocabulary UI components. This is a *presentation* type — the
 * database-backed shape is defined separately when the learning engine is built.
 */
export type VocabularyStatus = "new" | "learning" | "known";

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  /** Dictionary/base form, e.g. "gehen" for "geht". */
  baseForm?: string;
  partOfSpeech: string;
  /** IPA, e.g. "/ˈhɔʏ̯tə/". */
  pronunciation?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  status: VocabularyStatus;
};
