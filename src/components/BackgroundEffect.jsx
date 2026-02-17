"use client";
import React, { useState, useEffect } from 'react';

const BackgroundEffect = React.memo(() => {
    const [showWebGL, setShowWebGL] = useState(false);

    useEffect(() => {
        // Skip WebGL on mobile and when reduced motion is preferred
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isMobile && !prefersReducedMotion) {
            setShowWebGL(true);
        }
    }, []);

    return (
        <>
            {showWebGL ? (
                <iframe
                    src="/bg_effect.html"
                    title="Background Effect"
                    loading="lazy"
                    className="fixed inset-0 w-full h-full border-0 pointer-events-none"
                    style={{ zIndex: 0 }}
                />
            ) : (
                /* CSS gradient fallback for mobile & reduced motion */
                <div
                    className="fixed inset-0 pointer-events-none"
                    style={{
                        zIndex: 0,
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59,130,246,0.05) 0%, transparent 50%), #09090b',
                    }}
                />
            )}
            {/* Frosted Glass Overlay */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    backdropFilter: 'blur(20px) saturate(1.3)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                    backgroundColor: 'rgba(9, 9, 11, 0.4)',
                }}
            />
        </>
    );
});

BackgroundEffect.displayName = 'BackgroundEffect';
export default BackgroundEffect;
