export const FEATURE_SLUGS = [
    'profit-dashboard',
    'ad-tracking',
    'product-analytics',
    'multi-shop',
    'multi-currency',
    'reports',
    'pixel-attribution',
    'ai-customer-service',
];

const overview = { src: '/desktop_dashboard_overview_anonymized.png', altKey: 'overview' };
const adsOverview = { src: '/desktop_dashboard_ads_overview_anonymized.png', altKey: 'adsOverview' };
const adsMeta = { src: '/desktop_dashboard_ads_meta_anonymized.png', altKey: 'adsMeta' };
const adsGoogle = { src: '/desktop_dashboard_ads_google_anonymized.png', altKey: 'adsGoogle' };

export const FEATURE_PAGE_VISUALS = {
    'profit-dashboard': { archetype: 'pilotage', images: [overview] },
    'ad-tracking': { archetype: 'acquisition', images: [adsOverview, adsMeta, adsGoogle] },
    'product-analytics': { archetype: 'pilotage', images: [overview] },
    'multi-shop': { archetype: 'operations', images: [overview] },
    'multi-currency': { archetype: 'operations', images: [overview] },
    reports: { archetype: 'pilotage', images: [overview] },
    'pixel-attribution': { archetype: 'acquisition', images: [adsOverview, adsMeta] },
    'ai-customer-service': { archetype: 'operations', images: [overview] },
};

const FEATURE_KEYS = {
    'profit-dashboard': 'profitDashboard',
    'ad-tracking': 'adTracking',
    'product-analytics': 'productAnalytics',
    'multi-shop': 'multiShop',
    'multi-currency': 'multiCurrency',
    reports: 'reports',
    'pixel-attribution': 'pixelAttribution',
    'ai-customer-service': 'aiCustomerService',
};

export function slugToFeatureKey(slug) {
    return FEATURE_KEYS[slug] || slug;
}
