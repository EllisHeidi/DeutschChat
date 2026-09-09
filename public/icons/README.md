# Custom icons

Drop custom DeutschChat icon files here, **one icon per file**. Next.js serves
this folder at `/icons/...` (e.g. `public/icons/feature/wortschatz.svg` →
`/icons/feature/wortschatz.svg`).

Anything you don't supply keeps using its current Lucide icon — so you can add
these a few at a time.

## Format rules

- **SVG strongly preferred.** Square viewBox (e.g. `0 0 24 24`), no fixed
  `width`/`height` on the root `<svg>`.
- For icons that change colour by state (all nav + status icons), draw the glyph
  with `fill="currentColor"` (or `stroke="currentColor"`) and **no** background
  circle — the app draws the tinted circle behind it.
- For icons with a fixed brand colour (e.g. the red mic, gold book) you may bake
  the colour in; tell me and I'll render them without `currentColor`.
- Transparent background. No cream/white box.
- PNG only as a last resort, and then transparent + ≥3× the display size.

## Files to add

### `feature/` — the skill icons (shown in a tinted circle)

| Filename           | Concept                       | Circle tint |
| ------------------ | ----------------------------- | ----------- |
| `wortschatz.svg`   | Vocabulary / open book        | gold        |
| `hoeren.svg`       | Listening / headphones        | neutral     |
| `sprechen.svg`     | Speaking / microphone         | red         |
| `schreiben.svg`    | Writing / pencil              | neutral     |
| `konversation.svg` | Conversation / speech bubbles | neutral     |

### `action/` — buttons and inline actions

| Filename          | Concept                  |
| ----------------- | ------------------------ |
| `play.svg`        | Play (triangle)          |
| `audio.svg`       | Audio / speaker          |
| `aufnehmen.svg`   | Record (mic)             |
| `richtig.svg`     | Correct (check)          |
| `falsch.svg`      | Wrong (x)                |
| `gesperrt.svg`    | Locked (padlock)         |
| `weiter.svg`      | Continue (arrow right)   |
| `neu-starten.svg` | Restart (circular arrow) |

### `nav/` — bottom nav + sidebar (supply outline; add `-filled` if you have both)

| Filename             | Concept                                       |
| -------------------- | --------------------------------------------- |
| `start.svg`          | Home                                          |
| `lernen.svg`         | Learn / book                                  |
| `chat.svg`           | Chat / bubble                                 |
| `fortschritt.svg`    | Progress / bar chart                          |
| `profil.svg`         | Profile / person                              |
| `start-filled.svg` … | optional filled variants for the active state |

### `status/` — lesson / item state markers (shown in a tinted square)

| Filename             | Concept            | Tint    |
| -------------------- | ------------------ | ------- |
| `erledigt.svg`       | Completed (check)  | green   |
| `in-bearbeitung.svg` | In progress (dots) | red     |
| `wiederholen.svg`    | Repeat (clock)     | gold    |
| `neu.svg`            | New (empty circle) | neutral |

## After you add files

Tell me which folders you filled. I build a `components/icons/` layer that loads
each file with the app's standard size/colour props and swaps it in for the
Lucide icon at every call site. Blurry or boxed-in exports get flagged, not shipped.
