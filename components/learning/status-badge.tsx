import * as React from "react";
import { cn } from "@/lib/utils";
import { ITEM_STATUS, type ItemStatus } from "@/components/learning/icons";
import { RasterIcon, STATUS_ICON } from "@/components/icons/raster-icon";

/**
 * The canonical status marker for a lesson or practice item — completed,
 * in progress, repeat, or new. Uses the custom icon art (which carries its own
 * tinted circle).
 */
export function StatusBadge({
  status,
  className,
}: {
  status: ItemStatus;
  className?: string;
}) {
  return (
    <RasterIcon
      src={STATUS_ICON[status]}
      alt={ITEM_STATUS[status].label}
      className={cn("size-10", className)}
    />
  );
}
