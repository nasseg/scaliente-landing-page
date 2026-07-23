const ALLOWED_FIELDS = new Set(['location', 'href', 'plan', 'billing', 'language', 'volume']);

export function trackMarketingEvent(name, params = {}) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    const safeParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => ALLOWED_FIELDS.has(key) && typeof value === 'string'),
    );
    window.gtag('event', name, safeParams);
}
