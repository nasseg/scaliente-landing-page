const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LANGUAGES = ['fr', 'en', 'de'];

function read(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function dictionary(lang) {
    return JSON.parse(read(`dictionaries/${lang}.json`));
}

describe('pixel attribution landing page', () => {
    test('the existing canonical route gets the dedicated SEO funnel', () => {
        const route = read('app/[lang]/features/[slug]/page.js');
        const sitemap = read('app/sitemap.js');

        expect(route).toContain("slug === 'pixel-attribution'");
        expect(route).toContain('PixelAttributionPage');
        expect(route).toContain('FAQPage');
        expect(route).toContain('BreadcrumbList');
        expect(sitemap).toContain("'/features/pixel-attribution'");
    });

    test('the page is a server component and only shows real anonymised product captures', () => {
        const source = read('components/pixel/PixelAttributionPage.jsx');

        expect(source).not.toMatch(/^['"]use client['"]/);
        expect(source).toContain('/desktop_dashboard_ads_overview_anonymized.png');
        expect(source).toContain('/desktop_dashboard_overview_anonymized.png');
        expect(source).not.toMatch(/mock|placeholder|fabricated/i);
    });

    test.each(LANGUAGES)('%s copy reflects shipped pixel capabilities', (lang) => {
        const page = dictionary(lang).featurePages.pixelAttribution;
        const copy = JSON.stringify(page).toLowerCase();

        expect(page.meta.keywords).toHaveLength(5);
        expect(page.hero.offer).toMatch(/0 ?€|€ ?0/);
        expect(page.hero.proof).toHaveLength(4);
        expect(page.architecture.steps).toHaveLength(4);
        expect(page.events.items).toHaveLength(10);
        expect(page.models.items).toHaveLength(6);
        expect(page.difference.platforms).toEqual(['Shopify', 'Meta', 'Google', 'TikTok', 'Pinterest', 'Snapchat']);
        expect(page.faq.items).toHaveLength(6);
        expect(copy).not.toMatch(/100 ?%|#1|\bnumber one\b|\bnuméro 1\b|\ble meilleur\b|\bthe best\b|\bder beste\b/);
    });
});
