'use client';
import { useState, useEffect } from 'react';

const StickyMobileCTA = ({ label, href = 'https://apps.shopify.com/scaliente' }) => {
    const [heroGone, setHeroGone] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);

    useEffect(() => {
        const heroEnd = document.querySelector('[data-hero-end]');
        const ctaSection = document.querySelector('[data-cta-final]');

        if (!heroEnd) return;

        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                // Only show sticky CTA when hero-end scrolled PAST (above viewport),
                // not when it's simply below the fold on initial load
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setHeroGone(true);
                } else if (entry.isIntersecting) {
                    setHeroGone(false);
                }
            },
            { threshold: 0 }
        );
        heroObserver.observe(heroEnd);

        let ctaObserver;
        if (ctaSection) {
            ctaObserver = new IntersectionObserver(
                ([entry]) => { setCtaVisible(entry.isIntersecting); },
                { threshold: 0 }
            );
            ctaObserver.observe(ctaSection);
        }

        return () => {
            heroObserver.disconnect();
            if (ctaObserver) ctaObserver.disconnect();
        };
    }, []);

    const visible = heroGone && !ctaVisible;

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white p-3 lg:hidden">
            <a
                href={href}
                data-analytics="primary_cta_click"
                data-analytics-location="sticky_mobile"
                className="block min-h-12 w-full rounded-[10px] bg-orange-500 py-3.5 text-center text-sm font-semibold text-white transition-colors active:bg-orange-600"
            >
                {label}
            </a>
        </div>
    );
};

export default StickyMobileCTA;
