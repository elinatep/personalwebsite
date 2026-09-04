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

The site is built around a transit-map metaphor, which does double duty:
it's a natural fit for Switzerland, and it matches the actual story —
arriving alone and working out the next stop each time.

- **The route** is a red line that draws itself as you scroll, with a
  station marker per life stage.
- **Interchange markers** (M1/M2/M3) on each stop connect that part of
  the story to the mentoring track it feeds, so section 01 and section 02
  visibly link up.
- **The departure board** in the hero states where things stand now.
- Typography is Swiss International Style — Bricolage Grotesque for
  display, Space Grotesk for labels, Newsreader italic as the quieter
  personal voice.

## Two things to fill in before publishing

**1. The contact form.** `REPLACE_FORM_ID` appears twice in `index.html`.
Swap both for your Tally form ID (the part after `tally.so/r/`, e.g. `w1a2b3`).
Until you do, the contact section shows a clean "email me directly" panel
instead of a broken embed — so the site is safe to publish as-is.

**2. The portrait.** Drop a `elina-photo.png` in the repo root, roughly
4:5 and at least 840×1050 for sharpness on retina screens. If the file is
missing, the frame falls back to an `ET` monogram rather than a broken image.

## Deploying on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.
It'll be live at `https://elinatep.github.io/personalwebsite/`.

## Notes

- Theme follows the visitor's OS setting and is overridable with the
  Night/Day toggle; the choice is remembered in `localStorage`.
- Everything respects `prefers-reduced-motion` — the intro, the line
  drawing, the grain and the cursor all switch off.
- Fonts load from Google Fonts; if they're blocked the page falls back to
  system sans and serif and stays readable.
