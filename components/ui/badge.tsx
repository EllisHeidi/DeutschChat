import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border-border-strong bg-muted/60 text-muted-foreground",
        solid: "border-transparent bg-foreground text-background",
        free: "border-success/40 bg-success/12 text-success",
        premium: "border-accent/45 bg-accent/15 text-accent-strong",
        new: "border-primary/40 bg-primary/12 text-primary",
        learning: "border-accent/40 bg-accent/10 text-accent-strong",
        known: "border-border-strong bg-transparent text-muted-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem] [&_svg]:size-3",
        md: "px-2.5 py-0.5 text-xs [&_svg]:size-3.5",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon?: LucideIcon;
  };

function Badge({
  className,
  variant,
  size,
  icon: Icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {Icon ? <Icon aria-hidden /> : null}
      {children}
    </span>
  );
}

export { Badge, badgeVariants, type BadgeProps };
