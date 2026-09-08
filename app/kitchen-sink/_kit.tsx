import * as React from "react";
import { cn } from "@/lib/utils";

/** Layout helpers used only by the kitchen-sink review page. */

export function Section({
  id,
  index,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-5">
      <div className="border-border space-y-1 border-b pb-3">
        <p className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
          {index}
        </p>
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Subsection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-foreground text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

/** A labelled example cell. */
export function Specimen({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? <p className="text-muted-foreground text-xs">{label}</p> : null}
      <div>{children}</div>
    </div>
  );
}

export function Row({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {children}
    </div>
  );
}

/** Demo-data disclaimer chip. */
export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-border-strong bg-muted/40 text-muted-foreground rounded-md border border-dashed px-2.5 py-1.5 text-xs">
      {children}
    </p>
  );
}
