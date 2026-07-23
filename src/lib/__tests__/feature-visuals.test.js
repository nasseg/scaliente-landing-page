import {
    FEATURE_PAGE_VISUALS,
    FEATURE_SLUGS,
    slugToFeatureKey,
} from '@/lib/feature-page-visuals';

describe('feature page visuals', () => {
    test('every feature route has a real, local visual configuration', () => {
        expect(FEATURE_SLUGS).toHaveLength(8);

        FEATURE_SLUGS.forEach((slug) => {
            const visual = FEATURE_PAGE_VISUALS[slug];
            expect(visual).toBeDefined();
            expect(['pilotage', 'acquisition', 'operations']).toContain(visual.archetype);
            expect(visual.images.length).toBeGreaterThan(0);
            visual.images.forEach((image) => {
                expect(image.src).toMatch(/^\/desktop_dashboard_.*_anonymized\.png$/);
                expect(image.altKey).toBeTruthy();
            });
            expect(slugToFeatureKey(slug)).toBeTruthy();
        });
    });

    test('AI customer service never points to a fabricated inbox screenshot', () => {
        const images = FEATURE_PAGE_VISUALS['ai-customer-service'].images;
        expect(images.every(({ src }) => !/inbox/i.test(src))).toBe(true);
    });
});
