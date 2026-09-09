"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PageHeading, BodySecondary } from "@/components/ui/typography";
import { signIn, signUp, type AuthResult } from "@/lib/auth/actions";

type Mode = "signin" | "signup";

const COPY: Record<
  Mode,
  {
    title: string;
    subtitle: string;
    submit: string;
    switchText: string;
    switchHref: string;
    switchCta: string;
  }
> = {
  signin: {
    title: "Anmelden",
    subtitle: "Melde dich an, um deinen Fortschritt zu speichern.",
    submit: "Anmelden",
    switchText: "Noch kein Konto?",
    switchHref: "/registrieren",
    switchCta: "Registrieren",
  },
  signup: {
    title: "Konto erstellen",
    subtitle: "Kostenlos. A1 ist und bleibt kostenlos.",
    submit: "Konto erstellen",
    switchText: "Schon registriert?",
    switchHref: "/anmelden",
    switchCta: "Anmelden",
  },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const action = mode === "signin" ? signIn : signUp;
  const [state, formAction, pending] = React.useActionState<
    AuthResult | null,
    FormData
  >(action, null);
  const copy = COPY[mode];

  const error = state && "error" in state ? state.error : null;
  const confirmSent = Boolean(state && "ok" in state && state.needsConfirm);

  if (confirmSent) {
    return (
      <div className="border-border bg-surface space-y-3 rounded-xl border p-6 text-center">
        <CheckCircle2 className="text-success mx-auto size-9" aria-hidden />
        <PageHeading>Fast geschafft</PageHeading>
        <BodySecondary>
          Wir haben dir eine E-Mail geschickt. Öffne den Link darin, um dein
          Konto zu bestätigen.
        </BodySecondary>
        <Link
          href="/anmelden"
          className="text-primary inline-block pt-1 text-sm font-medium hover:underline"
        >
          Zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <div className="border-border bg-surface space-y-5 rounded-xl border p-6">
      <div className="space-y-1">
        <PageHeading>{copy.title}</PageHeading>
        <BodySecondary>{copy.subtitle}</BodySecondary>
      </div>

      {error ? (
        <p
          role="alert"
          className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-2 rounded-md border px-3 py-2 text-sm font-medium"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      <form action={formAction} className="space-y-4">
        {mode === "signup" ? (
          <Field label="Name (optional)" htmlFor="displayName">
            <Input
              id="displayName"
              name="displayName"
              autoComplete="name"
              maxLength={80}
              placeholder="Heidi"
            />
          </Field>
        ) : null}

        <Field label="E-Mail" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="du@beispiel.de"
          />
        </Field>

        <Field
          label="Passwort"
          htmlFor="password"
          hint={mode === "signup" ? "Mindestens 8 Zeichen." : undefined}
        >
          <PasswordInput
            id="password"
            name="password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            required
            minLength={8}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Einen Moment …" : copy.submit}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        {copy.switchText}{" "}
        <Link
          href={copy.switchHref}
          className="text-primary font-medium hover:underline"
        >
          {copy.switchCta}
        </Link>
      </p>
    </div>
  );
}
