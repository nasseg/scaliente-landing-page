export const SITE_URL = 'https://www.scaliente.com';
export const LANGUAGES = ['fr', 'en', 'de'];
export const DEFAULT_LANGUAGE = 'fr';

export function localizedUrl(lang, path = '') {
    const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path;
    return `${SITE_URL}/${lang}${normalizedPath}`;
}
