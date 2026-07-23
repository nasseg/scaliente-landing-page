import { createHash } from 'node:crypto';

export const AFFILIATE_TERMS = Object.freeze({
    minimumCommissionPercent: 10,
    maximumCommissionPercent: 20,
    referralDiscountPercent: 20,
    cookieDays: 90,
    commissionDurationMonths: 12,
    minimumPayoutEur: 50,
    payoutDay: 5,
    clearingDays: 30,
});

export function normalizeAffiliateApplication(input = {}) {
    const normalize = (value) => String(value || '').trim();
    return {
        firstName: normalize(input.firstName),
        lastName: normalize(input.lastName),
        email: normalize(input.email).toLowerCase(),
        website: normalize(input.website),
        promotion: normalize(input.promotion),
        lang: ['fr', 'en', 'de'].includes(input.lang) ? input.lang : 'en',
    };
}

export function buildAffiliateIdempotencyKey(role, application, now = new Date()) {
    if (!['team', 'confirmation'].includes(role)) throw new Error('Unknown affiliate email role');
    const day = now.toISOString().slice(0, 10);
    const materialPayload = JSON.stringify(normalizeAffiliateApplication(application));
    const digest = createHash('sha256').update(materialPayload).digest('hex');
    return `affiliate-${role}-${day}-${digest}`;
}
