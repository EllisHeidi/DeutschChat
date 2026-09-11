"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AppBottomNav,
  AppSidebar,
  AppTopBar,
} from "@/components/layout/app-nav";
import { ScrollReset } from "@/components/layout/scroll-reset";

const SCROLL_ID = "app-scroll";

/** Routes that manage their own full-height layout and internal scrolling. */
const FULL_BLEED_ROUTES = ["/chat", "/chat/personen"];

/**
 * The authenticated app frame: a sidebar on desktop, a slim wordmark bar +
 * bottom nav on mobile. Full-bleed routes (the lesson player) opt out by not
 * using this shell entirely; a handful of others (Chat) still want the
 * sidebar/bottom nav but need the page itself — not the shared `<main>` — to
 * own scrolling, so they fill the available height instead of the usual
 * padded, page-scrolling column.
 */
export function AppShell({
  children,
  contentClassName,
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  const pathname = usePathname();
  const fullBleed = FULL_BLEED_ROUTES.includes(pathname);

  return (
    <div className="bg-background flex h-dvh overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar />
        <ScrollReset targetId={SCROLL_ID} />
        <main
          id={SCROLL_ID}
          className={cn(
            "min-h-0 flex-1 overflow-x-hidden",
            fullBleed ? "overflow-y-hidden" : "overflow-y-auto",
          )}
        >
          {fullBleed ? (
            <div className={cn("flex h-full flex-col", contentClassName)}>
              {children}
            </div>
          ) : (
            <div
              className={cn(
                "mx-auto w-full max-w-xl px-4 pt-6 pb-12 sm:px-6 lg:max-w-2xl lg:px-8 lg:pt-12 lg:pb-20",
                contentClassName,
              )}
            >
              {children}
            </div>
          )}
        </main>
        <AppBottomNav />
      </div>
    </div>
  );
}
