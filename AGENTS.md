# Scaliente — landing page

Public marketing site for Scaliente (`scaliente.com`). Static, trilingual, no backend.
Read by Claude Code, Codex, opencode and Cursor — `CLAUDE.md` is a symlink to this file.

**The app it advertises**: `/Users/nelgazzah/Developer/Business/Ecom/customerPro`.

## This is a brochure, not an app

Every figure on this site is a **public claim** under EU/French advertising law.
An audit in July 2026 found 146 false or stale strings, including an affiliate
commission the product could not honour.

**NEVER write a number you have not read in `customerPro`'s source.**
Pricing → `src/config/plans.js` · affiliate → `src/config/affiliate.js` ·
ad platforms → `src/lib/ads/platform-registry.js` · currency → `src/lib/exchange-rates.js`.

**NEVER** publish an unsourced statistic, a superlative ("the best", "#1"), an
unverifiable claim about a named competitor, or a feature that is not shipped.

Before touching copy, load the **`landing-marketing-claims`** skill — it holds the
sources of truth, the retired claims, and how to edit the dictionaries safely.

## Stack

Next.js 16.1.6 (App Router, SSG) · React 19.2.3 · Tailwind CSS 4 · Framer Motion 12 ·
Lucide icons · Jest 30 + Testing Library · ESLint 9 · npm · deployed on Vercel.

Tailwind 4 is **CSS-first**: there is no `tailwind.config.js`. Tokens live in
`@theme` inside `src/app/globals.css`.

## Commands

```bash
npm run dev              # localhost:3000
npm run build            # SSG production build
npm run lint             # ESLint 9
npx jest                 # full suite
npx jest dictionaries    # key parity + retired claims (run after ANY copy edit)
```

## Layout

```
src/app/[lang]/          # fr | en | de — home, features/[slug], tools/roas-calculator,
                         # affiliate, compare/*, legal pages
src/app/globals.css      # theme variables + animations (Tailwind 4 @theme)
src/app/i18n.js          # getDictionary(lang)
src/components/          # section components + ui/ primitives
src/dictionaries/        # fr.json | en.json | de.json  <- ALL copy lives here
src/lib/__tests__/       # jest
```

## i18n

Three dictionaries with **identical key sets**. FR is the base; EN and DE translate it.

```jsx
const dict = await getDictionary(lang);
<Component content={dict.section} />
```

**NEVER** edit `src/dictionaries/*.json` with `sed`, `perl -i`, or text
search-and-replace — the files mix encodings and value-based replacement
silently corrupts one language. Edit by JSON path
(`json.load` → set → `json.dump(ensure_ascii=False, indent=4)`), then run
`npx jest dictionaries`. A guard hook blocks stream edits.

## Section theming

The homepage alternates light/dark automatically via CSS `:nth-child` — inserting
a section shifts every one after it. There is no `theme=` prop, and an opaque
background between the WebGL canvas and a `backdrop-blur` card breaks the glass
effect. Load the **`landing-theming`** skill before adding, reordering or styling
a section.

## Brand

Orange `#f97316` primary · Poppins (`font-brand` for headings) ·
`#fafafa` light / `#09090b` dark · frosted glass `bg-[#09090b]/50 backdrop-blur-xl`.

## Skills

| Task | Skill |
|---|---|
| Any copy, pricing, competitor or feature claim | `landing-marketing-claims` |
| Adding/reordering/styling a section, theming bugs | `landing-theming` |
| Building or restyling a page | `frontend-design` |
| Landing-page structure and conversion patterns | `landing-page-vercel` |

Skills live in `.agents/skills/` and are symlinked into `.claude/skills/`,
`.opencode/skills/`, `.cursor/skills/` and `.gemini/skills/` — one copy, four tools.

## Guards

`.claude/hooks/` (symlinked into `.codex/hooks/`, so both agents enforce the same):
`guard-bash.sh` blocks destructive git and stream edits on dictionaries ·
`check-dictionaries.sh` validates JSON, key parity and retired claims after every
edit · `session-context.sh` reports branch, drift and uncommitted work at startup.

## Git

Branch before committing; `main` is the deploy branch and pushes go live.
Conventional commits.
