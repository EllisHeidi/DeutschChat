import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLessonForPlay } from "@/lib/learning/curriculum";
import { getOptionalUser } from "@/lib/auth/user";
import { LessonPlayer } from "@/components/learning/lesson-player";

type Params = Promise<{ unitSlug: string; lessonSlug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { unitSlug, lessonSlug } = await params;
  const data = await getLessonForPlay(unitSlug, lessonSlug);
  return { title: data ? data.lesson.title : "Lektion" };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { unitSlug, lessonSlug } = await params;
  const data = await getLessonForPlay(unitSlug, lessonSlug);
  if (!data) notFound();

  const user = await getOptionalUser();
  const persist = Boolean(user && data.lessonId);

  return (
    <LessonPlayer
      lesson={data.lesson}
      vocab={data.vocabByLemma}
      lessonId={data.lessonId}
      vocabLemmas={data.vocabLemmas}
      grammarSlugs={data.grammarSlugs}
      persist={persist}
      continueHref="/learn"
    />
  );
}
