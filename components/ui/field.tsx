import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ui/typography";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Wraps a control with an associated label, optional hint and an error message.
 * Pass matching `id` / `aria-describedby` on the control:
 *   <Field label="E-Mail" htmlFor="email" error={err}>
 *     <Input id="email" aria-describedby="email-error" invalid={!!err} />
 *   </Field>
 */
function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="text-primary" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </FieldLabel>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-muted-foreground text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-destructive flex items-center gap-1.5 text-xs font-medium"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { Field, type FieldProps };
