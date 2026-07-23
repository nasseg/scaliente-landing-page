import { trackMarketingEvent } from '@/lib/marketingAnalytics';

describe('marketing analytics', () => {
    afterEach(() => {
        delete window.gtag;
    });

    test('is a safe no-op when GA is unavailable', () => {
        expect(() => trackMarketingEvent('cta_click', { location: 'hero' })).not.toThrow();
    });

    test('forwards a constrained event to gtag when available', () => {
        window.gtag = jest.fn();
        trackMarketingEvent('cta_click', { location: 'hero', href: '/trial' });
        expect(window.gtag).toHaveBeenCalledWith('event', 'cta_click', {
            location: 'hero',
            href: '/trial',
        });
    });
});
