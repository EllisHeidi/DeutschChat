"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * The app frame scrolls inside `<main>`, not the window, so Next's automatic
 * scroll restoration doesn't apply. Reset that container to the top whenever the
 * route changes.
 */
export function ScrollReset({ targetId }: { targetId: string }) {
  const pathname = usePathname();

  React.useEffect(() => {
    const el = document.getElementById(targetId);
    el?.scrollTo({ top: 0, left: 0 });
  }, [pathname, targetId]);

  return null;
}
