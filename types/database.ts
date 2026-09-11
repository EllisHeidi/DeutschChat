export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chat_scenarios: {
        Row: {
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at: string
          description: string | null
          goals: Json
          id: string
          is_published: boolean
          persona_description: string | null
          persona_name: string
          setting: string | null
          slug: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          description?: string | null
          goals?: Json
          id?: string
          is_published?: boolean
          persona_description?: string | null
          persona_name: string
          setting?: string | null
          slug: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          cefr_level?: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          description?: string | null
          goals?: Json
          id?: string
          is_published?: boolean
          persona_description?: string | null
          persona_name?: string
          setting?: string | null
          slug?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          audio_path: string | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json
          sender: Database["public"]["Enums"]["message_sender"]
          sequence: number
          user_id: string
        }
        Insert: {
          audio_path?: string | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json
          sender: Database["public"]["Enums"]["message_sender"]
          sequence: number
          user_id: string
        }
        Update: {
          audio_path?: string | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          sender?: Database["public"]["Enums"]["message_sender"]
          sequence?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          last_message_at: string | null
          message_count: number
          mode: Database["public"]["Enums"]["conversation_mode"]
          scenario_id: string | null
          started_at: string
          status: Database["public"]["Enums"]["conversation_status"]
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          last_message_at?: string | null
          message_count?: number
          mode?: Database["public"]["Enums"]["conversation_mode"]
          scenario_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          last_message_at?: string | null
          message_count?: number
          mode?: Database["public"]["Enums"]["conversation_mode"]
          scenario_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["conversation_status"]
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "chat_scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      grammar_examples: {
        Row: {
          created_at: string
          german: string
          grammar_point_id: string
          id: string
          sort_order: number
          translation: string | null
        }
        Insert: {
          created_at?: string
          german: string
          grammar_point_id: string
          id?: string
          sort_order?: number
          translation?: string | null
        }
        Update: {
          created_at?: string
          german?: string
          grammar_point_id?: string
          id?: string
          sort_order?: number
          translation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grammar_examples_grammar_point_id_fkey"
            columns: ["grammar_point_id"]
            isOneToOne: false
            referencedRelation: "grammar_points"
            referencedColumns: ["id"]
          },
        ]
      }
      grammar_points: {
        Row: {
          category: string | null
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at: string
          explanation: string | null
          id: string
          metadata: Json
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          explanation?: string | null
          id?: string
          metadata?: Json
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          cefr_level?: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          explanation?: string | null
          id?: string
          metadata?: Json
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      learner_profiles: {
        Row: {
          created_at: string
          current_level: Database["public"]["Enums"]["cefr_level"]
          id: string
          learning_preferences: Json
          native_language: string
          onboarded_at: string | null
          target_level: Database["public"]["Enums"]["cefr_level"] | null
          timezone: string | null
          ui_locale: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["cefr_level"]
          id: string
          learning_preferences?: Json
          native_language?: string
          onboarded_at?: string | null
          target_level?: Database["public"]["Enums"]["cefr_level"] | null
          timezone?: string | null
          ui_locale?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["cefr_level"]
          id?: string
          learning_preferences?: Json
          native_language?: string
          onboarded_at?: string | null
          target_level?: Database["public"]["Enums"]["cefr_level"] | null
          timezone?: string | null
          ui_locale?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_observations: {
        Row: {
          created_at: string
          detail: Json
          grammar_point_id: string | null
          id: string
          lesson_item_id: string | null
          message_id: string | null
          observed_at: string
          result: Database["public"]["Enums"]["observation_result"]
          skill_key: Database["public"]["Enums"]["skill_key"] | null
          source: Database["public"]["Enums"]["observation_source"]
          user_id: string
          vocabulary_id: string | null
        }
        Insert: {
          created_at?: string
          detail?: Json
          grammar_point_id?: string | null
          id?: string
          lesson_item_id?: string | null
          message_id?: string | null
          observed_at?: string
          result: Database["public"]["Enums"]["observation_result"]
          skill_key?: Database["public"]["Enums"]["skill_key"] | null
          source: Database["public"]["Enums"]["observation_source"]
          user_id: string
          vocabulary_id?: string | null
        }
        Update: {
          created_at?: string
          detail?: Json
          grammar_point_id?: string | null
          id?: string
          lesson_item_id?: string | null
          message_id?: string | null
          observed_at?: string
          result?: Database["public"]["Enums"]["observation_result"]
          skill_key?: Database["public"]["Enums"]["skill_key"] | null
          source?: Database["public"]["Enums"]["observation_source"]
          user_id?: string
          vocabulary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_observations_grammar_point_id_fkey"
            columns: ["grammar_point_id"]
            isOneToOne: false
            referencedRelation: "grammar_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_observations_lesson_item_id_fkey"
            columns: ["lesson_item_id"]
            isOneToOne: false
            referencedRelation: "lesson_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_observations_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "conversation_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_observations_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_item_grammar: {
        Row: {
          grammar_point_id: string
          lesson_item_id: string
        }
        Insert: {
          grammar_point_id: string
          lesson_item_id: string
        }
        Update: {
          grammar_point_id?: string
          lesson_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_item_grammar_grammar_point_id_fkey"
            columns: ["grammar_point_id"]
            isOneToOne: false
            referencedRelation: "grammar_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_item_grammar_lesson_item_id_fkey"
            columns: ["lesson_item_id"]
            isOneToOne: false
            referencedRelation: "lesson_items"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_item_vocabulary: {
        Row: {
          lesson_item_id: string
          role: string
          vocabulary_id: string
        }
        Insert: {
          lesson_item_id: string
          role?: string
          vocabulary_id: string
        }
        Update: {
          lesson_item_id?: string
          role?: string
          vocabulary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_item_vocabulary_lesson_item_id_fkey"
            columns: ["lesson_item_id"]
            isOneToOne: false
            referencedRelation: "lesson_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_item_vocabulary_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_items: {
        Row: {
          content: Json
          created_at: string
          id: string
          item_type: Database["public"]["Enums"]["lesson_item_type"]
          lesson_id: string
          prompt: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          item_type: Database["public"]["Enums"]["lesson_item_type"]
          lesson_id: string
          prompt?: string | null
          sort_order: number
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          item_type?: Database["public"]["Enums"]["lesson_item_type"]
          lesson_id?: string
          prompt?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_items_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          description: string | null
          estimated_minutes: number | null
          id: string
          is_published: boolean
          lesson_type: Database["public"]["Enums"]["lesson_type"]
          slug: string
          sort_order: number
          title: string
          unit_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          is_published?: boolean
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          slug: string
          sort_order: number
          title: string
          unit_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          is_published?: boolean
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          slug?: string
          sort_order?: number
          title?: string
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          code: Database["public"]["Enums"]["cefr_level"]
          created_at: string
          description: string | null
          is_free: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          description?: string | null
          is_free?: boolean
          name: string
          sort_order: number
          updated_at?: string
        }
        Update: {
          code?: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          description?: string | null
          is_free?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      message_corrections: {
        Row: {
          corrected_text: string
          correction_kind: Database["public"]["Enums"]["correction_kind"]
          created_at: string
          explanation: string | null
          grammar_point_id: string | null
          id: string
          learning_observation_id: string | null
          message_id: string
          original_text: string
          user_id: string
          vocabulary_id: string | null
        }
        Insert: {
          corrected_text: string
          correction_kind?: Database["public"]["Enums"]["correction_kind"]
          created_at?: string
          explanation?: string | null
          grammar_point_id?: string | null
          id?: string
          learning_observation_id?: string | null
          message_id: string
          original_text: string
          user_id: string
          vocabulary_id?: string | null
        }
        Update: {
          corrected_text?: string
          correction_kind?: Database["public"]["Enums"]["correction_kind"]
          created_at?: string
          explanation?: string | null
          grammar_point_id?: string | null
          id?: string
          learning_observation_id?: string | null
          message_id?: string
          original_text?: string
          user_id?: string
          vocabulary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_corrections_grammar_point_id_fkey"
            columns: ["grammar_point_id"]
            isOneToOne: false
            referencedRelation: "grammar_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_corrections_learning_observation_id_fkey"
            columns: ["learning_observation_id"]
            isOneToOne: false
            referencedRelation: "learning_observations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_corrections_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "conversation_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_corrections_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          key: Database["public"]["Enums"]["skill_key"]
          name: string
          sort_order: number
        }
        Insert: {
          key: Database["public"]["Enums"]["skill_key"]
          name: string
          sort_order: number
        }
        Update: {
          key?: Database["public"]["Enums"]["skill_key"]
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          level_code: Database["public"]["Enums"]["cefr_level"]
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          level_code: Database["public"]["Enums"]["cefr_level"]
          slug: string
          sort_order: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          level_code?: Database["public"]["Enums"]["cefr_level"]
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      user_daily_activity: {
        Row: {
          activity_date: string
          created_at: string
          id: string
          items_practiced: number
          lessons_completed: number
          messages_sent: number
          minutes_spent: number
          updated_at: string
          user_id: string
          vocab_reviewed: number
        }
        Insert: {
          activity_date: string
          created_at?: string
          id?: string
          items_practiced?: number
          lessons_completed?: number
          messages_sent?: number
          minutes_spent?: number
          updated_at?: string
          user_id: string
          vocab_reviewed?: number
        }
        Update: {
          activity_date?: string
          created_at?: string
          id?: string
          items_practiced?: number
          lessons_completed?: number
          messages_sent?: number
          minutes_spent?: number
          updated_at?: string
          user_id?: string
          vocab_reviewed?: number
        }
        Relationships: []
      }
      user_grammar_progress: {
        Row: {
          created_at: string
          error_count: number
          grammar_point_id: string
          id: string
          last_practiced_at: string | null
          status: Database["public"]["Enums"]["grammar_status"]
          strength: number
          success_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_count?: number
          grammar_point_id: string
          id?: string
          last_practiced_at?: string | null
          status?: Database["public"]["Enums"]["grammar_status"]
          strength?: number
          success_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_count?: number
          grammar_point_id?: string
          id?: string
          last_practiced_at?: string | null
          status?: Database["public"]["Enums"]["grammar_status"]
          strength?: number
          success_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_grammar_progress_grammar_point_id_fkey"
            columns: ["grammar_point_id"]
            isOneToOne: false
            referencedRelation: "grammar_points"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_progress: {
        Row: {
          completed_at: string | null
          completed_item_count: number
          created_at: string
          id: string
          last_activity_at: string | null
          lesson_id: string
          score: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["progress_status"]
          total_item_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_item_count?: number
          created_at?: string
          id?: string
          last_activity_at?: string | null
          lesson_id: string
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          total_item_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_item_count?: number
          created_at?: string
          id?: string
          last_activity_at?: string | null
          lesson_id?: string
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          total_item_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skill_progress: {
        Row: {
          activity_count: number
          created_at: string
          id: string
          last_activity_at: string | null
          level_code: Database["public"]["Enums"]["cefr_level"]
          score: number
          skill_key: Database["public"]["Enums"]["skill_key"]
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_count?: number
          created_at?: string
          id?: string
          last_activity_at?: string | null
          level_code: Database["public"]["Enums"]["cefr_level"]
          score?: number
          skill_key: Database["public"]["Enums"]["skill_key"]
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_count?: number
          created_at?: string
          id?: string
          last_activity_at?: string | null
          level_code?: Database["public"]["Enums"]["cefr_level"]
          score?: number
          skill_key?: Database["public"]["Enums"]["skill_key"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_vocabulary_progress: {
        Row: {
          created_at: string
          due_at: string | null
          first_learned_at: string | null
          id: string
          last_reviewed_at: string | null
          status: Database["public"]["Enums"]["vocab_status"]
          strength: number
          times_correct: number
          times_seen: number
          updated_at: string
          user_id: string
          vocabulary_id: string
        }
        Insert: {
          created_at?: string
          due_at?: string | null
          first_learned_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          status?: Database["public"]["Enums"]["vocab_status"]
          strength?: number
          times_correct?: number
          times_seen?: number
          updated_at?: string
          user_id: string
          vocabulary_id: string
        }
        Update: {
          created_at?: string
          due_at?: string | null
          first_learned_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          status?: Database["public"]["Enums"]["vocab_status"]
          strength?: number
          times_correct?: number
          times_seen?: number
          updated_at?: string
          user_id?: string
          vocabulary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vocabulary_progress_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary: {
        Row: {
          article: string | null
          audio_path: string | null
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at: string
          display_form: string
          example_sentence: string | null
          example_translation: string | null
          id: string
          ipa: string | null
          lemma: string
          metadata: Json
          notes: string | null
          part_of_speech: Database["public"]["Enums"]["part_of_speech"]
          plural_form: string | null
          translation: string
          updated_at: string
        }
        Insert: {
          article?: string | null
          audio_path?: string | null
          cefr_level: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          display_form: string
          example_sentence?: string | null
          example_translation?: string | null
          id?: string
          ipa?: string | null
          lemma: string
          metadata?: Json
          notes?: string | null
          part_of_speech: Database["public"]["Enums"]["part_of_speech"]
          plural_form?: string | null
          translation: string
          updated_at?: string
        }
        Update: {
          article?: string | null
          audio_path?: string | null
          cefr_level?: Database["public"]["Enums"]["cefr_level"]
          created_at?: string
          display_form?: string
          example_sentence?: string | null
          example_translation?: string | null
          id?: string
          ipa?: string | null
          lemma?: string
          metadata?: Json
          notes?: string | null
          part_of_speech?: Database["public"]["Enums"]["part_of_speech"]
          plural_form?: string | null
          translation?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cefr_level: "A1" | "A2" | "B1" | "B2" | "C1"
      conversation_mode: "guided" | "normal" | "challenge"
      conversation_status: "active" | "completed" | "abandoned"
      correction_kind:
        | "minor"
        | "grammar"
        | "vocabulary"
        | "pronunciation"
        | "spelling"
      grammar_status: "new" | "learning" | "weak" | "mastered"
      lesson_item_type:
        | "presentation"
        | "flashcard"
        | "multiple_choice"
        | "fill_blank"
        | "listening"
        | "speaking"
        | "writing_prompt"
        | "matching"
        | "info"
      lesson_type:
        | "vocabulary"
        | "grammar"
        | "reading"
        | "listening"
        | "writing"
        | "speaking"
        | "conversation"
        | "review"
      message_sender: "user" | "assistant" | "system"
      observation_result: "correct" | "incorrect" | "partial" | "exposure"
      observation_source: "lesson" | "conversation" | "review" | "exam"
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
        | "other"
      progress_status: "not_started" | "in_progress" | "completed"
      skill_key:
        | "reading"
        | "listening"
        | "writing"
        | "speaking"
        | "vocabulary"
        | "grammar"
      vocab_status: "new" | "learning" | "known" | "needs_review"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cefr_level: ["A1", "A2", "B1", "B2", "C1"],
      conversation_mode: ["guided", "normal", "challenge"],
      conversation_status: ["active", "completed", "abandoned"],
      correction_kind: [
        "minor",
        "grammar",
        "vocabulary",
        "pronunciation",
        "spelling",
      ],
      grammar_status: ["new", "learning", "weak", "mastered"],
      lesson_item_type: [
        "presentation",
        "flashcard",
        "multiple_choice",
        "fill_blank",
        "listening",
        "speaking",
        "writing_prompt",
        "matching",
        "info",
      ],
      lesson_type: [
        "vocabulary",
        "grammar",
        "reading",
        "listening",
        "writing",
        "speaking",
        "conversation",
        "review",
      ],
      message_sender: ["user", "assistant", "system"],
      observation_result: ["correct", "incorrect", "partial", "exposure"],
      observation_source: ["lesson", "conversation", "review", "exam"],
      part_of_speech: [
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "article",
        "numeral",
        "interjection",
        "phrase",
        "other",
      ],
      progress_status: ["not_started", "in_progress", "completed"],
      skill_key: [
        "reading",
        "listening",
        "writing",
        "speaking",
        "vocabulary",
        "grammar",
      ],
      vocab_status: ["new", "learning", "known", "needs_review"],
    },
  },
} as const
