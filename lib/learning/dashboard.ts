import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getOptionalUser } from "@/lib/auth/user";
import { CEFR_LEVEL_NAME, type CefrLevel } from "@/lib/learning/cefr";
import { curriculum } from "@/content/curriculum";
import {
  firstAvailableLesson,
  totalAvailableLessons,
} from "@/lib/learning/curriculum";

export type ContinueTarget = {
  unitSlug: string;
  lessonSlug: string;
  unitTitle: string;
  lessonTitle: string;
  progress: number | null;
};

export type TodayActivity = {
  lessonsCompleted: number;
  itemsPracticed: number;
  vocabReviewed: number;
  minutesSpent: number;
};

export type LearnerSnapshot = {
  supabaseConfigured: boolean;
  signedIn: boolean;
  displayName: string | null;
  levelCode: CefrLevel;
  levelName: string;
  totalLessons: number;
  completedLessons: number;
  /** Consecutive days of activity ending today or yesterday. 0 for new learners. */
  streak: number;
  continue: ContinueTarget | null;
  vocab: { new: number; learning: number; known: number } | null;
  today: TodayActivity | null;
};

/** Ordered list of available lessons across the published curriculum. */
function availableLessonSequence(): {
  unitSlug: string;
  unitTitle: string;
  lessonSlug: string;
  lessonTitle: string;
}[] {
  return curriculum.units
    .filter((u) => u.published)
    .flatMap((u) =>
      u.lessons
        .filter((l) => l.items.length > 0)
        .map((l) => ({
          unitSlug: u.slug,
          unitTitle: u.title,
          lessonSlug: l.slug,
          lessonTitle: l.title,
        })),
    );
}

export async function getLearnerSnapshot(): Promise<LearnerSnapshot> {
  const configured = isSupabaseConfigured();
  const totalLessons = totalAvailableLessons();
  const levelCode: CefrLevel = "A1";
  const base: LearnerSnapshot = {
    supabaseConfigured: configured,
    signedIn: false,
    displayName: null,
    levelCode,
    levelName: CEFR_LEVEL_NAME[levelCode],
    totalLessons,
    completedLessons: 0,
    streak: 0,
    continue: null,
    vocab: null,
    today: null,
  };

  const first = firstAvailableLesson();
  base.continue = first ? { ...first, progress: null } : null;

  const user = await getOptionalUser();
  if (!user) return base;

  const supabase = await createClient();

  const [
    { data: learner },
    { data: profile },
    { data: progressRows },
    { data: vocabRows },
    { data: recentActivity },
  ] = await Promise.all([
    supabase
      .from("learner_profiles")
      .select("current_level")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("user_lesson_progress")
      .select("lesson_id, status")
      .eq("user_id", user.id),
    supabase
      .from("user_vocabulary_progress")
      .select("status")
      .eq("user_id", user.id),
    supabase
      .from("user_daily_activity")
      .select("activity_date")
      .eq("user_id", user.id)
      .order("activity_date", { ascending: false })
      .limit(60),
  ]);

  const current = (learner?.current_level ?? "A1") as CefrLevel;

  const completedLessonIds = new Set(
    (progressRows ?? [])
      .filter((r) => r.status === "completed")
      .map((r) => r.lesson_id),
  );

  // Map completed DB lesson ids back to slugs to walk the sequence.
  const { data: lessonSlugRows } =
    completedLessonIds.size > 0
      ? await supabase
          .from("lessons")
          .select("id, slug")
          .in("id", [...completedLessonIds])
      : { data: [] as { id: string; slug: string }[] };
  const completedSlugs = new Set((lessonSlugRows ?? []).map((r) => r.slug));

  const sequence = availableLessonSequence();
  const next =
    sequence.find((l) => !completedSlugs.has(l.lessonSlug)) ??
    sequence[0] ??
    null;

  const vocab = { new: 0, learning: 0, known: 0 };
  for (const row of vocabRows ?? []) {
    if (row.status === "learning" || row.status === "needs_review")
      vocab.learning += 1;
    else if (row.status === "known") vocab.known += 1;
    else vocab.new += 1;
  }

  const today = new Date().toISOString().slice(0, 10);
  const { data: activity } = await supabase
    .from("user_daily_activity")
    .select("lessons_completed, items_practiced, vocab_reviewed, minutes_spent")
    .eq("user_id", user.id)
    .eq("activity_date", today)
    .maybeSingle();

  return {
    ...base,
    signedIn: true,
    displayName: profile?.display_name ?? null,
    levelCode: current,
    levelName: CEFR_LEVEL_NAME[current],
    completedLessons: [...completedSlugs].filter((s) =>
      sequence.some((l) => l.lessonSlug === s),
    ).length,
    streak: computeStreak((recentActivity ?? []).map((r) => r.activity_date)),
    continue: next ? { ...next, progress: null } : null,
    vocab,
    today: {
      lessonsCompleted: activity?.lessons_completed ?? 0,
      itemsPracticed: activity?.items_practiced ?? 0,
      vocabReviewed: activity?.vocab_reviewed ?? 0,
      minutesSpent: activity?.minutes_spent ?? 0,
    },
  };
}

/** Consecutive days of activity ending today or yesterday. */
function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const set = new Set(dates);
  const day = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  if (!set.has(iso(day))) {
    day.setDate(day.getDate() - 1);
    if (!set.has(iso(day))) return 0;
  }
  let streak = 0;
  while (set.has(iso(day))) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

export type LessonProgressMap = Record<
  string,
  "not_started" | "in_progress" | "completed"
>;

/** Completion status per lesson slug, for the /learn list. Empty when signed out. */
export async function getLessonProgressBySlug(): Promise<LessonProgressMap> {
  const user = await getOptionalUser();
  if (!user) return {};
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, status")
    .eq("user_id", user.id);

  if (!rows || rows.length === 0) return {};

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, slug")
    .in(
      "id",
      rows.map((r) => r.lesson_id),
    );
  const slugById = new Map((lessons ?? []).map((l) => [l.id, l.slug]));

  const out: LessonProgressMap = {};
  for (const row of rows) {
    const slug = slugById.get(row.lesson_id);
    if (slug) out[slug] = row.status;
  }
  return out;
}
