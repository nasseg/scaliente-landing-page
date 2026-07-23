import { INBOX_PUBLIC } from '@/lib/public-release-flags';

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function mergeContent(base, override) {
    if (Array.isArray(base) && Array.isArray(override)) {
        return base.map((item, index) => (
            index < override.length ? mergeContent(item, override[index]) : item
        ));
    }
    if (!isPlainObject(base) || !isPlainObject(override)) return override;

    const merged = { ...base };
    for (const [key, value] of Object.entries(override)) {
        merged[key] = Object.hasOwn(base, key)
            ? mergeContent(base[key], value)
            : value;
    }
    return merged;
}

export function resolvePublicLaunchContent(content) {
    if (!isPlainObject(content)) return content;

    const { publicLaunch, ...base } = content;
    if (!INBOX_PUBLIC || !isPlainObject(publicLaunch)) return base;
    return mergeContent(base, publicLaunch);
}
