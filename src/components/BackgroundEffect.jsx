"use client";

import React from 'react';

const BackgroundEffect = React.memo(() => {
    return (
        <div
            className="fixed inset-0 -z-50 w-full h-full pointer-events-none overflow-hidden bg-black"
            style={{
                contain: 'layout paint',
                willChange: 'transform',
            }}
        >
            <iframe
                src="/bg_effect.html"
                className="w-full h-full border-0 absolute top-0 left-0"
                title="Background Effect"
                style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                }}
            />
            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
});

BackgroundEffect.displayName = 'BackgroundEffect';

export default BackgroundEffect;
