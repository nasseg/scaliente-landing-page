---
name: landing-marketing-claims
description: Verify and write marketing copy for the Scaliente landing page against the app's real behaviour. Use before editing src/dictionaries/*.json, any pricing/plan/affiliate figure, competitor comparison, statistic, or feature description — and whenever asked to "update the landing", "add a feature to the site", "change pricing copy", "write a hero", or "compare us to a competitor". Contains the sources of truth, the claims that are forbidden, and the ones already retired.
---

# Marketing claims — Scaliente landing page

This repo is a **public brochure**. A wrong number here is not a bug, it is a
published claim: French and EU advertising law applies (Directive 2005/29/EC,
Code de la consommation art. L.121-1 for misleading claims, art. L.122-1 for
comparative advertising). In July 2026 an audit found **146 false or stale
strings**, including a commission term that could not be honoured.

The rule that prevents all of it: **never write a figure you have not read in
the app's source.**

## Sources of truth

The app lives at `/Users/nelgazzah/Developer/Business/Ecom/customerPro`.
Read the file, do not trust the landing page, an old brief, or memory.

| Claim on the site | Read it here |
|---|---|
| Plan names, prices, order caps, shops, history, collaborators, trial | `src/config/plans.js` (`PLANS`) |
| Affiliate rate, duration, referral discount, cookie, payout, fees | `src/config/affiliate.js` |
| Which ad platforms exist | `src/lib/ads/platform-registry.js` |
| Currency conversion source | `src/lib/exchange-rates.js` (`fetchECBRates`) |
| Sync cadence | `vercel.json` crons + Shopify webhooks |
| Storefront tracking | `src/lib/shopify/webPixel.js` |
| What is shipped vs planned | `AUDIT-ROADMAP.md`, `TECH-DEBT.md` |

Current values as of 2026-07-22 (re-read before relying on them):

- Plans: Discovery €0 / **50 orders** · Lite €39 / 100 · Starter €89 / 300 ·
  Growth €149 / 1500 · Scale €249 / unlimited. Annual = 20% off. 7-day trial on
  paid tiers. Free tier is displayed as **"Discovery"**, never "Free".
- Lite does **not** include period comparison (`periodComparison: false`).
- Affiliate: 20% recurring, capped at **12 months** (`COMMISSION_DURATION_MONTHS`),
  referral gets 20% off month one, 90-day cookie, PayPal on the 5th, €50 minimum,
  30-day clearing, 2.9% platform fee deducted before commission.
- 5 ad platforms exactly: Meta, Google, TikTok, Pinterest, Snapchat.
- Orders arrive in real time (Shopify webhooks). Ad spend syncs 1-2x/day
  (`sync-ad-spend` 02:00 UTC, `sync-meta-granular` 02:30 and 14:30) plus on
  manual refresh. There is **no** 5-minute sync.
- Data is hosted in Europe (Supabase eu-central-1). The **company is registered
  in Wyoming, USA** — claim data residency, never a European company.

## Forbidden

- **A statistic you cannot source.** No user counts, ratings, "X out of 10",
  or "trusted by N" without a verifiable origin stated on the page.
- **A superlative.** "The best", "the top-rated", "#1" require a third-party
  ranking to cite. Without one, cut it.
- **An unverifiable claim about a named competitor.** Comparative advertising
  must be objective and checkable. Assert facts about Scaliente instead:
  "Triple Whale does not publish its pricing" is checkable; "Triple Whale costs
  $100-800/month with per-order fees" is not.
- **A feature that is not shipped**, presented as available. The AI Inbox is in
  closed beta: it may appear only as a clearly-separated "in development" block,
  never in pricing, never with its `aiEmailsPerMonth` quotas, never with a date.
- **Industry statistics repeated from vendor blogs** — the "20-25% of conversions
  lost to ad blockers" and "85% of iOS users opt out" figures trace back only to
  vendors citing each other. No primary source exists. Do not use them.

## Retired claims — must never come back

Each was published, found false, and corrected. `validate_dictionaries.py`
blocks them mechanically; add a row there whenever you retire a new one.

| Was published | Why it was wrong |
|---|---|
| "20 commandes/mois" (Discovery) | the cap is 50 |
| "15% de commission à vie" | 20%, and capped at 12 months |
| "50% de réduction pour vos filleuls" | 20% |
| "Aucun script n'est injecté sur votre vitrine" | the Web Pixel extension does run there |
| "mis à jour toutes les 5 minutes" | orders are real-time, ad spend is daily |
| "5+ plateformes ads" | exactly 5 |
| "un ADN européen" | the company is American; only the data is European |
| Lite: "Comparaison de périodes" | not included in that tier |

## Editing the dictionaries

`src/dictionaries/{fr,en,de}.json` must keep **identical key sets**. FR is the
base; EN and DE are translations of it.

Never use `sed`, `perl -i`, or text search-and-replace: the files were once a
mix of raw UTF-8 and `\uXXXX` escapes, and value-based replacement silently
matched some languages and not others, leaving the site half-corrected. Edit by
JSON path:

```python
import json
path = 'src/dictionaries/fr.json'
data = json.load(open(path, encoding='utf-8'))
data['pricing']['plans']['discovery']['features']['orders'] = "Jusqu'à 50 commandes/mois"
json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=4)
```

Then always:

```bash
npx jest dictionaries    # key parity + retired claims + valid JSON
npx jest                 # full suite
```

## Writing new copy

1. Read the source of truth first. Write the number down with its file path.
2. Prefer a checkable proof to an impressive adjective. "Daily ECB rates,
   applied on each transaction's date" beats "best-in-class multi-currency".
3. Say what the product does *not* do when it is a differentiator: the
   attribution pixel only sees data from its install date, and Scaliente falls
   back to Shopify last-click until coverage reaches 60% (`RELIABLE_COVERAGE`).
   Competitors hide this; stating it is the strongest available proof of honesty.
4. Write FR first, then EN and DE. Keep the three key sets identical.
5. If a claim cannot be sourced, do not soften it — remove it.
