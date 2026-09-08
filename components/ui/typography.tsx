import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DeutschChat typographic scale (Inter only, per Phase 1 decision).
 * One component per role so hierarchy stays consistent across the product.
 */

type El<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

function make(
  defaultTag: React.ElementType,
  base: string,
  displayName: string,
) {
  function Component<T extends React.ElementType = typeof defaultTag>({
    as,
    className,
    ...props
  }: El<T>) {
    const Tag = (as ?? defaultTag) as React.ElementType;
    return <Tag className={cn(base, className)} {...props} />;
  }
  Component.displayName = displayName;
  return Component;
}

export const Display = make(
  "h1",
  "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
  "Display",
);

export const PageHeading = make(
  "h1",
  "text-2xl font-semibold tracking-tight text-balance",
  "PageHeading",
);

export const SectionHeading = make(
  "h2",
  "text-lg font-semibold tracking-tight",
  "SectionHeading",
);

export const CardHeading = make(
  "h3",
  "text-base font-semibold tracking-tight",
  "CardHeading",
);

export const Body = make(
  "p",
  "text-sm leading-relaxed text-foreground",
  "Body",
);

export const BodySecondary = make(
  "p",
  "text-sm leading-relaxed text-muted-foreground",
  "BodySecondary",
);

export const Caption = make(
  "p",
  "text-xs leading-normal text-muted-foreground",
  "Caption",
);

export const Eyebrow = make(
  "p",
  "text-xs font-semibold tracking-[0.14em] text-primary uppercase",
  "Eyebrow",
);

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-foreground text-sm font-medium select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

/**
 * German-language text. Sets `lang="de"` so hyphenation, quotation marks and
 * spell-checkers behave; slightly larger tracking aids beginner readability.
 */
export function GermanText({
  className,
  as: Tag = "span",
  ...props
}: React.ComponentProps<"span"> & { as?: React.ElementType }) {
  return (
    <Tag
      lang="de"
      className={cn("text-foreground tracking-[0.005em]", className)}
      {...props}
    />
  );
}
