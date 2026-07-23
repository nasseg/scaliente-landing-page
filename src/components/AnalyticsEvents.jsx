'use client';

import { useEffect } from 'react';
import { trackMarketingEvent } from '@/lib/marketingAnalytics';

export default function AnalyticsEvents() {
    useEffect(() => {
        const handleClick = (event) => {
            const target = event.target instanceof Element
                ? event.target.closest('[data-analytics]')
                : null;
            if (!target) return;

            trackMarketingEvent(target.dataset.analytics, {
                location: target.dataset.analyticsLocation || 'unknown',
                href: target.getAttribute('href') || '',
                plan: target.dataset.analyticsPlan || '',
                billing: target.dataset.analyticsBilling || '',
                language: document.documentElement.lang || '',
            });
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return null;
}
