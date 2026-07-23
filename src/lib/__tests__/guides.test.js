const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', '..');
const LANGS = ['fr', 'en', 'de'];
const GUIDE_KEYS = ['profitTracker', 'methodology', 'revenueVsProfit', 'roasVsPoas', 'breakevenRoas', 'shopifyCosts'];

describe('SEO guide cluster', () => {
    test.each(LANGS)('%s publishes all guide pages with direct answers and sources', (lang) => {
        const dict = JSON.parse(fs.readFileSync(path.join(SRC, 'dictionaries', `${lang}.json`), 'utf8'));
        GUIDE_KEYS.forEach((key) => {
            const page = dict.guides.pages[key];
            expect(page.meta.title).toBeTruthy();
            expect(page.meta.description).toBeTruthy();
            expect(page.answer).toBeTruthy();
            expect(page.sections.length).toBeGreaterThanOrEqual(2);
            expect(page.sources.length).toBeGreaterThanOrEqual(2);
        });
    });

    test('sitemap includes the hub and every guide slug', () => {
        const sitemap = fs.readFileSync(path.join(SRC, 'app', 'sitemap.js'), 'utf8');
        const registry = fs.readFileSync(path.join(SRC, 'lib', 'guide-pages.js'), 'utf8');
        expect(sitemap).toContain("path: '/guides'");
        expect(sitemap).toContain('GUIDE_SLUGS.map');
        expect(registry).toContain("'shopify-profit-tracker'");
        expect(registry).toContain("'shopify-profit-methodology'");
    });

    test('articles expose Article schema, citations and localized canonicals', () => {
        const route = fs.readFileSync(path.join(SRC, 'app', '[lang]', 'guides', '[slug]', 'page.js'), 'utf8');
        expect(route).toContain("'@type': 'Article'");
        expect(route).toContain('citation: page.sources.map');
        expect(route).toContain('buildLocalizedAlternates');
    });
});
