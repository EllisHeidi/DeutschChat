"use server";

import { revalidatePath } from "next/cache";
import { getOptionalUser } from "@/lib/auth/user";
import { createClient } from "@/lib/supabase/server";
import {
  computeLessonScore,
  dailyActivityForLesson,
  grammarStatusAfterOutcomes,
  nudgeSkillScore,
  vocabStatusAfterExposure,
  type ItemOutcome,
} from "@/lib/learning/progress";
import type { SupportedItemType } from "@/content/curriculum/types";
import type { CefrLevel } from "@/lib/learning/cefr";
import type { Enums } from "@/lib/supabase/types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type LessonItemResult = ItemOutcome & { itemType: SupportedItemType };

export type CompleteLessonInput = {
  lessonId: string | null;
  unitSlug: string;
  lessonSlug: string;
  levelCode: CefrLevel;
  estimatedMinutes: number;
  vocabLemmas: string[];
  grammarSlugs: string[];
  results: LessonItemResult[];
};

export type SaveResult = { saved: boolean; score: number };

const nowIso = () => new Date().toISOString();

function skillForItem(type: SupportedItemType): Enums<"skill_key"> | null {
  switch (type) {
    case "listening":
      return "listening";
    case "speaking":
      return "speaking";
    case "writing_prompt":
      return "writing";
    case "fill_blank":
    case "multiple_choice":
      return "grammar";
    case "matching":
    case "flashcard":
      return "vocabulary";
    default:
      return null;
  }
}

/** Marks a lesson as started (once). No-op when signed out. */
export async function startLesson(
  lessonId: string | null,
): Promise<{ saved: boolean }> {
  const user = await getOptionalUser();
  if (!user || !lessonId || !UUID.test(lessonId)) return { saved: false };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_lesson_progress")
    .select("id, status")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (!existing) {
    await supabase.from("user_lesson_progress").insert({
      user_id: user.id,
      lesson_id: lessonId,
      status: "in_progress",
      started_at: nowIso(),
      last_activity_at: nowIso(),
    });
  } else if (existing.status === "not_started") {
    await supabase
      .from("user_lesson_progress")
      .update({ status: "in_progress", last_activity_at: nowIso() })
      .eq("id", existing.id);
  }
  return { saved: true };
}

/**
 * Records a finished lesson: completion + score, vocab exposure, a daily
 * activity bump and one learning observation per answered item. Returns the
 * score regardless; `saved` is false when there is nobody to save for.
 */
export async function completeLesson(
  input: CompleteLessonInput,
): Promise<SaveResult> {
  const score = computeLessonScore(input.results);

  const user = await getOptionalUser();
  if (!user || !input.lessonId || !UUID.test(input.lessonId)) {
    return { saved: false, score };
  }

  const supabase = await createClient();
  const now = nowIso();
  const day = now.slice(0, 10);
  const total = input.results.length;

  await supabase.from("user_lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: input.lessonId,
      status: "completed",
      completed_item_count: total,
      total_item_count: total,
      score,
      completed_at: now,
      last_activity_at: now,
    },
    { onConflict: "user_id,lesson_id" },
  );

  // vocabulary exposure: unseen / new -> learning
  if (input.vocabLemmas.length > 0) {
    const { data: vocab } = await supabase
      .from("vocabulary")
      .select("id, lemma")
      .in("lemma", input.vocabLemmas);

    for (const v of vocab ?? []) {
      const { data: vp } = await supabase
        .from("user_vocabulary_progress")
        .select("id, status, times_seen")
        .eq("user_id", user.id)
        .eq("vocabulary_id", v.id)
        .maybeSingle();

      if (!vp) {
        await supabase.from("user_vocabulary_progress").insert({
          user_id: user.id,
          vocabulary_id: v.id,
          status: "learning",
          times_seen: 1,
          first_learned_at: now,
          last_reviewed_at: now,
        });
      } else {
        await supabase
          .from("user_vocabulary_progress")
          .update({
            status: vocabStatusAfterExposure(vp.status),
            times_seen: vp.times_seen + 1,
            last_reviewed_at: now,
          })
          .eq("id", vp.id);
      }
    }
  }

  // skill progress: one rolling score per (skill, level) the lesson touched
  const bySkill = new Map<
    Enums<"skill_key">,
    { correct: number; total: number }
  >();
  for (const r of input.results) {
    const skill = skillForItem(r.itemType);
    if (!skill) continue;
    const agg = bySkill.get(skill) ?? { correct: 0, total: 0 };
    agg.total += 1;
    if (r.correct) agg.correct += 1;
    bySkill.set(skill, agg);
  }
  for (const [skill, agg] of bySkill) {
    const skillScore =
      agg.total > 0 ? Math.round((agg.correct / agg.total) * 100) : score;
    const { data: existing } = await supabase
      .from("user_skill_progress")
      .select("id, score, activity_count")
      .eq("user_id", user.id)
      .eq("skill_key", skill)
      .eq("level_code", input.levelCode)
      .maybeSingle();

    if (!existing) {
      await supabase.from("user_skill_progress").insert({
        user_id: user.id,
        skill_key: skill,
        level_code: input.levelCode,
        score: nudgeSkillScore(0, skillScore),
        activity_count: 1,
        last_activity_at: now,
      });
    } else {
      await supabase
        .from("user_skill_progress")
        .update({
          score: nudgeSkillScore(existing.score, skillScore),
          activity_count: existing.activity_count + 1,
          last_activity_at: now,
        })
        .eq("id", existing.id);
    }
  }

  // grammar progress: the lesson's grammar points, judged on this run's answers
  if (input.grammarSlugs.length > 0) {
    const graded = input.results.filter(
      (r) => r.interactive && skillForItem(r.itemType) === "grammar",
    );
    const correct = graded.filter((r) => r.correct).length;
    const incorrect = graded.length - correct;

    const { data: points } = await supabase
      .from("grammar_points")
      .select("id, slug")
      .in("slug", input.grammarSlugs);

    for (const p of points ?? []) {
      const { data: gp } = await supabase
        .from("user_grammar_progress")
        .select("id, status, success_count, error_count")
        .eq("user_id", user.id)
        .eq("grammar_point_id", p.id)
        .maybeSingle();

      if (!gp) {
        await supabase.from("user_grammar_progress").insert({
          user_id: user.id,
          grammar_point_id: p.id,
          status: grammarStatusAfterOutcomes(null, correct, incorrect),
          success_count: correct,
          error_count: incorrect,
          last_practiced_at: now,
        });
      } else {
        await supabase
          .from("user_grammar_progress")
          .update({
            status: grammarStatusAfterOutcomes(
              gp.status,
              gp.success_count + correct,
              gp.error_count + incorrect,
            ),
            success_count: gp.success_count + correct,
            error_count: gp.error_count + incorrect,
            last_practiced_at: now,
          })
          .eq("id", gp.id);
      }
    }
  }

  // learning observations (real item ids only)
  const observations = input.results
    .filter((r) => r.interactive && UUID.test(r.itemId))
    .map((r) => ({
      user_id: user.id,
      source: "lesson" as Enums<"observation_source">,
      result: (r.correct
        ? "correct"
        : "incorrect") as Enums<"observation_result">,
      skill_key: skillForItem(r.itemType),
      lesson_item_id: r.itemId,
      observed_at: now,
    }));
  if (observations.length > 0) {
    await supabase.from("learning_observations").insert(observations);
  }

  // daily activity
  const delta = dailyActivityForLesson(input.results, input.estimatedMinutes);
  const { data: activity } = await supabase
    .from("user_daily_activity")
    .select("id, lessons_completed, items_practiced, minutes_spent")
    .eq("user_id", user.id)
    .eq("activity_date", day)
    .maybeSingle();

  if (!activity) {
    await supabase.from("user_daily_activity").insert({
      user_id: user.id,
      activity_date: day,
      lessons_completed: delta.lessons_completed,
      items_practiced: delta.items_practiced,
      minutes_spent: delta.minutes_spent,
    });
  } else {
    await supabase
      .from("user_daily_activity")
      .update({
        lessons_completed: activity.lessons_completed + delta.lessons_completed,
        items_practiced: activity.items_practiced + delta.items_practiced,
        minutes_spent: activity.minutes_spent + delta.minutes_spent,
      })
      .eq("id", activity.id);
  }

  revalidatePath("/");
  revalidatePath("/learn");
  revalidatePath(`/learn/${input.unitSlug}/${input.lessonSlug}`);
  return { saved: true, score };
}
