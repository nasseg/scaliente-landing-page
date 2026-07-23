export const GUIDE_PAGES = {
    'shopify-profit-tracker': {
        dictionaryKey: 'profitTracker',
        featurePath: '/features/profit-dashboard',
        related: ['shopify-profit-methodology', 'shopify-revenue-vs-net-profit', 'shopify-costs'],
    },
    'shopify-profit-methodology': {
        dictionaryKey: 'methodology',
        featurePath: '/features/profit-dashboard',
        related: ['shopify-profit-tracker', 'shopify-costs', 'roas-vs-poas'],
    },
    'shopify-revenue-vs-net-profit': {
        dictionaryKey: 'revenueVsProfit',
        featurePath: '/features/profit-dashboard',
        related: ['shopify-profit-tracker', 'shopify-profit-methodology', 'shopify-costs'],
    },
    'roas-vs-poas': {
        dictionaryKey: 'roasVsPoas',
        featurePath: '/features/ad-tracking',
        related: ['breakeven-roas', 'shopify-costs', 'shopify-profit-methodology'],
    },
    'breakeven-roas': {
        dictionaryKey: 'breakevenRoas',
        featurePath: '/tools/roas-calculator',
        related: ['roas-vs-poas', 'shopify-costs', 'shopify-profit-tracker'],
    },
    'shopify-costs': {
        dictionaryKey: 'shopifyCosts',
        featurePath: '/features/product-analytics',
        related: ['shopify-profit-methodology', 'shopify-revenue-vs-net-profit', 'breakeven-roas'],
    },
};

export const GUIDE_SLUGS = Object.keys(GUIDE_PAGES);

export function getGuideConfig(slug) {
    return GUIDE_PAGES[slug];
}
