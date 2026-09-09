/**
 * Supabase database types for the `public` schema.
 *
 * HAND-AUTHORED to match supabase/migrations/*. Regenerate the canonical
 * version once a project is linked:
 *
 *   npm run db:types
 *
 * (runs `supabase gen types typescript --linked --schema public`). Keep the
 * shape identical to the generator's output so regeneration is a clean diff.
 * This file is excluded from ESLint and Prettier.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chat_scenarios: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          persona_name: string;
          persona_description: string | null;
          setting: string | null;
          goals: Json;
          sort_order: number | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          persona_name: string;
          persona_description?: string | null;
          setting?: string | null;
          goals?: Json;
          sort_order?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          cefr_level?: Database["public"]["Enums"]["cefr_level"];
          persona_name?: string;
          persona_description?: string | null;
          setting?: string | null;
          goals?: Json;
          sort_order?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      conversation_messages: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          sender: Database["public"]["Enums"]["message_sender"];
          content: string;
          sequence: number;
          audio_path: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          sender: Database["public"]["Enums"]["message_sender"];
          content: string;
          sequence: number;
          audio_path?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          sender?: Database["public"]["Enums"]["message_sender"];
          content?: string;
          sequence?: number;
          audio_path?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          scenario_id: string | null;
          mode: Database["public"]["Enums"]["conversation_mode"];
          status: Database["public"]["Enums"]["conversation_status"];
          title: string | null;
          message_count: number;
          started_at: string;
          last_message_at: string | null;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          scenario_id?: string | null;
          mode?: Database["public"]["Enums"]["conversation_mode"];
          status?: Database["public"]["Enums"]["conversation_status"];
          title?: string | null;
          message_count?: number;
          started_at?: string;
          last_message_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          scenario_id?: string | null;
          mode?: Database["public"]["Enums"]["conversation_mode"];
          status?: Database["public"]["Enums"]["conversation_status"];
          title?: string | null;
          message_count?: number;
          started_at?: string;
          last_message_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      grammar_examples: {
        Row: {
          id: string;
          grammar_point_id: string;
          german: string;
          translation: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          grammar_point_id: string;
          german: string;
          translation?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          grammar_point_id?: string;
          german?: string;
          translation?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      grammar_points: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          explanation: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          category: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary?: string | null;
          explanation?: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          category?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string | null;
          explanation?: string | null;
          cefr_level?: Database["public"]["Enums"]["cefr_level"];
          category?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      learner_profiles: {
        Row: {
          id: string;
          current_level: Database["public"]["Enums"]["cefr_level"];
          target_level: Database["public"]["Enums"]["cefr_level"] | null;
          native_language: string;
          ui_locale: string;
          timezone: string | null;
          learning_preferences: Json;
          onboarded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          current_level?: Database["public"]["Enums"]["cefr_level"];
          target_level?: Database["public"]["Enums"]["cefr_level"] | null;
          native_language?: string;
          ui_locale?: string;
          timezone?: string | null;
          learning_preferences?: Json;
          onboarded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          current_level?: Database["public"]["Enums"]["cefr_level"];
          target_level?: Database["public"]["Enums"]["cefr_level"] | null;
          native_language?: string;
          ui_locale?: string;
          timezone?: string | null;
          learning_preferences?: Json;
          onboarded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      learning_observations: {
        Row: {
          id: string;
          user_id: string;
          source: Database["public"]["Enums"]["observation_source"];
          result: Database["public"]["Enums"]["observation_result"];
          skill_key: Database["public"]["Enums"]["skill_key"] | null;
          lesson_item_id: string | null;
          message_id: string | null;
          vocabulary_id: string | null;
          grammar_point_id: string | null;
          detail: Json;
          observed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source: Database["public"]["Enums"]["observation_source"];
          result: Database["public"]["Enums"]["observation_result"];
          skill_key?: Database["public"]["Enums"]["skill_key"] | null;
          lesson_item_id?: string | null;
          message_id?: string | null;
          vocabulary_id?: string | null;
          grammar_point_id?: string | null;
          detail?: Json;
          observed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          source?: Database["public"]["Enums"]["observation_source"];
          result?: Database["public"]["Enums"]["observation_result"];
          skill_key?: Database["public"]["Enums"]["skill_key"] | null;
          lesson_item_id?: string | null;
          message_id?: string | null;
          vocabulary_id?: string | null;
          grammar_point_id?: string | null;
          detail?: Json;
          observed_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      lesson_item_grammar: {
        Row: {
          lesson_item_id: string;
          grammar_point_id: string;
        };
        Insert: {
          lesson_item_id: string;
          grammar_point_id: string;
        };
        Update: {
          lesson_item_id?: string;
          grammar_point_id?: string;
        };
        Relationships: [];
      };
      lesson_item_vocabulary: {
        Row: {
          lesson_item_id: string;
          vocabulary_id: string;
          role: string;
        };
        Insert: {
          lesson_item_id: string;
          vocabulary_id: string;
          role?: string;
        };
        Update: {
          lesson_item_id?: string;
          vocabulary_id?: string;
          role?: string;
        };
        Relationships: [];
      };
      lesson_items: {
        Row: {
          id: string;
          lesson_id: string;
          sort_order: number;
          item_type: Database["public"]["Enums"]["lesson_item_type"];
          prompt: string | null;
          content: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          sort_order: number;
          item_type: Database["public"]["Enums"]["lesson_item_type"];
          prompt?: string | null;
          content?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          sort_order?: number;
          item_type?: Database["public"]["Enums"]["lesson_item_type"];
          prompt?: string | null;
          content?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          unit_id: string;
          slug: string;
          title: string;
          description: string | null;
          lesson_type: Database["public"]["Enums"]["lesson_type"];
          sort_order: number;
          estimated_minutes: number | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          slug: string;
          title: string;
          description?: string | null;
          lesson_type?: Database["public"]["Enums"]["lesson_type"];
          sort_order: number;
          estimated_minutes?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          lesson_type?: Database["public"]["Enums"]["lesson_type"];
          sort_order?: number;
          estimated_minutes?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      levels: {
        Row: {
          code: Database["public"]["Enums"]["cefr_level"];
          name: string;
          description: string | null;
          is_free: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          code: Database["public"]["Enums"]["cefr_level"];
          name: string;
          description?: string | null;
          is_free?: boolean;
          sort_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          code?: Database["public"]["Enums"]["cefr_level"];
          name?: string;
          description?: string | null;
          is_free?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      message_corrections: {
        Row: {
          id: string;
          message_id: string;
          user_id: string;
          correction_kind: Database["public"]["Enums"]["correction_kind"];
          original_text: string;
          corrected_text: string;
          explanation: string | null;
          grammar_point_id: string | null;
          vocabulary_id: string | null;
          learning_observation_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          message_id: string;
          user_id: string;
          correction_kind?: Database["public"]["Enums"]["correction_kind"];
          original_text: string;
          corrected_text: string;
          explanation?: string | null;
          grammar_point_id?: string | null;
          vocabulary_id?: string | null;
          learning_observation_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          message_id?: string;
          user_id?: string;
          correction_kind?: Database["public"]["Enums"]["correction_kind"];
          original_text?: string;
          corrected_text?: string;
          explanation?: string | null;
          grammar_point_id?: string | null;
          vocabulary_id?: string | null;
          learning_observation_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          key: Database["public"]["Enums"]["skill_key"];
          name: string;
          sort_order: number;
        };
        Insert: {
          key: Database["public"]["Enums"]["skill_key"];
          name: string;
          sort_order: number;
        };
        Update: {
          key?: Database["public"]["Enums"]["skill_key"];
          name?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      units: {
        Row: {
          id: string;
          level_code: Database["public"]["Enums"]["cefr_level"];
          slug: string;
          title: string;
          description: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          level_code: Database["public"]["Enums"]["cefr_level"];
          slug: string;
          title: string;
          description?: string | null;
          sort_order: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          level_code?: Database["public"]["Enums"]["cefr_level"];
          slug?: string;
          title?: string;
          description?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_daily_activity: {
        Row: {
          id: string;
          user_id: string;
          activity_date: string;
          lessons_completed: number;
          items_practiced: number;
          minutes_spent: number;
          vocab_reviewed: number;
          messages_sent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_date: string;
          lessons_completed?: number;
          items_practiced?: number;
          minutes_spent?: number;
          vocab_reviewed?: number;
          messages_sent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_date?: string;
          lessons_completed?: number;
          items_practiced?: number;
          minutes_spent?: number;
          vocab_reviewed?: number;
          messages_sent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_grammar_progress: {
        Row: {
          id: string;
          user_id: string;
          grammar_point_id: string;
          status: Database["public"]["Enums"]["grammar_status"];
          strength: number;
          success_count: number;
          error_count: number;
          last_practiced_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          grammar_point_id: string;
          status?: Database["public"]["Enums"]["grammar_status"];
          strength?: number;
          success_count?: number;
          error_count?: number;
          last_practiced_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          grammar_point_id?: string;
          status?: Database["public"]["Enums"]["grammar_status"];
          strength?: number;
          success_count?: number;
          error_count?: number;
          last_practiced_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: Database["public"]["Enums"]["progress_status"];
          completed_item_count: number;
          total_item_count: number;
          score: number | null;
          started_at: string | null;
          completed_at: string | null;
          last_activity_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          status?: Database["public"]["Enums"]["progress_status"];
          completed_item_count?: number;
          total_item_count?: number;
          score?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          status?: Database["public"]["Enums"]["progress_status"];
          completed_item_count?: number;
          total_item_count?: number;
          score?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_skill_progress: {
        Row: {
          id: string;
          user_id: string;
          skill_key: Database["public"]["Enums"]["skill_key"];
          level_code: Database["public"]["Enums"]["cefr_level"];
          score: number;
          activity_count: number;
          last_activity_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          skill_key: Database["public"]["Enums"]["skill_key"];
          level_code: Database["public"]["Enums"]["cefr_level"];
          score?: number;
          activity_count?: number;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          skill_key?: Database["public"]["Enums"]["skill_key"];
          level_code?: Database["public"]["Enums"]["cefr_level"];
          score?: number;
          activity_count?: number;
          last_activity_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_vocabulary_progress: {
        Row: {
          id: string;
          user_id: string;
          vocabulary_id: string;
          status: Database["public"]["Enums"]["vocab_status"];
          strength: number;
          times_seen: number;
          times_correct: number;
          first_learned_at: string | null;
          last_reviewed_at: string | null;
          due_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocabulary_id: string;
          status?: Database["public"]["Enums"]["vocab_status"];
          strength?: number;
          times_seen?: number;
          times_correct?: number;
          first_learned_at?: string | null;
          last_reviewed_at?: string | null;
          due_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          vocabulary_id?: string;
          status?: Database["public"]["Enums"]["vocab_status"];
          strength?: number;
          times_seen?: number;
          times_correct?: number;
          first_learned_at?: string | null;
          last_reviewed_at?: string | null;
          due_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      vocabulary: {
        Row: {
          id: string;
          lemma: string;
          display_form: string;
          translation: string;
          part_of_speech: Database["public"]["Enums"]["part_of_speech"];
          article: string | null;
          plural_form: string | null;
          ipa: string | null;
          example_sentence: string | null;
          example_translation: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          audio_path: string | null;
          notes: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lemma: string;
          display_form: string;
          translation: string;
          part_of_speech: Database["public"]["Enums"]["part_of_speech"];
          article?: string | null;
          plural_form?: string | null;
          ipa?: string | null;
          example_sentence?: string | null;
          example_translation?: string | null;
          cefr_level: Database["public"]["Enums"]["cefr_level"];
          audio_path?: string | null;
          notes?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lemma?: string;
          display_form?: string;
          translation?: string;
          part_of_speech?: Database["public"]["Enums"]["part_of_speech"];
          article?: string | null;
          plural_form?: string | null;
          ipa?: string | null;
          example_sentence?: string | null;
          example_translation?: string | null;
          cefr_level?: Database["public"]["Enums"]["cefr_level"];
          audio_path?: string | null;
          notes?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      cefr_level: "A1" | "A2" | "B1" | "B2" | "C1";
      conversation_mode: "guided" | "normal" | "challenge";
      conversation_status: "active" | "completed" | "abandoned";
      correction_kind:
        | "minor"
        | "grammar"
        | "vocabulary"
        | "pronunciation"
        | "spelling";
      grammar_status: "new" | "learning" | "weak" | "mastered";
      lesson_item_type:
        | "presentation"
        | "flashcard"
        | "multiple_choice"
        | "fill_blank"
        | "listening"
        | "speaking"
        | "writing_prompt"
        | "matching"
        | "info";
      lesson_type:
        | "vocabulary"
        | "grammar"
        | "reading"
        | "listening"
        | "writing"
        | "speaking"
        | "conversation"
        | "review";
      message_sender: "user" | "assistant" | "system";
      observation_result: "correct" | "incorrect" | "partial" | "exposure";
      observation_source: "lesson" | "conversation" | "review" | "exam";
      part_of_speech:
        | "noun"
        | "verb"
        | "adjective"
        | "adverb"
        | "pronoun"
        | "preposition"
        | "conjunction"
        | "article"
        | "numeral"
        | "interjection"
        | "phrase"
        | "other";
      progress_status: "not_started" | "in_progress" | "completed";
      skill_key:
        | "reading"
        | "listening"
        | "writing"
        | "speaking"
        | "vocabulary"
        | "grammar";
      vocab_status: "new" | "learning" | "known" | "needs_review";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
