"use client";
import React, { useState, useEffect } from 'react';

const BackgroundEffect = React.memo(() => {
    const [mode, setMode] = useState('loading'); // 'loading' | 'webgl' | 'video'

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isMobile && !prefersReducedMotion) {
            setMode('webgl');
        } else {
            setMode('video');
        }
    }, []);

    return (
        <>
            {mode === 'webgl' ? (
                <iframe
                    src="/bg_effect.html"
                    title="Background Effect"
                    loading="lazy"
                    className="fixed inset-0 w-full h-full border-0 pointer-events-none"
                    style={{ zIndex: 0 }}
                />
            ) : mode === 'video' ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="fixed inset-0 w-full h-full object-cover pointer-events-none"
                    style={{ zIndex: 0 }}
                >
                    <source src="/bg_effect_mobile.mp4" type="video/mp4" />
                </video>
            ) : null}
            {/* Frosted Glass Overlay — lighter on mobile to preserve video edge glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 1,
                    backdropFilter: mode === 'video' ? 'blur(12px) saturate(1.2)' : 'blur(20px) saturate(1.3)',
                    WebkitBackdropFilter: mode === 'video' ? 'blur(12px) saturate(1.2)' : 'blur(20px) saturate(1.3)',
                    backgroundColor: mode === 'video' ? 'rgba(9, 9, 11, 0.25)' : 'rgba(9, 9, 11, 0.4)',
                }}
            />
        </>
    );
});

BackgroundEffect.displayName = 'BackgroundEffect';
export default BackgroundEffect;
