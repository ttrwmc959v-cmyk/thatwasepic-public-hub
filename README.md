# ThatWasEpic — Public Link Hub

A polished, mobile-first, static landing/link hub built to replace a broken asset URL.
Single-page, no build step, no external runtime dependencies beyond Google Fonts.

## Files

| File           | Purpose                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| `index.html`   | Markup: hero, link cards, share section, disclaimer, footer.               |
| `styles.css`   | Design system + layout. Tricolor accents, dark cinematic canvas.           |
| `script.js`    | Copy-link + native share, reveal-on-scroll, year stamp.                    |
| `favicon.svg`  | Inline tri-stripe crest favicon.                                           |
| `og-image.svg` | Social preview card (referenced by Open Graph + Twitter meta).             |

## Design decisions

- **Palette**: dark canvas (`#0a0d0a`) under a tricolor system — `--green-1: #25c46d`, white, `--red-1: #ff3a55`. Calibrated for AA contrast on dark, not the flat flag swatches.
- **Type**: Bebas Neue for the wordmark, Inter for everything else. Hero word splits into three colored parts (`That` / `Was` / `Epic`).
- **Crest mark**: abstract tri-stripe shield with a stylized starburst — explicitly **not** an official emblem or seal.
- **Cards**: 3 tiers — `card--feature` (YouTube, with red glow + Open CTA), `card--merch` (green glow + Shop CTA), and standard cards (IG / FB / X / Business). All single-column for thumb-first tapping.
- **Background**: subtle diagonal tricolor stripes + two halos + faint floating sparks, behind a vignette. No emojis, no stock photos, no clipart.
- **Disclaimer**: rendered as its own dashed-border block; copy clearly states "fan-built promotional hub, not officially endorsed unless verified." The hero chip says "The Link Hub · Live" (not "Official").
- **Motion**: IntersectionObserver staggered reveals (`[data-reveal]`), with a 2.5s safety fallback so nothing stays hidden if IO never fires (static screenshots, headless renders, etc.). Honors `prefers-reduced-motion`.
- **A11y**: skip target areas large (44px+), focus-visible rings, `aria-live` on copy button + toast, `aria-label` on link nav.

## Linked destinations

- YouTube — https://www.youtube.com/@ThatWasEpic11
- Facebook — https://www.facebook.com/thatwasepic/
- Instagram — https://instagram.com/thatwasepic
- X / Twitter — https://twitter.com/thatwasepic11
- Merch / website — https://thatwasepic.com
- Business inquiries — mailto:thatwasepic@night.co

## Conventions for follow-up edits

- **Adding a link**: copy an existing `<a class="card">` block inside `nav.links`. Pick a rail color (`--green`, `--white`, or `--red`). Use a `card--feature` or `card--merch` variant only for one or two "hero" destinations — too many CTAs flattens the hierarchy.
- **Editing copy**: keep eyebrow text short (1-2 words) and titles to one line at 390px width. Sub-text wraps to 2 lines max.
- **Editing colors**: change the CSS custom properties at the top of `styles.css` (`--green-1`, `--red-1`, etc.). Do not hardcode hex values further down.
- **No tracking / no middle pages**: the disclaimer promises every button opens the destination directly. Don't add link-tracking redirects without updating that copy.
- **Deploy**: it's a static bundle — drop `index.html` + `styles.css` + `script.js` + `favicon.svg` + `og-image.svg` on any static host (S3, Netlify, Cloudflare Pages, etc.). No build step.
- **QA**: from the project dir run `python3 -m http.server 8765` and visit `http://localhost:8765/`. Test at 390px (iPhone), 768px (tablet), and 1280px (desktop).
