'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import {
    buildCarouselSlots,
    frameToStyle,
    getCarouselFrame,
    getCarouselSpeed,
} from '@/lib/heroCarousel';
import { INBOX_PUBLIC } from '@/lib/public-release-flags';

const coreProductScreens = [
    {
        src: '/desktop_dashboard_overview_anonymized.png',
        width: 3024,
        height: 1566,
        type: 'overview',
    },
    {
        src: '/desktop_dashboard_profit_anonymized.png',
        width: 1512,
        height: 828,
        type: 'profit',
    },
    {
        src: '/desktop_dashboard_report_anonymized.png',
        width: 1512,
        height: 828,
        type: 'report',
    },
    {
        src: '/desktop_dashboard_ads_overview_anonymized.png',
        width: 3020,
        height: 1544,
    },
    {
        src: '/desktop_dashboard_ads_meta_anonymized.png',
        width: 3024,
        height: 1548,
    },
    {
        src: '/desktop_dashboard_ads_google_anonymized.png',
        width: 3020,
        height: 1552,
    },
];

const productScreens = [
    ...coreProductScreens,
    ...(INBOX_PUBLIC ? [{
        src: '/inbox-ai-demo-anonymized.png',
        width: 1512,
        height: 828,
        type: 'inbox',
    }] : []),
];

const carouselSlots = buildCarouselSlots(productScreens);
const AUTO_SPEED = getCarouselSpeed(carouselSlots.length);

const HeroProductCarousel = ({ imageAlt, screenAlts = {} }) => {
    const stageRef = useRef(null);
    const cardRefs = useRef([]);
    const progressRef = useRef(0);
    const isVisibleRef = useRef(false);
    const isDocumentVisibleRef = useRef(true);
    const reducedMotionRef = useRef(false);

    const paintCards = useCallback((progress) => {
        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const style = frameToStyle(getCarouselFrame(index, progress, carouselSlots.length, reducedMotionRef.current));
            card.style.zIndex = String(style.zIndex);
            card.style.opacity = String(style.opacity);
            card.style.transform = style.transform;
            card.style.pointerEvents = style.pointerEvents;
        });
    }, []);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionRef.current = reducedMotion.matches;
        paintCards(progressRef.current);
        if (reducedMotion.matches) return undefined;

        let animationFrame = 0;
        let previousTime = performance.now();

        const stopLoop = () => {
            if (!animationFrame) return;
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        };

        const animate = (time) => {
            animationFrame = 0;
            if (!isVisibleRef.current || !isDocumentVisibleRef.current) return;

            const delta = time - previousTime;
            previousTime = time;
            progressRef.current = (progressRef.current + AUTO_SPEED * delta) % 1;
            paintCards(progressRef.current);
            animationFrame = window.requestAnimationFrame(animate);
        };

        const startLoop = () => {
            if (animationFrame || !isVisibleRef.current || !isDocumentVisibleRef.current) return;
            previousTime = performance.now();
            animationFrame = window.requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(([entry]) => {
            isVisibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting) startLoop();
            else stopLoop();
        }, { rootMargin: '12%' });
        if (stageRef.current) observer.observe(stageRef.current);

        const handleVisibility = () => {
            isDocumentVisibleRef.current = document.visibilityState === 'visible';
            if (isDocumentVisibleRef.current) startLoop();
            else stopLoop();
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
            stopLoop();
        };
    }, [paintCards]);

    return (
        <figure ref={stageRef} className="hero-stage relative min-w-0 lg:inset-auto" aria-label={imageAlt}>
            <div className="pointer-events-none absolute inset-x-[12%] top-[20%] h-[48%] bg-orange-500/[0.09] blur-3xl" aria-hidden="true" />

            <div className="-mx-5 mt-5 w-screen max-w-[100vw] overflow-hidden sm:-mx-8 lg:hidden" aria-hidden="true">
                <div
                    className="hero-product-mobile-flow flex w-max will-change-transform"
                    style={{ '--hero-mobile-duration': `${productScreens.length * 5.5}s` }}
                >
                    {[0, 1].map((copyIndex) => (
                        <div key={`mobile-group-${copyIndex}`} className="flex flex-none gap-3 pr-3 sm:gap-4 sm:pr-4">
                            {productScreens.map((screen, screenIndex) => (
                                <div
                                    key={`mobile-${copyIndex}-${screen.src}`}
                                    className="w-[260px] flex-none overflow-hidden rounded-[16px] bg-zinc-950 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/10 sm:w-[320px]"
                                >
                                    <Image
                                        src={screen.src}
                                        alt=""
                                        width={screen.width}
                                        height={screen.height}
                                        sizes="(max-width: 640px) 260px, 320px"
                                        className="h-auto w-full"
                                        loading={copyIndex === 0 && screenIndex === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="relative mx-auto hidden h-[clamp(32rem,68dvh,44rem)] w-full max-w-[650px] select-none lg:block"
                style={{ perspective: '3400px' }}
                aria-label={imageAlt}
            >
                <div
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d', transform: 'rotateX(3deg) rotateY(-4deg)' }}
                >
                    {carouselSlots.map((screen, index) => (
                        <div
                            key={`${screen.src}-${screen.slotIndex}`}
                            ref={(node) => { cardRefs.current[index] = node; }}
                            className="absolute left-1/2 top-1/2 w-[62%] will-change-[transform,opacity]"
                            style={frameToStyle(getCarouselFrame(index, 0, carouselSlots.length))}
                        >
                            <Image
                                src={screen.src}
                                alt={screen.slotIndex < productScreens.length
                                    ? (screen.type && screenAlts[screen.type]
                                        ? screenAlts[screen.type]
                                        : `${imageAlt} ${screen.sourceIndex + 1}`)
                                    : ''}
                                width={screen.width}
                                height={screen.height}
                                sizes="(max-width: 1536px) 42vw, 620px"
                                className="h-auto w-full rounded-[18px] shadow-[0_28px_60px_-28px_rgba(0,0,0,0.68)] ring-1 ring-white/10"
                                decoding="async"
                                loading={index < 2 ? 'eager' : 'lazy'}
                                fetchPriority={index === 0 ? 'high' : 'auto'}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </figure>
    );
};

export default HeroProductCarousel;
