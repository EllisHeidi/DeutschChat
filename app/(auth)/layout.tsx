import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { RasterIcon, BRAND } from "@/components/icons/raster-icon";
import { getOptionalUser } from "@/lib/auth/user";

/**
 * Slim, centred frame for the auth screens — no app sidebar / bottom nav.
 * Already signed in? There's nothing to do here.
 */
export const dynamic = "force-dynamic";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getOptionalUser();
  if (user) redirect("/");

  return (
    <div className="bg-background flex min-h-dvh flex-col items-center px-4 py-10 sm:py-16">
      <div className="flex w-full max-w-sm justify-start">
        <Link
          href="/"
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring -ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Zurück
        </Link>
      </div>
      <Link
        href="/"
        className="mt-4 inline-flex rounded-sm"
        aria-label="DeutschChat"
      >
        <RasterIcon
          src={BRAND.wordmark}
          alt="DeutschChat"
          className="h-16 w-auto"
        />
      </Link>
      <main className="mt-8 w-full max-w-sm sm:mt-12">{children}</main>
    </div>
  );
}
