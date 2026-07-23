import { buildLocalizedAlternates } from '@/lib/localized-metadata';

describe('localized metadata', () => {
    test('homepage canonicals match the non-trailing-slash URLs served with 200', () => {
        expect(buildLocalizedAlternates('fr', '')).toEqual({
            canonical: 'https://www.scaliente.com/fr',
            languages: {
                fr: 'https://www.scaliente.com/fr',
                en: 'https://www.scaliente.com/en',
                de: 'https://www.scaliente.com/de',
                'x-default': 'https://www.scaliente.com/fr',
            },
        });
    });

    test('nested routes keep a single path separator', () => {
        expect(buildLocalizedAlternates('en', '/features/reports').canonical)
            .toBe('https://www.scaliente.com/en/features/reports');
        expect(buildLocalizedAlternates('de', 'features/reports').canonical)
            .toBe('https://www.scaliente.com/de/features/reports');
    });
});
