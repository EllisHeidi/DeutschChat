"use client";

import * as React from "react";
import {
  BookOpen,
  GraduationCap,
  Headphones,
  Mic,
  PenLine,
  Plus,
  Search,
  SpellCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchInput } from "@/components/ui/search-input";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  Display,
  PageHeading,
  SectionHeading,
  CardHeading,
  Body,
  BodySecondary,
  Caption,
  Eyebrow,
  GermanText,
} from "@/components/ui/typography";
import { Row, Specimen, Subsection } from "../_kit";

const brand = [
  { name: "Ink Black", varName: "--color-ink", hex: "#171717" },
  { name: "German Red", varName: "--color-german-red", hex: "#C92127" },
  { name: "Muted Gold", varName: "--color-gold", hex: "#D9A900" },
  { name: "Warm Cream", varName: "--color-cream", hex: "#F5F0E6" },
  { name: "Soft White", varName: "--color-soft-white", hex: "#FFFDF8" },
  { name: "Warm Grey", varName: "--color-warm-grey", hex: "#DED9CF" },
];

const semantic = [
  "background",
  "foreground",
  "surface",
  "muted",
  "muted-foreground",
  "border",
  "primary",
  "primary-foreground",
  "accent",
  "accent-foreground",
  "success",
  "destructive",
];

export function ColorsSection() {
  return (
    <div className="space-y-6">
      <Subsection title="Marken-Palette">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {brand.map((c) => (
            <div
              key={c.name}
              className="border-border overflow-hidden rounded-lg border"
            >
              <div className="h-16" style={{ backgroundColor: c.hex }} />
              <div className="bg-surface space-y-0.5 p-2.5">
                <p className="text-foreground text-xs font-semibold">
                  {c.name}
                </p>
                <p className="text-muted-foreground font-mono text-[0.6875rem]">
                  {c.hex}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection title="Semantische Tokens">
        <p className="text-muted-foreground text-xs">
          Komponenten verwenden ausschließlich diese Tokens, niemals die
          Rohfarben. So bleibt ein späterer Dark-Mode eine reine
          Token-Umschaltung.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {semantic.map((token) => (
            <div
              key={token}
              className="border-border bg-surface flex items-center gap-2 rounded-md border p-2"
            >
              <span
                className="border-border size-6 shrink-0 rounded border"
                style={{ backgroundColor: `var(--color-${token})` }}
              />
              <code className="text-muted-foreground truncate text-[0.6875rem]">
                {token}
              </code>
            </div>
          ))}
        </div>
      </Subsection>
    </div>
  );
}

export function TypographySection() {
  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-xs">
        Inter, ein Schriftschnitt. Eine Display-Schrift wird bewusst noch nicht
        eingeführt.
      </p>
      <div className="border-border bg-surface space-y-3 rounded-xl border p-5">
        <Specimen label="Eyebrow">
          <Eyebrow>Weiterlernen</Eyebrow>
        </Specimen>
        <Specimen label="Display / Hero">
          <Display>Lerne Deutsch, indem du es wirklich benutzt.</Display>
        </Specimen>
        <Specimen label="Page heading">
          <PageHeading>Dein Fortschritt</PageHeading>
        </Specimen>
        <Specimen label="Section heading">
          <SectionHeading>A1.1 — Erste Schritte</SectionHeading>
        </Specimen>
        <Specimen label="Card heading">
          <CardHeading>Hallo &amp; Begrüßungen</CardHeading>
        </Specimen>
        <Specimen label="Body">
          <Body>
            Begrüße andere Menschen und stelle dich vor. Diese Lektion führt die
            wichtigsten Wörter für den ersten Kontakt ein.
          </Body>
        </Specimen>
        <Specimen label="Body secondary">
          <BodySecondary>
            Sekundärer Text für Beschreibungen und Hilfestellungen.
          </BodySecondary>
        </Specimen>
        <Specimen label="Caption">
          <Caption>Zuletzt geübt vor 2 Tagen</Caption>
        </Specimen>
        <Specimen label="German language text (lang=de)">
          <GermanText as="p" className="text-base">
            Guten Morgen! Wie geht es Ihnen heute? Ich hoffe, Sie haben gut
            geschlafen und starten entspannt in den Tag.
          </GermanText>
        </Specimen>
      </div>
    </div>
  );
}

export function ButtonsSection() {
  return (
    <div className="space-y-5">
      <Subsection title="Varianten">
        <Row>
          <Button variant="primary">Weiterlernen</Button>
          <Button variant="secondary">Überspringen</Button>
          <Button variant="ghost">Später</Button>
          <Button variant="destructive">Konto löschen</Button>
          <Button variant="link">Mehr erfahren</Button>
        </Row>
      </Subsection>

      <Subsection title="Größen">
        <Row>
          <Button size="sm">Klein</Button>
          <Button size="md">Mittel</Button>
          <Button size="lg">Groß</Button>
        </Row>
      </Subsection>

      <Subsection title="Zustände">
        <Row>
          <Button>Standard</Button>
          <Button className="bg-primary-hover">Hover</Button>
          <Button className="bg-primary-active">Active</Button>
          <Button autoFocus>Focus (Tab)</Button>
          <Button disabled>Deaktiviert</Button>
          <Button loading>Wird gespeichert</Button>
        </Row>
        <p className="text-muted-foreground text-xs">
          Hover / Active hier künstlich erzwungen, um die Farben nebeneinander
          zu zeigen.
        </p>
      </Subsection>

      <Subsection title="Icon-Buttons">
        <Row>
          <IconButton icon={Plus} label="Wort hinzufügen" variant="primary" />
          <IconButton icon={Search} label="Suchen" variant="secondary" />
          <IconButton icon={Mic} label="Sprechen" variant="ghost" />
          <IconButton icon={Trash2} label="Löschen" variant="ghost" size="sm" />
          <IconButton icon={Plus} label="Hinzufügen" disabled />
        </Row>
      </Subsection>

      <Subsection title="Mit Icon + Text">
        <Row>
          <Button>
            <BookOpen aria-hidden />
            Wortschatz üben
          </Button>
          <Button variant="secondary">
            <Headphones aria-hidden />
            Anhören
          </Button>
        </Row>
      </Subsection>
    </div>
  );
}

export function InputsSection() {
  const [search, setSearch] = React.useState("Familie");
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Anzeigename" htmlFor="ks-name">
          <Input id="ks-name" placeholder="z. B. Sofia" />
        </Field>
        <Field
          label="E-Mail"
          htmlFor="ks-email"
          hint="Wir senden dir eine Bestätigung."
        >
          <Input id="ks-email" type="email" defaultValue="sofia@example.com" />
        </Field>
        <Field label="Passwort" htmlFor="ks-pw" hint="Mindestens 8 Zeichen.">
          <PasswordInput id="ks-pw" defaultValue="geheim123" />
        </Field>
        <Field
          label="E-Mail"
          htmlFor="ks-email-err"
          error="Diese E-Mail-Adresse ist ungültig."
        >
          <Input
            id="ks-email-err"
            type="email"
            defaultValue="sofia@@example"
            aria-describedby="ks-email-err-error"
            invalid
          />
        </Field>
        <Field label="Deaktiviert" htmlFor="ks-disabled">
          <Input id="ks-disabled" defaultValue="Nicht bearbeitbar" disabled />
        </Field>
        <div className="space-y-1.5">
          <p className="text-foreground text-sm font-medium">Suche</p>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            placeholder="Wort suchen …"
          />
        </div>
      </div>

      <Field label="Freitext (Schreibübung)" htmlFor="ks-textarea">
        <Textarea
          id="ks-textarea"
          defaultValue="Meine Familie wohnt in Hamburg. Ich habe zwei Geschwister."
        />
      </Field>
    </div>
  );
}

export function BadgesSection() {
  return (
    <div className="space-y-5">
      <Subsection title="Level & Zugang">
        <Row>
          <Badge variant="solid">A1</Badge>
          <Badge variant="outline">A2</Badge>
          <Badge variant="free">A1 kostenlos</Badge>
          <Badge variant="premium">Premium</Badge>
          <Badge variant="outline" icon={GraduationCap}>
            Goethe A1
          </Badge>
        </Row>
      </Subsection>

      <Subsection title="Wortschatz-Status">
        <Row>
          <Badge variant="new">Neu</Badge>
          <Badge variant="learning">Am Lernen</Badge>
          <Badge variant="known">Bekannt</Badge>
        </Row>
      </Subsection>

      <Subsection title="Fertigkeiten (Icon trägt die Bedeutung, nicht die Farbe)">
        <Row>
          <Badge variant="neutral" icon={Mic}>
            Sprechen
          </Badge>
          <Badge variant="neutral" icon={Headphones}>
            Hören
          </Badge>
          <Badge variant="neutral" icon={SpellCheck}>
            Grammatik
          </Badge>
          <Badge variant="neutral" icon={BookOpen}>
            Wortschatz
          </Badge>
          <Badge variant="neutral" icon={PenLine}>
            Schreiben
          </Badge>
        </Row>
      </Subsection>

      <Subsection title="Größen">
        <Row>
          <Badge size="sm" variant="premium">
            sm
          </Badge>
          <Badge size="md" variant="premium">
            md
          </Badge>
        </Row>
      </Subsection>
    </div>
  );
}
