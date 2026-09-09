# elinatep.github.io — personal site

A single-page personal site for Elina Teplygina. No build step, no
dependencies: open `index.html` and it runs.

```
index.html            English page
ru/index.html         Russian page
assets/styles.css     all styling, shared by both
assets/main.js        interaction layer, shared by both
assets/elina.jpg      portrait
assets/og-image.jpg   English link-preview card
assets/og-image-ru.jpg  Russian link-preview card
sitemap.xml robots.txt CNAME
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

## Setup

**1. The contact form.** Done — the site embeds Tally form `xXWkVk`
inline, so it renders inside the page rather than as a popup.

To point it at a different form, replace both occurrences of `xXWkVk` in
`index.html` with the new ID (the last part of the share link,
`tally.so/r/w1a2b3` → `w1a2b3`).

**No email address appears anywhere on this site**, by design: addresses in
page source get harvested by spam bots. Tally collects the visitor's address
and notifies you in your own inbox, so people can reach you without yours
ever being public.

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

## Custom domain

The site is set up for **elinateplygina.com**. Two halves have to agree:

**1. DNS, at your domain registrar.** Delete the existing parking-page `A`
records for the root, then add:

| Type  | Name / Host | Value              |
|-------|-------------|--------------------|
| A     | `@`         | `185.199.108.153`  |
| A     | `@`         | `185.199.109.153`  |
| A     | `@`         | `185.199.110.153`  |
| A     | `@`         | `185.199.111.153`  |
| CNAME | `www`       | `elinatep.github.io` |

**2. GitHub.** Settings → Pages → Custom domain → `elinateplygina.com` →
Save. This writes a `CNAME` file to the repo, which is what tells Pages the
site answers on that name. Once the check passes, tick **Enforce HTTPS**.

Order matters: GitHub refuses the domain while DNS still points elsewhere,
so do the DNS first and give it time to propagate.

## Sharing

`assets/og-image.jpg` (1200×630) is the link preview card used by LinkedIn,
WhatsApp and the rest. It's referenced with absolute URLs in `index.html`,
so previews only render once the domain is live. If you change the headline
or the photo, regenerate it to match.

## Search

`sitemap.xml` and `robots.txt` sit at the root, and `index.html` carries a
JSON-LD `Person` block describing who the site is about.

For a single-page site the sitemap does very little on its own; the useful
step is [Google Search Console](https://search.google.com/search-console).
Add the domain, verify it with the DNS TXT record it gives you (in Spaceship,
Advanced DNS, same place as the A records), submit `sitemap.xml`, then use
**URL Inspection → Request indexing** to get listed within days rather than
weeks.

If the headline or the description changes, update the `Person` block and
the `lastmod` date in `sitemap.xml` to match.

## Two languages

English lives at `/`, Russian at `/ru/`, and the nav carries an EN/RU switch.
They are separate real pages, not a JavaScript toggle, so each can be indexed
and ranked on its own. Both carry `hreflang` tags pointing at each other and
at `x-default`, so Google serves the right one per visitor.

Both pages share `assets/styles.css` and `assets/main.js`. Fraunces and Karla
have no Cyrillic glyphs, so `html[lang="ru"]` swaps the two type tokens for
Lora and Manrope, which do. Colours, spacing and layout are identical.

**When you edit one page, edit the other.** Nothing keeps them in sync
automatically. The same applies to the two `og-image` cards.

Adding a third language means copying `ru/` to, say, `de/`, translating it,
adding the token override if the fonts need it, and adding the new `hreflang`
line to *every* page plus `sitemap.xml`.

## Languages offered

The site says English, Russian and German. If that changes, update: the hero
pills, the "Language" row in the contact card, the footer, the meta
descriptions, the JSON-LD `knowsLanguage` block, and the subtitle baked into
both share cards.
