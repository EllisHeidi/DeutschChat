import * as React from "react";

/**
 * Minimal inline formatting for authored explanations: `**bold**` and
 * `*italic*` (used for German examples). No block-level markdown, no HTML.
 */
export function RichText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <span className={className}>{render(children)}</span>;
}

function render(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={key++} lang="de" className="text-foreground not-italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
