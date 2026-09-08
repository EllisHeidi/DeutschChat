import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

export type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

/**
 * Presentational navigation shells. Routing is wired up in a later step — for
 * now items render as plain anchors and the caller passes `activeKey`.
 */

function DesktopNav({
  items,
  activeKey,
  trailing,
  className,
}: {
  items: NavItem[];
  activeKey?: string;
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-border bg-surface flex h-16 items-center gap-6 border-b px-6",
        className,
      )}
    >
      <a
        href="#"
        className="flex items-center rounded-sm"
        aria-label="DeutschChat Startseite"
      >
        <Logo />
      </a>
      <nav aria-label="Hauptnavigation" className="flex items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.key === activeKey;
          return (
            <a
              key={item.key}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-2">{trailing}</div>
    </header>
  );
}

function MobileHeader({
  title,
  leading,
  trailing,
  className,
}: {
  title?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-border bg-surface flex h-14 items-center gap-3 border-b px-4",
        className,
      )}
    >
      {leading}
      {title ? (
        <span className="text-foreground text-sm font-semibold">{title}</span>
      ) : (
        <Logo size="sm" />
      )}
      <div className="ml-auto flex items-center gap-1">{trailing}</div>
    </header>
  );
}

function BottomNav({
  items,
  activeKey,
  className,
}: {
  items: NavItem[];
  activeKey?: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(
        "border-border bg-surface flex items-stretch border-t pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.key === activeKey;
        return (
          <a
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2 text-[0.6875rem] font-medium transition-colors",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-5" aria-hidden />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export { DesktopNav, MobileHeader, BottomNav };
