import Link from "next/link";
import { RasterIcon, ILLUSTRATION } from "@/components/icons/raster-icon";

export const metadata = { title: "Seite nicht gefunden" };

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <RasterIcon src={ILLUSTRATION.nothingFound} className="h-24 w-auto" />
      <div className="space-y-1">
        <h1 className="text-foreground text-lg font-semibold">
          Seite nicht gefunden
        </h1>
        <p className="text-muted-foreground max-w-xs text-sm">
          Diese Seite gibt es nicht (mehr). Zurück zum Start und weiterlernen.
        </p>
      </div>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
