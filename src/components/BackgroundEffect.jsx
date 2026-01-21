"use client";

import React from 'react';

const BackgroundEffect = React.memo(() => {
    return (
        <>
            {/* WebGL Background Animation */}
            <iframe
                src="/bg_effect.html"
                title="Background Effect"
                className="fixed inset-0 w-full h-full border-0 pointer-events-none"
                style={{
                    zIndex: 0,
                }}
            />
            {/* Frosted Glass / Liquid Glass Overlay for readability */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    backdropFilter: 'blur(20px) saturate(1.3)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                    backgroundColor: 'rgba(9, 9, 11, 0.4)',
                }}
            />
            {/* Noise Overlay */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    zIndex: 2,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                }}
            />
        </>
    );
});

BackgroundEffect.displayName = 'BackgroundEffect';

export default BackgroundEffect;
