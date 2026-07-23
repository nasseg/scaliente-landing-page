import {
    AFFILIATE_TERMS,
    buildAffiliateIdempotencyKey,
    normalizeAffiliateApplication,
} from '@/lib/affiliate-application';

describe('affiliate application contract', () => {
    const raw = {
        firstName: '  Nora ',
        lastName: ' Seller  ',
        email: 'NORA@EXAMPLE.COM ',
        website: ' https://example.com ',
        promotion: ' Newsletter ',
        lang: 'fr',
    };

    test('normalizes the material request before deriving side effects', () => {
        expect(normalizeAffiliateApplication(raw)).toEqual({
            firstName: 'Nora',
            lastName: 'Seller',
            email: 'nora@example.com',
            website: 'https://example.com',
            promotion: 'Newsletter',
            lang: 'fr',
        });
    });

    test('binds idempotency to the role, payload and UTC day', () => {
        const date = new Date('2026-07-23T10:00:00.000Z');
        const normalized = normalizeAffiliateApplication(raw);
        const team = buildAffiliateIdempotencyKey('team', normalized, date);
        const confirmation = buildAffiliateIdempotencyKey('confirmation', normalized, date);

        expect(team).toMatch(/^affiliate-team-2026-07-23-[a-f0-9]{64}$/);
        expect(confirmation).toMatch(/^affiliate-confirmation-2026-07-23-[a-f0-9]{64}$/);
        expect(team).not.toBe(confirmation);
        expect(buildAffiliateIdempotencyKey('team', normalized, date)).toBe(team);
        expect(buildAffiliateIdempotencyKey('team', { ...normalized, email: 'other@example.com' }, date)).not.toBe(team);
    });

    test('exposes only the sourced public terms', () => {
        expect(AFFILIATE_TERMS).toEqual({
            minimumCommissionPercent: 10,
            maximumCommissionPercent: 20,
            referralDiscountPercent: 20,
            cookieDays: 90,
            commissionDurationMonths: 12,
            minimumPayoutEur: 50,
            payoutDay: 5,
            clearingDays: 30,
        });
    });
});
