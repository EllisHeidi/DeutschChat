import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/logo";
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
      <Link
        href="/"
        className="inline-flex rounded-sm"
        aria-label="DeutschChat"
      >
        <Logo size="lg" />
      </Link>
      <main className="mt-8 w-full max-w-sm sm:mt-12">{children}</main>
    </div>
  );
}
