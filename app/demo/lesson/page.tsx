import type { Metadata } from "next";
import { getDemoLesson } from "@/content/curriculum/demo";
import { DemoLessonView } from "./demo-lesson-view";

export const metadata: Metadata = {
  title: "Demo · Sich vorstellen",
  robots: { index: false, follow: false },
};

export default function DemoLessonPage() {
  const { lesson, vocab } = getDemoLesson();
  return <DemoLessonView lesson={lesson} vocab={vocab} />;
}
