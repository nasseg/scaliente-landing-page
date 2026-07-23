const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

function read(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function lineCount(relativePath) {
    return read(relativePath).split('\n').length;
}

describe('secondary page architecture', () => {
    test('static editorial pages remain server components', () => {
        expect(read('components/features/FeaturePageContent.jsx')).not.toMatch(/^['"]use client['"]/);
        expect(read('components/ComparisonContent.jsx')).not.toMatch(/^['"]use client['"]/);
    });

    test('the ROAS orchestrator stays small and delegates calculations', () => {
        const source = read('components/RoasCalculator.jsx');
        expect(lineCount('components/RoasCalculator.jsx')).toBeLessThanOrEqual(300);
        expect(source).toContain("from '@/lib/roas-calc'");
        expect(source).not.toContain('const netRevenue =');
    });

    test('all legal routes share the same visual shell', () => {
        const routes = [
            'app/[lang]/legal/page.js',
            'app/[lang]/legal-mentions/page.js',
            'app/[lang]/privacy-policy/page.js',
            'app/[lang]/cookies/page.js',
            'app/[lang]/terms-of-sale/page.js',
            'app/[lang]/terms-of-service/page.js',
        ];

        routes.forEach((route) => {
            const source = read(route);
            expect(source).toContain("@/components/legal/LegalPageLayout");
            expect(source).toContain("@/lib/localized-metadata");
            expect(source).toContain('buildLocalizedAlternates');
            expect(source).not.toMatch(/rose-|gradient-to-r/);
        });
    });

    test('fake and superseded affiliate dashboards are removed', () => {
        expect(fs.existsSync(path.join(ROOT, 'components/AffiliateContent.jsx'))).toBe(false);
        expect(fs.existsSync(path.join(ROOT, 'components/affiliate/AffiliateDashboard.jsx'))).toBe(false);
    });

    test('secondary page headers use the compact density contract', () => {
        const pageHero = read('components/ui/PageHero.jsx');
        const affiliateHero = read('components/affiliate/AffiliateHero.jsx');
        const legalLayout = read('components/legal/LegalPageLayout.jsx');

        expect(pageHero).not.toMatch(/94svh|82svh|pt-36|ArrowDownRight/);
        expect(affiliateHero).not.toMatch(/pt-44|ArrowDownRight/);
        expect(legalLayout).not.toContain('sm:pt-20');
    });
});
