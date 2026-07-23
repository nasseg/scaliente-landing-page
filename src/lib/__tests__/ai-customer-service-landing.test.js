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

describe('AI customer service landing page', () => {
    test('the canonical feature route renders the dedicated SEO funnel', () => {
        const route = read('app/[lang]/features/[slug]/page.js');
        const sitemap = read('app/sitemap.js');

        expect(route).toContain("slug === 'ai-customer-service'");
        expect(route).toContain('CustomerServiceAIPage');
        expect(route).toContain('FAQPage');
        expect(route).toContain('BreadcrumbList');
        expect(route).toContain('SoftwareApplication');
        expect(route).toContain('resolvePublicLaunchContent');
        expect(route).toContain('INBOX_PUBLIC');
        expect(sitemap).toContain("'/features/ai-customer-service'");
    });

    test('the page is server-rendered and uses only real anonymised Inbox captures', () => {
        const source = read('components/inbox/CustomerServiceAIPage.jsx');

        expect(source).not.toMatch(/^['"]use client['"]/);
        expect(source).toContain('/inbox-ai-demo-anonymized.png');
        expect(source).toContain('/inbox-ai-risk-review-anonymized.png');
        expect(source).toContain('data-header-theme="dark"');
        expect(source).toContain('data-header-theme="light"');
        expect(source).not.toMatch(/mock|placeholder|fabricated/i);
    });

    test.each(LANGUAGES)('%s keeps the pre-launch state honest and free of public pricing', (lang) => {
        const page = dictionary(lang).featurePages.aiCustomerService;
        const { publicLaunch, ...preLaunchPage } = page;
        const preLaunchCopy = JSON.stringify(preLaunchPage);

        expect(page.meta.keywords).toHaveLength(5);
        expect(page.hero.proof).toHaveLength(4);
        expect(page.problem.items).toHaveLength(3);
        expect(page.workflow.steps).toHaveLength(4);
        expect(page.context.items).toHaveLength(5);
        expect(page.control.items).toHaveLength(4);
        expect(page.team.items).toHaveLength(6);
        expect(page.faq.items).toHaveLength(7);
        expect(page.hero.primaryHref).toMatch(/^mailto:/);
        expect(page.availability.href).toMatch(/^mailto:/);

        expect(preLaunchCopy).not.toMatch(/39\s*€|€\s*39|200 (?:brouillons|drafts|Entwürfe)|100 (?:brouillons|drafts|Entwürfe).*10\s*€/i);
        expect(preLaunchCopy.toLowerCase()).not.toMatch(/#1|\bnumber one\b|\bnuméro 1\b|\ble meilleur\b|\bthe best\b|\bder beste\b/);
        expect(publicLaunch).toBeDefined();
    });

    test.each(LANGUAGES)('%s launch copy exposes the verified add-on offer', (lang) => {
        const launch = dictionary(lang).featurePages.aiCustomerService.publicLaunch;
        const launchCopy = JSON.stringify(launch);

        expect(launch.meta.entityName).toMatch(/^Scaliente .*(?:Inbox|Posteingang)|^Scaliente Inbox/i);
        expect(launch.hero.primaryHref).toBe('https://app.scaliente.com/inbox/discover');
        expect(launch.availability.href).toBe('https://app.scaliente.com/inbox/discover');
        expect(launch.availability.items).toHaveLength(4);
        expect(launchCopy).toMatch(/39\s*€|€\s*39/i);
        expect(launchCopy).toMatch(/(?:200.{0,24}(?:brouillons|drafts|Entwürfe)|(?:brouillons|drafts|Entwürfe).{0,24}200)/i);
        expect(launchCopy).toMatch(/(?:100.{0,24}(?:brouillons|drafts|Entwürfe)|(?:brouillons|drafts|Entwürfe).{0,24}100)/i);
        expect(launchCopy).toMatch(/10\s*€|€\s*10/i);
        expect(launchCopy).toMatch(/90 (?:jours|days|Tage)/i);
        expect(launchCopy.toLowerCase()).not.toMatch(/#1|\bnumber one\b|\bnuméro 1\b|\ble meilleur\b|\bthe best\b|\bder beste\b/);
    });
});
