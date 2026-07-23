'use client';

import { useEffect, useState } from 'react';

export default function useHeaderTheme() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const regions = [...document.querySelectorAll('[data-header-theme]')];
        if (!regions.length || typeof IntersectionObserver === 'undefined') return undefined;

        const bottomMargin = Math.max(0, window.innerHeight - 56);
        const observer = new IntersectionObserver((entries) => {
            const active = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

            if (active) {
                setTheme(active.target.dataset.headerTheme === 'light' ? 'light' : 'dark');
            }
        }, { rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 });

        regions.forEach((region) => observer.observe(region));
        return () => observer.disconnect();
    }, []);

    return theme;
}
