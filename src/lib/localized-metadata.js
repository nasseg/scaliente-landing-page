import { DEFAULT_LANGUAGE, LANGUAGES, localizedUrl } from '@/lib/site';

export function buildLocalizedAlternates(lang, path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = (locale) => localizedUrl(locale, normalizedPath);

    return {
        canonical: url(lang),
        languages: {
            ...Object.fromEntries(LANGUAGES.map((locale) => [locale, url(locale)])),
            'x-default': url(DEFAULT_LANGUAGE),
        },
    };
}
