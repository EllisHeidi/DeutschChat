import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type IconButtonProps = Omit<ButtonProps, "children" | "size" | "asChild"> & {
  icon: LucideIcon;
  /** Required: icon-only controls must expose an accessible name. */
  label: string;
  size?: "sm" | "md";
};

function IconButton({
  icon: Icon,
  label,
  variant = "ghost",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      aria-label={label}
      title={label}
      className={cn(size === "sm" && "size-9", className)}
      {...props}
    >
      <Icon aria-hidden />
    </Button>
  );
}

export { IconButton, type IconButtonProps };
