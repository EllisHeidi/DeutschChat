import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AppBottomNav,
  AppSidebar,
  AppTopBar,
} from "@/components/layout/app-nav";

/**
 * The authenticated app frame: a sidebar on desktop, a slim wordmark bar +
 * bottom nav on mobile. Full-bleed routes (the lesson player) opt out by not
 * using this shell.
 */
export function AppShell({
  children,
  contentClassName,
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="bg-background flex h-dvh overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div
            className={cn(
              "mx-auto w-full max-w-xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-12 lg:pb-20",
              contentClassName,
            )}
          >
            {children}
          </div>
        </main>
        <AppBottomNav />
      </div>
    </div>
  );
}
