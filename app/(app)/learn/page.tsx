import { Lock } from "lucide-react";
import { getCurriculumOverview } from "@/lib/learning/curriculum";
import { getLessonProgressBySlug } from "@/lib/learning/dashboard";
import { CEFR_LEVEL_NAME } from "@/lib/learning/cefr";
import { Badge } from "@/components/ui/badge";
import { Display } from "@/components/ui/typography";
import { LessonLink } from "@/components/learning/lesson-link";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

export const metadata = { title: "Lernen" };

export default async function LearnPage() {
  const units = getCurriculumOverview();
  const progress = await getLessonProgressBySlug();
  const a1Units = units.filter((u) => u.levelCode === "A1");

  return (
    <div className="space-y-8">
      <header className="border-border relative overflow-hidden rounded-2xl border">
        <RasterIcon
          src={ILLUSTRATION.berlin}
          className="absolute inset-0 h-[calc(100%+1.5rem)] w-full -translate-y-6 object-cover object-top"
        />
        <div className="from-surface/85 via-surface/72 to-surface/82 absolute inset-0 bg-linear-to-br" />
        <div className="relative space-y-2 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              A1 · {CEFR_LEVEL_NAME.A1}
            </span>
            <Badge variant="free" size="sm">
              Kostenlos
            </Badge>
          </div>
          <Display>Deine Deutsch-Reise</Display>
          <p className="text-foreground/70 max-w-sm text-sm">
            Kurze Lektionen zum echten Sprechen. A1 ist und bleibt kostenlos.
          </p>
        </div>
      </header>

      {a1Units.map((unit, ui) => (
        <section key={unit.slug} className="space-y-3.5">
          <div className="flex items-baseline justify-between gap-2">
            <div className="space-y-0.5">
              <h2 className="text-lg font-semibold tracking-tight">
                A1.{ui + 1} · {unit.title}
              </h2>
              {unit.description ? (
                <p className="text-muted-foreground text-xs">
                  {unit.description}
                </p>
              ) : null}
            </div>
            {!unit.published ? (
              <Badge variant="neutral" size="sm" icon={Lock}>
                Bald
              </Badge>
            ) : (
              <span className="text-muted-foreground shrink-0 text-xs">
                {unit.lessons.filter((l) => l.available).length} Lektionen
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {unit.lessons.map((lesson, li) => {
              const state = lesson.available
                ? (progress[lesson.slug] ?? "not_started")
                : "locked";
              return (
                <LessonLink
                  key={lesson.slug}
                  index={li + 1}
                  title={lesson.title}
                  subtitle={lesson.description}
                  href={
                    lesson.available
                      ? `/lesson/${unit.slug}/${lesson.slug}`
                      : undefined
                  }
                  status={state}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
