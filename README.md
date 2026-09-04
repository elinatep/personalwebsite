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

**1. The contact form.** The site uses a [Tally](https://tally.so) form —
free, and you can sign in with Google rather than making a new password.

1. Sign in at tally.so and create a form. Two or three questions is plenty:
   *what are you trying to figure out*, *where are you right now*, and how to
   reach you.
2. Hit **Publish**, then copy the form ID — it's the last part of the share
   link, `tally.so/r/w1a2b3` → `w1a2b3`.
3. In `index.html`, replace both occurrences of `REPLACE_FORM_ID` with it.

Until you do that, the contact section shows a short "the form is being set
up" note pointing at LinkedIn — so the site is safe to publish before the
form exists.

**No email address appears anywhere on this site**, by design: addresses in
page source get harvested by spam bots. Tally collects the visitor's address
and notifies you in your own inbox, so people can reach you without yours
ever being public. If you later want a visible address, use one made for
this rather than a personal account.

**2. The portrait.** Done — it's at `assets/elina.jpg`, 900×1200.

To swap it later, replace that file, keeping the same name and a vertical
shape (it's shown in an arch frame at 4:5). Export it around 900px wide and
save as JPEG, not PNG: the original upload was a 2.1 MB PNG, and converting
it cut the page weight by 92% with no visible difference. If the file is
ever missing, the frame falls back to a blush panel with an `ET` monogram
rather than a broken image.

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
