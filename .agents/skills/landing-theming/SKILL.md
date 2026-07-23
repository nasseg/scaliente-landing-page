---
name: landing-theming
description: Section theming, frosted glass and WebGL background rules for the Scaliente landing page. Use before adding, removing or reordering a homepage section, editing any component in src/components/, touching globals.css, or when a section renders grey instead of dark glass, the light/dark alternation looks wrong, or colours are hardcoded instead of using CSS variables.
---

# Section theming — Scaliente landing page

The homepage alternates light and dark sections **automatically** through CSS
`:nth-child`. Nothing in JavaScript decides a section's theme. Get this wrong
and sections silently invert or the WebGL background bleeds through.

## Layout

- **Hero + LogoMarquee** — outside the alternating container, always dark (frosted).
- **Everything between** — inside `.alternating-sections`, alternating automatically.
- **Footer** — outside, always dark (`bg-[#09090b]`).

| Position | Theme | `--section-bg` |
|---|---|---|
| odd (1, 3, 5, 7) | LIGHT | `#fafafa` |
| even (2, 4, 6) | DARK | `#09090b` |

Current order in `src/app/[lang]/page.js` (verify there, not here, before relying on it):

| # | Section | Theme | `frosted` |
|---|---|---|---|
| 1 | before-after | light | no |
| 2 | features | dark | yes |
| 3 | operations | light | no |
| 4 | teamwork | dark | yes |
| 5 | testimonials | light | no |
| 6 | how-it-works | dark | yes |
| 7 | pricing | light | no |
| 8 | faq | dark | yes |
| 9 | cta | light | no |

## Insert sections in PAIRS

**Inserting a section shifts the parity of every section below it** — each one
flips light↔dark, and its `frosted` prop becomes wrong.

**Adding an even number of sections preserves every downstream parity.** This is
why `operations` and `teamwork` were introduced together at positions 3-4:
everything below simply shifted by two and kept its theme.

If you must add an odd number, you have to flip the `frosted` prop on every
section below the insertion point, and re-check them all visually. Prefer pairs.

## The 10 CSS variables

`.alternating-sections` sets these per position, in `globals.css`:

```
--section-bg, --text-primary, --text-secondary, --text-muted,
--card-bg, --card-bg-alt, --card-border, --card-border-hover,
--card-hover, --divider
```

Use them instead of hardcoded colours:

| Hardcoded (dark) | Hardcoded (light) | Use |
|---|---|---|
| `text-white` | `text-zinc-900` | `text-[var(--text-primary)]` |
| `text-zinc-300/400` | `text-zinc-500` | `text-[var(--text-secondary)]` |
| `text-zinc-500` | `text-zinc-600/700` | `text-[var(--text-muted)]` |
| `bg-white/[0.02-0.05]` | `bg-white` | `bg-[var(--card-bg)]` |
| `border-white/[0.05-0.10]` | `border-zinc-100/200` | `border-[var(--card-border)]` |
| `hover:border-white/[0.1]` | `hover:border-zinc-200` | `hover:border-[var(--card-border-hover)]` |
| n/a | `bg-zinc-100/50` | `bg-[var(--card-bg-alt)]` |
| `border-white/10` | `border-zinc-200` | `border-[var(--divider)]` |

## The `<Section>` wrapper (`ui/Section.jsx`)

| Prop | Effect |
|---|---|
| (default) | `<section>` with `bg-[var(--section-bg)]` |
| `frosted` | frosted glass card: frame edges + box-shadow + backdrop-blur |

There is **no `theme=` prop** and there must never be one — the CSS decides.
For a one-off override use `data-theme="dark|light"`.

## WebGL background

`AnimatedBackground.jsx` is a `fixed inset-0` canvas at `zIndex: 0`; the layout
wraps everything in `<main>` at `zIndex: 2`.

Anything between the canvas and a `backdrop-blur` card **must be transparent**.
An opaque `bg-[#fafafa]` in between makes the card render grey instead of dark
glass — this is the most common visual bug on this repo.

Frosted sections work by: absolute frame edges blocking the canvas at the
straight borders, plus a `box-shadow` with spread so the border radius fills
the rounded corners with `#fafafa`. The centre card carries
`bg-[#09090b]/50 backdrop-blur-xl`.

The Hero uses `shadow-[0_0_0_2.5rem_#fafafa] md:shadow-[0_0_0_3rem_#fafafa]`
with `clipPath: 'inset(0 -3rem -3rem -3rem)'` to hide the shadow at the top
(it is only rounded at the bottom).

## Never

- Put an opaque `bg-[#fafafa]` behind a `backdrop-blur` card — it blocks the canvas.
- Use corner-fill squares on frosted sections — they leave rectangular artefacts.
- Hardcode `text-white` or `text-zinc-900` in a section component.
- Make InlineCTA a separate child of `.alternating-sections` — it shifts the
  odd/even counter and inverts every section below it.
- Add a manual `theme=` prop to `<Section>`.

## Do not migrate to variables

These have deliberately fixed colours: mockups (browser chrome, spreadsheet,
dashboard), brand accents (orange highlights, badges, CTA buttons), dark result
cards (`bg-zinc-900` + glow), the per-feature `colorMap` icon backgrounds,
inverted buttons (active toggle, dark CTA), and the Enterprise block in Pricing.

## Stack notes

Tailwind **v4**: there is no `tailwind.config.js`. Configuration is CSS-first
via `@import "tailwindcss"` and `@theme` in `src/app/globals.css`. Do not create
a config file; add tokens to `globals.css`.
