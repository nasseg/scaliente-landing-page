const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SRC_ROOT = path.join(__dirname, '..', '..');
const LANGS = ['fr', 'en', 'de'];

function loadDictionary(lang) {
    return JSON.parse(fs.readFileSync(path.join(SRC_ROOT, 'dictionaries', `${lang}.json`), 'utf8'));
}

describe('homepage sales funnel', () => {
    test('keeps the anonymized profit story ahead of the advertising screens', () => {
        const carouselSource = fs.readFileSync(
            path.join(SRC_ROOT, 'components', 'HeroProductCarousel.jsx'),
            'utf8',
        );
        const dashboardPosition = carouselSource.indexOf("src: '/desktop_dashboard_overview_anonymized.png'");
        const profitPosition = carouselSource.indexOf("src: '/desktop_dashboard_profit_anonymized.png'");
        const reportPosition = carouselSource.indexOf("src: '/desktop_dashboard_report_anonymized.png'");
        const adsPosition = carouselSource.indexOf("src: '/desktop_dashboard_ads_overview_anonymized.png'");

        expect(dashboardPosition).toBeGreaterThanOrEqual(0);
        expect(profitPosition).toBeGreaterThan(dashboardPosition);
        expect(reportPosition).toBeGreaterThan(profitPosition);
        expect(dashboardPosition).toBeLessThan(adsPosition);
        expect(reportPosition).toBeLessThan(adsPosition);
    });

    test('keeps the approved nine-section narrative in order', () => {
        const source = fs.readFileSync(path.join(SRC_ROOT, 'app', '[lang]', 'page.js'), 'utf8');
        const ids = [
            'profit-truth',
            'attribution',
            'decisions',
            'inbox-beta',
            'testimonials',
            'how-it-works',
            'pricing',
            'faq',
            'data-cta-final',
        ];
        const sectionMarkup = [...source.matchAll(/<Section(?:\s+id="([^"]+)")?|<Section\s+data-cta-final=""/g)]
            .map((match) => match[1] || 'data-cta-final');
        expect(sectionMarkup).toEqual(ids);
    });

    test('keeps the integration proof inside the hero viewport', () => {
        const source = fs.readFileSync(path.join(SRC_ROOT, 'app', '[lang]', 'page.js'), 'utf8');

        expect(source).toContain('integrations={dict.logoMarquee}');
        expect(source).not.toContain('<LogoMarquee');
    });

    test('introduces AI customer service semantically without replacing the indexed profit intent', () => {
        const pageSource = fs.readFileSync(path.join(SRC_ROOT, 'app', '[lang]', 'page.js'), 'utf8');
        const heroSource = fs.readFileSync(path.join(SRC_ROOT, 'components', 'Hero.jsx'), 'utf8');
        const carouselSource = fs.readFileSync(
            path.join(SRC_ROOT, 'components', 'HeroProductCarousel.jsx'),
            'utf8',
        );

        expect(pageSource).toContain('resolvePublicLaunchContent(dict.hero)');
        expect(heroSource).toContain('descriptionSegments');
        expect(heroSource).toContain('/features/ai-customer-service');
        expect(carouselSource).toContain('/inbox-ai-demo-anonymized.png');
        expect(carouselSource).toContain('INBOX_PUBLIC');
    });

    test.each(LANGS)('keeps AI Inbox out of public pricing in %s', (lang) => {
        const pricing = JSON.stringify(loadDictionary(lang).pricing);
        expect(pricing).not.toMatch(/Inbox|bo[iî]te de r[ée]ception|Posteingang/i);
    });
});

describe('verified review content is immutable during the redesign', () => {
    const expectedHashes = {
        fr: '80e932d02b9611393adc743d12856f9ed3415817bd47aff73c8a7d702a1cd3c5',
        en: '25dfada99fd66cacd8c4ff980de3567cf59e756ce586eef165dfbe49a1db6d4f',
        de: '9888dab5a4db91e0d53f1efbb0ed2c1f58605063972ffbc4d44c0f95fe126f77',
    };

    test.each(LANGS)('preserves the exact sourced %s review payload', (lang) => {
        const reviews = loadDictionary(lang).testimonials.reviews;
        const hash = crypto.createHash('sha256').update(JSON.stringify(reviews)).digest('hex');
        expect(hash).toBe(expectedHashes[lang]);
    });

    test('preserves the indexed aggregate rating and maps the exact sourced review payload', () => {
        const source = fs.readFileSync(path.join(SRC_ROOT, 'app', '[lang]', 'page.js'), 'utf8');
        expect(source).toContain('aggregateRating:');
        expect(source).toContain('ratingValue: "4.9"');
        expect(source).toContain('ratingCount: "150"');
        expect(source).toContain('review: (dict.testimonials?.reviews || []).map');
        expect(source).toContain('reviewBody: review.text');
        expect(source).toContain('name: review.author');
    });
});
