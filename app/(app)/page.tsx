import Link from "next/link";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLearnerSnapshot } from "@/lib/learning/dashboard";
import { firstAvailableLesson } from "@/lib/learning/curriculum";
import { isFreeLevel } from "@/lib/learning/cefr";
import { SectionHeading } from "@/components/ui/typography";
import { LevelHeroCard } from "@/components/learning/level-hero-card";
import { TodayPanel } from "@/components/learning/today-panel";
import { RecommendedConversation } from "@/components/learning/recommended-conversation";
import { VocabularyMastery } from "@/components/progress/vocabulary-mastery";
import { CHARACTER } from "@/components/icons/raster-icon";
import {
  ConnectionErrorNotice,
  SetupNotice,
  SignInNotice,
} from "@/components/learning/connection-notice";

export const metadata = { title: "Start" };

function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return "Guten Morgen";
  if (h < 18) return "Guten Tag";
  return "Guten Abend";
}

export default async function DashboardPage() {
  const s = await getLearnerSnapshot();
  const first = firstAvailableLesson();
  const continueHref = first
    ? `/lesson/${first.unitSlug}/${first.lessonSlug}`
    : "/learn";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-6 left-1/2 z-0 h-[calc(100%+7.5rem)] min-h-dvh w-screen -translate-x-1/2 overflow-hidden lg:-top-12 lg:h-[calc(100%+11rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- experimental background */}
        <img
          src="/backgrounds/flag-germany.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/45" />
      </div>

      <div className="relative z-10 xl:mx-[calc((38rem-min(64rem,calc(100vw-21rem)))/2)] xl:w-[min(64rem,calc(100vw-21rem))]">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-0.5">
            <h1 className="text-xl font-semibold tracking-tight text-balance text-white">
              {greeting()}
              {s.displayName ? `, ${s.displayName}` : ""}! 👋
            </h1>
            <p className="text-sm text-white/70">Bereit für Deutsch?</p>
          </div>
          <span
            className="border-border bg-surface text-foreground inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-semibold"
            title={`${s.streak}-Tage-Serie`}
          >
            <Flame
              className={cn(
                "size-4",
                s.streak > 0 ? "text-primary" : "text-muted-foreground",
              )}
              aria-hidden
            />
            {s.streak}
          </span>
        </header>

        <div className="mt-7 space-y-7 lg:mt-8 xl:grid xl:grid-cols-3 xl:items-start xl:gap-7 xl:space-y-0">
          <div className="space-y-7 xl:col-span-2">
            {!s.supabaseConfigured ? (
              <SetupNotice />
            ) : s.supabaseError ? (
              <ConnectionErrorNotice />
            ) : !s.signedIn ? (
              <SignInNotice />
            ) : null}

            <LevelHeroCard
              levelCode={s.levelCode}
              levelName={s.levelName}
              completed={s.completedLessons}
              total={s.totalLessons}
              isFree={isFreeLevel(s.levelCode)}
              continueHref={continueHref}
            />

            <section className="space-y-3">
              <SectionHeading className="text-white">Heute</SectionHeading>
              <TodayPanel
                itemsPracticed={s.today?.itemsPracticed ?? 0}
                vocabReviewed={s.today?.vocabReviewed ?? 0}
                minutesSpent={s.today?.minutesSpent ?? 0}
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-baseline justify-between">
                <SectionHeading className="text-white">
                  Empfohlene Konversation
                </SectionHeading>
                <Link
                  href="/chat/personen"
                  className="text-xs font-medium text-white/70 hover:text-white"
                >
                  Alle
                </Link>
              </div>
              <RecommendedConversation
                title="Im Sprachcafé"
                meta="A1 · Sich vorstellen"
                characterName="Lena"
                characterInitials="LE"
                characterAvatar={CHARACTER.lena}
              />
            </section>
          </div>

          <div className="space-y-7">
            <VocabularyMastery
              counts={s.vocab ?? { new: 0, learning: 0, known: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
