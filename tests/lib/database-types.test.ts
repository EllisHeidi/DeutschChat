import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  Enums,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/types";
import type { CEFR_LEVELS } from "@/lib/learning/cefr";
import type { VOCAB_STATUSES } from "@/lib/learning/mastery";

describe("generated database types", () => {
  it("keeps the app-layer enums in sync with the DB enums", () => {
    expectTypeOf<Enums<"cefr_level">>().toEqualTypeOf<
      (typeof CEFR_LEVELS)[number]
    >();
    expectTypeOf<Enums<"vocab_status">>().toEqualTypeOf<
      (typeof VOCAB_STATUSES)[number]
    >();
  });

  it("exposes Row / Insert / Update shapes per table", () => {
    expectTypeOf<Tables<"vocabulary">>()
      .toHaveProperty("lemma")
      .toEqualTypeOf<string>();
    expectTypeOf<Tables<"vocabulary">["cefr_level"]>().toEqualTypeOf<
      Enums<"cefr_level">
    >();

    // Insert: real data required, server-defaulted columns optional.
    expectTypeOf<
      TablesInsert<"conversations">["user_id"]
    >().toEqualTypeOf<string>();
    expectTypeOf<TablesInsert<"conversations">["id"]>().toEqualTypeOf<
      string | undefined
    >();

    // Update: everything optional.
    expectTypeOf<TablesUpdate<"profiles">>().toEqualTypeOf<{
      id?: string;
      display_name?: string | null;
      avatar_url?: string | null;
      created_at?: string;
      updated_at?: string;
    }>();
  });

  it("is a runtime no-op module (types only)", () => {
    expect(true).toBe(true);
  });
});
