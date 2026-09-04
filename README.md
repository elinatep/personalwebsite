# elinatep.github.io — personal site

A single-page personal site for Elina Teplygina. No build step, no
dependencies: open `index.html` and it runs.

```
index.html          markup + the Tally embed loader
assets/styles.css   all styling, light and dark
assets/main.js      interaction layer
elina-photo.png     portrait (add this file — see below)
```

## The idea

Warm, light and personal. A portrait-led hero, generous whitespace, and a
palette of blush pink, cornflower blue and soft butter on a warm off-white
— pulled from Elina's own photos rather than a stock pastel set. Neutrals
are biased warm and the darkest ink is a soft plum-grey, never black.

- **The hero** leads with the portrait on the right, a handwritten
  greeting, and the one sentence that explains everything.
- **The story** is a soft timeline whose line draws itself as you scroll.
  Each stop carries tags naming which of the three help topics it feeds,
  so the story and the offer connect.
- Typography is Fraunces (soft, slightly wonky serif) for headings, Karla
  for text, and Caveat for two handwritten touches.
- Single light theme by choice — no dark mode. Motion is limited to gentle
  fade-ups and the timeline line.

## Two things to fill in before publishing

**1. The contact form.** `REPLACE_FORM_ID` appears twice in `index.html`.
Swap both for your Tally form ID (the part after `tally.so/r/`, e.g. `w1a2b3`).
Until you do, the contact section shows a clean "email me directly" panel
instead of a broken embed — so the site is safe to publish as-is.

**2. The portrait.** Save your photo as `assets/elina.jpg`. It sits in an
arch-shaped frame at 4:5, so a vertical portrait works best — at least
800×1000 so it stays sharp on retina screens. Until the file exists, the
frame shows a blush panel with an `ET` monogram rather than a broken image.

## Deploying on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.
It'll be live at `https://elinatep.github.io/personalwebsite/`.

## Notes

- Everything respects `prefers-reduced-motion` — the fade-ups and the
  line drawing switch off.
- If JavaScript never loads, all content stays visible; the reveal
  animations only engage once the script runs.
- Fonts load from Google Fonts; if they're blocked the page falls back to
  system sans and serif and stays readable.
