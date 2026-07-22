/**
 * Dictionary integrity — the safety net that works everywhere.
 *
 * src/dictionaries/{fr,en,de}.json are the public brochure. A July 2026 audit
 * found 146 false or stale strings, including an affiliate commission term the
 * product could not honour. These tests encode what went wrong so it cannot
 * silently return, and unlike an editor hook they also run in CI and under any
 * agent (Claude Code, Codex, opencode).
 *
 * The retired-claim list is intentionally duplicated in
 * .claude/hooks/validate_dictionaries.py so the editor blocks a mistake the
 * moment it is written; this file is the authority.
 */
const fs = require('fs');
const path = require('path');

const DICT_DIR = path.join(__dirname, '..', '..', 'dictionaries');
const LANGS = ['fr', 'en', 'de'];

function load(lang) {
    return JSON.parse(fs.readFileSync(path.join(DICT_DIR, `${lang}.json`), 'utf8'));
}

/** Flatten to dotted paths so key sets can be compared across languages. */
function flatten(node, prefix = '', out = {}) {
    if (node !== null && typeof node === 'object' && !Array.isArray(node)) {
        for (const [key, value] of Object.entries(node)) {
            flatten(value, prefix ? `${prefix}.${key}` : key, out);
        }
    } else if (Array.isArray(node)) {
        node.forEach((value, index) => flatten(value, `${prefix}[${index}]`, out));
    } else {
        out[prefix] = node;
    }
    return out;
}

const dicts = Object.fromEntries(LANGS.map((lang) => [lang, load(lang)]));
const flat = Object.fromEntries(LANGS.map((lang) => [lang, flatten(dicts[lang])]));

describe('dictionaries are valid and parallel', () => {
    test.each(LANGS)('%s.json parses as JSON', (lang) => {
        expect(dicts[lang]).toBeInstanceOf(Object);
    });

    test.each(['en', 'de'])('%s.json has exactly the same keys as fr.json', (lang) => {
        const reference = Object.keys(flat.fr).sort();
        const actual = Object.keys(flat[lang]).sort();
        // Show the actual difference rather than a diff of 1200 keys.
        const missing = reference.filter((k) => !(k in flat[lang]));
        const extra = actual.filter((k) => !(k in flat.fr));
        expect({ missing, extra }).toEqual({ missing: [], extra: [] });
    });

    test.each(LANGS)('%s.json has no empty string values', (lang) => {
        const empty = Object.entries(flat[lang])
            .filter(([, value]) => typeof value === 'string' && value.trim() === '')
            .map(([key]) => key);
        expect(empty).toEqual([]);
    });

    test.each(LANGS)('%s.json has no unresolved placeholder', (lang) => {
        const leftovers = Object.entries(flat[lang])
            .filter(([, value]) => typeof value === 'string' && /\b(TODO|FIXME|LOREM|XXX)\b/i.test(value))
            .map(([key]) => key);
        expect(leftovers).toEqual([]);
    });
});

/**
 * Claims that were published, found false against the app, and corrected.
 * Sources of truth live in customerPro — see the landing-marketing-claims skill.
 * Add a row here whenever a factual error is fixed.
 */
const RETIRED_CLAIMS = [
    {
        why: 'Discovery allows 50 orders/month, not 20 (config/plans.js)',
        pattern: /\b20 (commandes|orders|Bestellungen)\/(mois|month|Monat)/i,
    },
    {
        why: 'affiliate commission is 20% capped at 12 months, not 15% lifetime (config/affiliate.js)',
        pattern: /commission (à vie|lifetime)|lebenslange Provision|15\s?%\s?(à vie|lifetime|lebenslang)/i,
    },
    {
        why: 'the Web Pixel extension does run on the storefront (lib/shopify/webPixel.js)',
        pattern: /aucun script n.est inject|no script is injected|kein Skript in Ihren Storefront/i,
    },
    {
        why: 'orders are real-time, ad spend syncs 1-2x/day — there is no 5-minute sync (vercel.json)',
        pattern: /toutes les 5 minutes|every 5 minutes|alle 5 Minuten/i,
    },
    {
        why: 'there are exactly 5 ad platforms (lib/ads/platform-registry.js)',
        pattern: /5\+ (plateformes|ad platforms|Werbeplattformen)/i,
    },
    {
        why: 'the company is registered in Wyoming — claim data residency, not a European company',
        pattern: /ADN europ|European DNA|europäische[rsn]? DNA/i,
    },
];

describe('retired claims never come back', () => {
    RETIRED_CLAIMS.forEach(({ why, pattern }) => {
        test(why, () => {
            const offenders = [];
            for (const lang of LANGS) {
                for (const [key, value] of Object.entries(flat[lang])) {
                    if (typeof value === 'string' && pattern.test(value)) {
                        offenders.push(`${lang}.json ${key}`);
                    }
                }
            }
            expect(offenders).toEqual([]);
        });
    });
});

describe('pricing copy matches the app', () => {
    // These mirror customerPro/src/config/plans.js. If a plan changes there,
    // this test fails first and tells you which string to update.
    const EXPECTED_ORDER_CAPS = {
        discovery: { fr: '50', en: '50', de: '50' },
        lite: { fr: '100', en: '100', de: '100' },
        starter: { fr: '300', en: '300', de: '300' },
        growth: { fr: '1 500', en: '1,500', de: '1.500' },
    };

    Object.entries(EXPECTED_ORDER_CAPS).forEach(([plan, perLang]) => {
        test.each(LANGS)(`${plan} order cap is stated correctly in %s`, (lang) => {
            const copy = flat[lang][`pricing.plans.${plan}.features.orders`];
            expect(typeof copy).toBe('string');
            expect(copy).toContain(perLang[lang]);
        });
    });

    test.each(LANGS)('the free tier is called Discovery in %s, never "Free"', (lang) => {
        const name = flat[lang]['pricing.plans.discovery.name'];
        if (name !== undefined) {
            expect(String(name).toLowerCase()).not.toBe('free');
        }
    });
});
