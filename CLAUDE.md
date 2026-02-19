# CLAUDE.md — Scaliente Landing Page

Next.js 15 + Tailwind landing page for Scaliente (scaliente.com). Multi-language (fr/en/de), SSG.

## Stack

Next.js 15 (App Router, SSG) | Tailwind CSS | Framer Motion | i18n (JSON dictionaries)

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # Production build (SSG)
npm run lint    # ESLint
```

## Directory

```
src/
├── app/
│   ├── [lang]/              # i18n routes (fr/en/de)
│   │   ├── page.js          # Homepage
│   │   ├── tools/roas-calculator/  # ROAS calculator tool
│   │   ├── compare/         # Comparison pages
│   │   ├── affiliate/       # Affiliate page
│   │   └── (legal pages)    # privacy, terms, cookies, etc.
│   ├── globals.css          # Theme system + animations
│   ├── i18n.js              # Dictionary loader
│   └── layout.js            # Root layout (fonts, GA4, Clarity)
├── components/
│   ├── ui/                  # Section, CTAButton, FrostedSection
│   ├── Navbar.jsx           # Fixed navbar
│   ├── Hero.jsx             # Hero section
│   ├── LogoMarquee.jsx      # Logo carousel
│   ├── BeforeAfter.jsx      # Before/After comparison
│   ├── Features.jsx         # Feature cards + bento
│   ├── HowItWorks.jsx       # Step-by-step
│   ├── Testimonials.jsx     # Reviews + founder story
│   ├── Pricing.jsx          # Pricing cards
│   ├── FAQ.jsx              # Accordion FAQ
│   ├── CTA.jsx              # Final call-to-action
│   ├── Footer.jsx           # Dark footer
│   ├── AnimatedBackground.jsx  # WebGL canvas (fixed, z:0)
│   └── BackgroundEffect.jsx    # Wrapper for AnimatedBackground
├── dictionaries/            # fr.json, en.json, de.json
└── public/                  # Static assets
```

## Section Theming System (CRITICAL)

<critical-rule id="section-theming">

### Architecture

The homepage uses an **automatic alternating dark/light section system** via CSS `:nth-child(odd/even)`.

**Structure** :
- **Hero + LogoMarquee** = HORS du container alternant (frosted glass, toujours dark)
- **Toutes les autres sections** = dans `.alternating-sections`, alternance automatique
- **Footer** = HORS du container alternant (toujours dark `bg-[#09090b]`)

### CSS Variables (globals.css)

`.alternating-sections` assigne 10 variables CSS selon la position :

| Position | Theme | `--section-bg` |
|----------|-------|----------------|
| odd (1,3,5,7) | LIGHT | `#fafafa` |
| even (2,4,6) | DARK | `#09090b` |

**10 variables sémantiques** :
```
--section-bg, --text-primary, --text-secondary, --text-muted,
--card-bg, --card-bg-alt, --card-border, --card-border-hover,
--card-hover, --divider
```

### Section Order (homepage)

| # | Section | Theme | `frosted` prop |
|---|---------|-------|----------------|
| 1 | BeforeAfter | LIGHT | non |
| 2 | Features + InlineCTA | DARK | oui |
| 3 | HowItWorks | LIGHT | non |
| 4 | Testimonials | DARK | oui |
| 5 | Pricing | LIGHT | non |
| 6 | FAQ | DARK | oui |
| 7 | CTA | LIGHT | non |

**Insérer une section** = tout se recale automatiquement (CSS `:nth-child`).

### `<Section>` wrapper (`ui/Section.jsx`)

| Prop | Effet |
|------|-------|
| (default) | `<section>` avec `bg-[var(--section-bg)]` |
| `frosted` | Frosted glass card : frame edges + box-shadow + backdrop-blur |

**JAMAIS de prop `theme=`** — le CSS fait tout. Override ponctuel via `data-theme="dark|light"`.

### Frosted Sections (dark sections even)

Les sections dark utilisent `frosted` prop sur `<Section>` :
- Frame edges (absolute divs) bloquent le canvas WebGL sur les bords droits
- `box-shadow` avec spread = border-radius remplit les coins arrondis avec `#fafafa`
- Le card central a `bg-[#09090b]/50 backdrop-blur-xl` pour l'effet glass
- **PAS de corner-fill squares** (causent des artefacts rectangulaires)

### WebGL Background (AnimatedBackground.jsx)

Canvas `fixed inset-0` avec `zIndex: 0`. Le layout wrap tout dans `<main>` à `zIndex: 2`.

**CRITIQUE** : Les éléments entre le canvas et un card `backdrop-blur` doivent être TRANSPARENTS. Toute `bg-[#fafafa]` opaque entre eux rend le card gris au lieu de dark glass.

### Hero — Box-Shadow + Clip-Path

Le Hero utilise `shadow-[0_0_0_2.5rem_#fafafa] md:shadow-[0_0_0_3rem_#fafafa]` avec `clipPath: 'inset(0 -3rem -3rem -3rem)'` pour cacher le shadow en haut (le Hero a `rounded-b-` seulement).

### Migration couleurs : variables CSS

| Hardcodé (dark) | Hardcodé (light) | Variable CSS |
|-----------------|------------------|-------------|
| `text-white` | `text-zinc-900` | `text-[var(--text-primary)]` |
| `text-zinc-300/400` | `text-zinc-500` | `text-[var(--text-secondary)]` |
| `text-zinc-500` | `text-zinc-600/700` | `text-[var(--text-muted)]` |
| `bg-white/[0.02-0.05]` | `bg-white` | `bg-[var(--card-bg)]` |
| `border-white/[0.05-0.10]` | `border-zinc-100/200` | `border-[var(--card-border)]` |
| `hover:border-white/[0.1]` | `hover:border-zinc-200` | `hover:border-[var(--card-border-hover)]` |
| n/a | `bg-zinc-100/50` | `bg-[var(--card-bg-alt)]` |
| `border-white/10` | `border-zinc-200` | `border-[var(--divider)]` |

### INTERDIT

- ❌ Ajouter `bg-[#fafafa]` opaque derrière un card `backdrop-blur` (bloque le canvas)
- ❌ Utiliser des corner-fill squares (divs carrés aux coins) pour les sections frosted
- ❌ Hardcoder `text-white` ou `text-zinc-900` dans les composants de section (utiliser les variables)
- ❌ Mettre l'InlineCTA comme child séparé dans `.alternating-sections` (décale le compteur odd/even)
- ❌ Ajouter une prop `theme=` manuelle sur `<Section>` (le CSS `:nth-child` fait tout)

### NE PAS MIGRER (éléments à design fixe)

- Mockups (browser chrome, Excel, dashboard) — couleurs internes fixes
- Accents brand (orange highlights, badges, CTA buttons)
- Cards résultat dark (bg-zinc-900 + glow) — éléments décoratifs
- colorMap (feature icons bg-purple-50, etc.) — accents par feature
- Boutons inversés (toggle actif bg-zinc-900, CTA bg-zinc-900) — contraste voulu
- Section Enterprise dans Pricing — bloc dark fixe

</critical-rule>

## i18n

3 langues : `fr`, `en`, `de`. Dictionnaires JSON dans `src/dictionaries/`.

```jsx
const dict = await getDictionary(lang);
<Component content={dict.section} />
```

## Brand

- Primary: Orange (`orange-500` / `orange-600`)
- Font: Poppins (--font-poppins) for all text, brand headings use `font-brand`
- Backgrounds: `#fafafa` (light), `#09090b` (dark)
- Frosted glass: `bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150`

## Deployment

Vercel — auto-deploy on push. Domain: `scaliente.com`.
