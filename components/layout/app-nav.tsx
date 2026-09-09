"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TaglineLockup } from "@/components/layout/tagline-lockup";
import { RasterIcon, NAV_ICON, BRAND } from "@/components/icons/raster-icon";

type NavEntry = { href: string; label: string };

export const NAV_ITEMS: NavEntry[] = [
  { href: "/", label: "Start" },
  { href: "/learn", label: "Lernen" },
  { href: "/chat", label: "Chat" },
  { href: "/progress", label: "Fortschritt" },
  { href: "/profil", label: "Profil" },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavIcon({
  href,
  active,
  className,
}: {
  href: string;
  active: boolean;
  className?: string;
}) {
  const set = NAV_ICON[href];
  if (!set) return null;
  return (
    <RasterIcon
      src={active ? set.active : set.inactive}
      className={cn(className, !active && "opacity-55")}
    />
  );
}

/** Bottom bar — the primary navigation on phones. */
export function AppBottomNav() {
  const isActive = useActive();
  return (
    <nav
      aria-label="Hauptnavigation"
      className="border-border bg-surface flex shrink-0 items-stretch border-t pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {NAV_ITEMS.map(({ href, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className="focus-visible:ring-ring group relative flex flex-1 flex-col items-center gap-1.5 pt-3.5 pb-3 focus-visible:ring-2 focus-visible:outline-none"
          >
            <span
              className={cn(
                "absolute top-0 h-0.5 w-10 rounded-full transition-colors",
                active ? "bg-primary" : "bg-transparent",
              )}
            />
            <NavIcon href={href} active={active} className="size-8" />
            <span
              className={cn(
                "text-[0.6875rem] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

/** Left sidebar — desktop navigation. */
export function AppSidebar() {
  const isActive = useActive();
  return (
    <aside className="border-border bg-surface hidden w-72 shrink-0 flex-col border-r lg:flex">
      <div className="px-5 py-7">
        <Link
          href="/"
          className="inline-flex rounded-sm"
          aria-label="DeutschChat"
        >
          <RasterIcon
            src={BRAND.wordmark}
            alt="DeutschChat"
            className="h-16 w-auto"
          />
        </Link>
      </div>
      <nav
        aria-label="Hauptnavigation"
        className="flex flex-1 flex-col gap-1 px-4"
      >
        {NAV_ITEMS.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-visible:ring-ring relative flex items-center gap-3 rounded-lg px-3.5 py-3 text-[0.9375rem] font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <NavIcon href={href} active={active} className="size-[1.6rem]" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-border mt-auto border-t px-4 py-6">
        <TaglineLockup size="sm" />
      </div>
    </aside>
  );
}

/** Top bar — the full wordmark lockup, shown on phones. */
export function AppTopBar() {
  return (
    <header className="border-border bg-surface flex h-19 shrink-0 items-center border-b px-4 lg:hidden">
      <Link
        href="/"
        className="inline-flex rounded-sm"
        aria-label="DeutschChat"
      >
        <RasterIcon
          src={BRAND.wordmark}
          alt="DeutschChat"
          className="h-16 w-auto"
        />
      </Link>
    </header>
  );
}
