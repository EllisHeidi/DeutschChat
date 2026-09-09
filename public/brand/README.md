# Brand assets

Drop the DeutschChat logo files here. Next.js serves this folder at `/brand/...`
(e.g. `public/brand/logo-mark.svg` → `/brand/logo-mark.svg`).

## Files to add

| Filename        | What it is                                                      | Format                      |
| --------------- | --------------------------------------------------------------- | --------------------------- |
| `logo-mark.svg` | The speech-bubble mark only (flag bands + three dots)           | SVG, ideally square viewBox |
| `logo-full.svg` | Mark + "DeutschChat" wordmark, horizontal lockup                | SVG                         |
| `logo-mark.png` | Same mark, transparent background, 512×512 (favicon/PWA source) | PNG, transparent, ≥512px    |

## Notes

- **SVG is preferred.** If the wordmark colours should follow the theme, leave
  "Deutsch" as `currentColor` and keep "Chat" an explicit red (`#C92127`).
- The mark's colours are fixed brand colours: ink `#171717`, red `#C92127`,
  gold `#D9A900`, dots `#FFFDF8`.
- Transparent background, please — no white/cream box baked in.
- Once these exist I wire `logo-mark` / `logo-full` into `components/layout/logo.tsx`
  and generate `app/icon.png` + `app/apple-icon.png` from `logo-mark.png`.
