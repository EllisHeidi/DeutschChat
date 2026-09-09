import type { Database, Json } from "@/types/database";

/**
 * Ergonomic aliases over the generated `Database` type.
 *
 *   Tables<"vocabulary">          -> a vocabulary Row
 *   TablesInsert<"conversations"> -> a conversations Insert
 *   Enums<"cefr_level">           -> "A1" | "A2" | ...
 */

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];

export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];

export type TableName = keyof PublicSchema["Tables"];

export type { Database, Json };
