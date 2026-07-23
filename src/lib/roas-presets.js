export const CURRENCIES = [
    ['EUR', '€'], ['USD', '$'], ['GBP', '£'], ['AED', 'د.إ'], ['CHF', 'CHF'], ['SEK', 'kr'],
    ['NOK', 'kr'], ['DKK', 'kr'], ['CZK', 'Kč'], ['PLN', 'zł'], ['CAD', 'CA$'], ['AUD', 'A$'],
].map(([code, symbol]) => ({ code, symbol }));

export const COUNTRY_GROUPS = [
    ['france', '🇫🇷', [
        ['france_micro', 'EUR', 0, false, 13.8, 'revenue'],
        ['france_micro_vat', 'EUR', 20, true, 13.8, 'revenue'],
        ['france_sas', 'EUR', 20, true, 45, 'profit'],
        ['france_sarl', 'EUR', 20, true, 40, 'profit'],
    ]],
    ['germany', '🇩🇪', [
        ['germany_klein', 'EUR', 0, false, 0, 'revenue'],
        ['germany_einzelunternehmen', 'EUR', 19, true, 0, 'revenue'],
        ['germany_gmbh', 'EUR', 19, true, 21, 'profit'],
    ]],
    ['uk', '🇬🇧', [
        ['uk_sole', 'GBP', 20, true, 9, 'profit'],
        ['uk_ltd', 'GBP', 20, true, 13.8, 'profit'],
        ['uk_llp', 'GBP', 20, true, 9, 'profit'],
    ]],
    ['usa', '🇺🇸', [
        ['usa_sole', 'USD', 0, false, 14.13, 'profit'],
        ['usa_llc', 'USD', 0, false, 14.13, 'profit'],
        ['usa_corp', 'USD', 0, false, 7.65, 'profit'],
    ]],
    ['uae', '🇦🇪', [
        ['uae_freezone', 'AED', 5, false, 0, 'revenue'],
        ['uae_mainland', 'AED', 5, false, 0, 'revenue'],
    ]],
].map(([key, flag, presets]) => ({
    key,
    flag,
    presets: presets.map(([presetKey, currency, vatRate, vatIncluded, socialRate, socialBase]) => ({
        key: presetKey, currency, vatRate, vatIncluded, socialRate, socialBase,
    })),
}));

export const PAYMENT_PRESETS = [
    { label: 'Stripe', value: '2.9' },
    { label: 'PayPal', value: '3.4' },
    { label: 'Shopify Pay', value: '2.4' },
];
