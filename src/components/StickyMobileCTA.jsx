'use client';
import { useState, useEffect } from 'react';

const StickyMobileCTA = ({ label, href = 'https://apps.shopify.com/scaliente' }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroEnd = document.querySelector('[data-hero-end]');
            const ctaSection = document.querySelector('[data-cta-final]');
            if (!heroEnd) return;

            const heroRect = heroEnd.getBoundingClientRect();
            const heroGone = heroRect.bottom < 0;

            let ctaVisible = false;
            if (ctaSection) {
                const ctaRect = ctaSection.getBoundingClientRect();
                ctaVisible = ctaRect.top < window.innerHeight;
            }

            setVisible(heroGone && !ctaVisible);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-white/90 backdrop-blur-xl border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <a
                href={href}
                className="block w-full text-center py-3.5 bg-gradient-to-b from-orange-500 to-orange-600 rounded-xl text-sm font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] active:scale-[0.98] transition-transform"
            >
                {label}
            </a>
        </div>
    );
};

export default StickyMobileCTA;
