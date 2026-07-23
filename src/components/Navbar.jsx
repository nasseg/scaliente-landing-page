'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowUpRight,
    BarChart3,
    BookOpen,
    Calculator,
    ChevronDown,
    CircleDollarSign,
    Coins,
    Crosshair,
    FileChartColumn,
    Menu,
    MessageSquareText,
    RadioTower,
    Store,
    X,
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import useHeaderTheme from '@/hooks/useHeaderTheme';
import { INBOX_PUBLIC } from '@/lib/public-release-flags';

const Navbar = ({ content, lang }) => {
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerTheme = useHeaderTheme();
    const desktopMenuRef = useRef(null);
    const megaMenuCloseTimerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileToggleRef = useRef(null);
    const dropdown = content?.dropdown || {};

    const featureGroups = [
        {
            title: dropdown.overviewGroup || 'Pilotage',
            links: [
                { label: dropdown.profitDashboard || 'Dashboard Profit', description: dropdown.profitDashboardDescription, href: `/${lang}/features/profit-dashboard`, icon: CircleDollarSign },
                { label: dropdown.productAnalytics || 'Analyse Produits', description: dropdown.productAnalyticsDescription, href: `/${lang}/features/product-analytics`, icon: BarChart3 },
                { label: dropdown.multiShop || 'Multi-Boutiques', description: dropdown.multiShopDescription, href: `/${lang}/features/multi-shop`, icon: Store },
            ],
        },
        {
            title: dropdown.acquisitionGroup || 'Acquisition',
            links: [
                { label: dropdown.adTracking || 'Suivi Ads', description: dropdown.adTrackingDescription, href: `/${lang}/features/ad-tracking`, icon: RadioTower },
                { label: dropdown.pixelAttribution || 'Pixel & attribution', description: dropdown.pixelAttributionDescription, href: `/${lang}/features/pixel-attribution`, icon: Crosshair, accent: true },
                { label: dropdown.multiCurrency || 'Multi-Devises', description: dropdown.multiCurrencyDescription, href: `/${lang}/features/multi-currency`, icon: Coins },
            ],
        },
        {
            title: dropdown.operationsGroup || 'Opérations',
            links: [
                { label: dropdown.reports || 'Rapports', description: dropdown.reportsDescription, href: `/${lang}/features/reports`, icon: FileChartColumn },
                {
                    label: dropdown.aiCustomerService || 'Service client IA',
                    description: dropdown.aiCustomerServiceDescription,
                    href: `/${lang}/features/ai-customer-service`,
                    icon: MessageSquareText,
                    badge: INBOX_PUBLIC ? undefined : (dropdown.closedBeta || 'Bêta fermée'),
                },
            ],
        },
    ];

    useEffect(() => {
        const onPointerDown = (event) => {
            if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) setMegaMenuOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMegaMenuOpen(false);
            }
        };
        document.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('keydown', onKeyDown);
            if (megaMenuCloseTimerRef.current) window.clearTimeout(megaMenuCloseTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        const toggleElement = mobileToggleRef.current;
        document.body.style.overflow = 'hidden';
        const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusFirst = window.requestAnimationFrame(() => {
            mobileMenuRef.current?.querySelector(focusableSelector)?.focus();
        });

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setMobileMenuOpen(false);
                return;
            }
            if (event.key !== 'Tab' || !mobileMenuRef.current) return;

            const focusable = [...mobileMenuRef.current.querySelectorAll(focusableSelector)];
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.cancelAnimationFrame(focusFirst);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            toggleElement?.focus();
        };
    }, [mobileMenuOpen]);

    const closeMobileMenu = () => setMobileMenuOpen(false);
    const openMegaMenu = () => {
        if (megaMenuCloseTimerRef.current) window.clearTimeout(megaMenuCloseTimerRef.current);
        setMegaMenuOpen(true);
    };
    const closeMegaMenu = () => {
        if (megaMenuCloseTimerRef.current) window.clearTimeout(megaMenuCloseTimerRef.current);
        setMegaMenuOpen(false);
    };
    const scheduleMegaMenuClose = () => {
        if (megaMenuCloseTimerRef.current) window.clearTimeout(megaMenuCloseTimerRef.current);
        megaMenuCloseTimerRef.current = window.setTimeout(() => setMegaMenuOpen(false), 140);
    };
    const isDarkHeader = headerTheme === 'dark';
    const navItemClass = `inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors ${isDarkHeader ? 'text-zinc-300 hover:bg-white/[0.08] hover:text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'}`;

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 text-zinc-950 sm:px-5 sm:pt-4" aria-label={content?.navigationLabel || 'Navigation principale'}>
                <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-5">
                    <Link href={`/${lang}`} data-analytics="nav_logo_click" data-analytics-location="header" className={`relative z-10 inline-flex h-14 shrink-0 items-center rounded-full px-4 shadow-[0_6px_8px_rgba(0,0,0,0.24)] transition-colors duration-300 ${isDarkHeader ? 'bg-[#0b0b0d]' : 'bg-[#fafafa]'}`} aria-label="Scaliente">
                        <span className="relative block h-7 w-[132px]" aria-hidden="true">
                            <Image src="/scaliente_horizontale.png" alt="" width={132} height={44} style={{ width: 'auto' }} className={`absolute left-1/2 top-1/2 h-8 max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-300 ${isDarkHeader ? 'opacity-100' : 'opacity-0'}`} priority />
                            <Image src="/scaliente-horizontal-dark.svg" alt="" width={132} height={31} style={{ width: 'auto' }} className={`absolute left-1/2 top-1/2 h-6 max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-300 ${isDarkHeader ? 'opacity-0' : 'opacity-100'}`} priority />
                        </span>
                    </Link>

                    <div className={`ml-auto hidden h-14 items-center gap-0.5 rounded-full p-1.5 pl-3 shadow-[0_6px_8px_rgba(0,0,0,0.24)] transition-colors duration-300 lg:flex ${isDarkHeader ? 'bg-[#0b0b0d]' : 'bg-[#fafafa]'}`}>
                    <div
                        className="flex items-center gap-0.5"
                        ref={desktopMenuRef}
                        data-testid="desktop-product-menu"
                        onPointerEnter={openMegaMenu}
                        onPointerLeave={scheduleMegaMenuClose}
                        onFocusCapture={openMegaMenu}
                        onBlurCapture={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) scheduleMegaMenuClose();
                        }}
                    >
                        <button
                            type="button"
                            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors ${megaMenuOpen ? (isDarkHeader ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white') : (isDarkHeader ? 'text-zinc-300 hover:bg-white/[0.08] hover:text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950')}`}
                            aria-expanded={megaMenuOpen}
                            aria-controls="desktop-mega-menu"
                        >
                            {content?.features || 'Produit'}
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                        <Link href={`/${lang}/compare/scaliente-vs-trueprofit`} className={navItemClass}>
                            {content?.comparison || 'Comparaison'}
                        </Link>
                        <Link href={`/${lang}/#pricing`} className={navItemClass}>
                            {content?.pricing || 'Tarifs'}
                        </Link>
                        <Link href={`/${lang}/#faq`} className={navItemClass}>
                            {content?.faq || 'FAQ'}
                        </Link>

                        <div
                            id="desktop-mega-menu"
                            aria-hidden={!megaMenuOpen}
                            inert={megaMenuOpen ? undefined : true}
                            className={`fixed left-1/2 top-[5.5rem] w-[min(94vw,1040px)] -translate-x-1/2 overflow-hidden rounded-[16px] shadow-[0_30px_70px_rgba(0,0,0,0.52)] transition-[opacity,visibility,transform,background-color] duration-200 ${megaMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'} ${isDarkHeader ? 'bg-[#111113]' : 'bg-[#fafafa]'}`}
                            role="group"
                            aria-label={content?.features || 'Produit'}
                        >
                                <div className={`grid grid-cols-3 gap-px ${isDarkHeader ? 'bg-white/[0.08]' : 'bg-zinc-200'}`}>
                                    {featureGroups.map((group) => (
                                        <div key={group.title} className={`p-5 ${isDarkHeader ? 'bg-[#111113]' : 'bg-[#fafafa]'}`}>
                                            <p className={`px-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${isDarkHeader ? 'text-zinc-500' : 'text-zinc-600'}`}>{group.title}</p>
                                            <div className="mt-3 space-y-1">
                                                {group.links.map(({ label, description, href, icon: Icon, badge, accent }) => {
                                                    const iconStyle = accent
                                                        ? 'border-orange-500/30 bg-orange-500/12 text-orange-500'
                                                        : isDarkHeader
                                                            ? 'border-white/[0.08] bg-white/[0.035] text-white/90'
                                                            : 'border-zinc-200 bg-white text-zinc-700';
                                                    return (
                                                    <Link key={href} href={href} onClick={closeMegaMenu} className={`group/link grid grid-cols-[2.25rem_1fr] gap-3 rounded-[11px] p-2 transition-colors ${isDarkHeader ? 'hover:bg-white/[0.055]' : 'hover:bg-zinc-100'}`}>
                                                        <span className={`flex h-9 w-9 items-center justify-center rounded-[9px] border ${iconStyle} transition-colors group-hover/link:border-orange-500/30 group-hover/link:text-orange-500`}>
                                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                                        </span>
                                                        <span className="min-w-0 pt-0.5">
                                                            <span className={`flex items-center gap-2 text-sm font-medium ${isDarkHeader ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                                                {label}
                                                                {badge && <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-2 py-0.5 text-[0.62rem] font-semibold text-orange-300">{badge}</span>}
                                                            </span>
                                                            {description && <span className={`mt-1 block text-xs leading-5 ${isDarkHeader ? 'text-zinc-500' : 'text-zinc-600'}`}>{description}</span>}
                                                        </span>
                                                    </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`grid border-t sm:grid-cols-2 ${isDarkHeader ? 'border-white/[0.08] bg-[#0d0d0f]' : 'border-zinc-200 bg-white'}`}>
                                <Link href={`/${lang}/tools/roas-calculator`} onClick={closeMegaMenu} className={`group flex items-center justify-between px-7 py-4 transition-colors ${isDarkHeader ? 'hover:bg-[#151517]' : 'hover:bg-zinc-100'}`}>
                                    <span className="flex items-center gap-3">
                                        <Calculator className="h-4 w-4 text-orange-400" aria-hidden="true" />
                                        <span>
                                            <span className={`block text-sm font-medium ${isDarkHeader ? 'text-white' : 'text-zinc-950'}`}>{dropdown.roasCalculator || 'Calculateur ROAS'}</span>
                                            {dropdown.roasCalculatorDescription && <span className={`mt-0.5 block text-xs ${isDarkHeader ? 'text-zinc-500' : 'text-zinc-600'}`}>{dropdown.roasCalculatorDescription}</span>}
                                        </span>
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" aria-hidden="true" />
                                </Link>
                                <Link href={`/${lang}/guides`} onClick={closeMegaMenu} className={`group flex items-center justify-between border-t px-7 py-4 transition-colors sm:border-l sm:border-t-0 ${isDarkHeader ? 'border-white/[0.08] hover:bg-[#151517]' : 'border-zinc-200 hover:bg-zinc-100'}`}>
                                    <span className="flex items-center gap-3">
                                        <BookOpen className="h-4 w-4 text-orange-400" aria-hidden="true" />
                                        <span className={`text-sm font-medium ${isDarkHeader ? 'text-white' : 'text-zinc-950'}`}>{content?.guides || 'Guides'}</span>
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" aria-hidden="true" />
                                </Link>
                                </div>
                        </div>
                    </div>

                    <div className={`ml-1 flex items-center gap-1 border-l pl-1 ${isDarkHeader ? 'border-white/[0.12]' : 'border-zinc-200'}`}>
                        <LanguageSelector currentLang={lang} position="bottom" theme={isDarkHeader ? 'dark' : 'light'} />
                        <a href="https://app.scaliente.com" data-analytics="login_click" data-analytics-location="header" className={`inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium transition-colors ${isDarkHeader ? 'text-zinc-300 hover:bg-white/[0.08] hover:text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'}`}>
                            {content?.login || 'Connexion'}
                        </a>
                        <a href="https://apps.shopify.com/scaliente" data-analytics="primary_cta_click" data-analytics-location="header" className="inline-flex min-h-10 items-center rounded-full bg-orange-500 px-4 text-sm font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0">
                            {content?.freeTrial || 'Essai Gratuit'}
                        </a>
                    </div>
                    </div>

                    <div className={`ml-auto flex h-14 items-center gap-1 rounded-full p-1.5 pl-2 shadow-[0_6px_8px_rgba(0,0,0,0.24)] transition-colors duration-300 lg:hidden ${isDarkHeader ? 'bg-[#0b0b0d]' : 'bg-[#fafafa]'}`}>
                        <LanguageSelector currentLang={lang} position="bottom" theme={isDarkHeader ? 'dark' : 'light'} />
                        <button
                            ref={mobileToggleRef}
                            type="button"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${isDarkHeader ? 'bg-white text-zinc-950 hover:bg-zinc-200' : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileMenuOpen ? (content?.closeMenu || 'Fermer le menu') : (content?.openMenu || 'Ouvrir le menu')}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <div
                ref={mobileMenuRef}
                id="mobile-menu"
                aria-hidden={!mobileMenuOpen}
                inert={mobileMenuOpen ? undefined : true}
                className={`fixed inset-0 z-40 overflow-y-auto bg-[#0a0a0c] px-4 pb-8 pt-24 text-white transition-[opacity,visibility] duration-200 lg:hidden ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                role="dialog"
                aria-modal="true"
                aria-label={content?.mobileMenuLabel || 'Menu mobile'}
            >
                    <div className="mx-auto flex min-h-full max-w-2xl flex-col">
                        <div className="border-b border-white/[0.08] pb-6">
                            <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-zinc-500">{content?.features || 'Produit'}</p>
                            <div className="mt-5 grid gap-6 sm:grid-cols-2">
                                {featureGroups.map((group) => (
                                    <div key={group.title}>
                                        <p className="px-1 text-xs font-semibold text-zinc-400">{group.title}</p>
                                        <div className="mt-2">
                                            {group.links.map(({ label, href, icon: Icon, badge }) => (
                                                <Link key={href} href={href} onClick={closeMobileMenu} className="flex min-h-12 items-center gap-3 border-b border-white/[0.06] py-2 text-sm text-zinc-100">
                                                    <Icon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
                                                    <span>{label}</span>
                                                    {badge && <span className="ml-auto rounded-full border border-orange-500/25 bg-orange-500/10 px-2 py-0.5 text-[0.62rem] font-semibold text-orange-300">{badge}</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 py-5">
                            <Link href={`/${lang}/compare/scaliente-vs-trueprofit`} onClick={closeMobileMenu} className="border-b border-white/[0.06] py-3 text-sm text-zinc-200">{content?.comparison}</Link>
                            <Link href={`/${lang}/#pricing`} onClick={closeMobileMenu} className="border-b border-white/[0.06] py-3 text-sm text-zinc-200">{content?.pricing}</Link>
                            <Link href={`/${lang}/#faq`} onClick={closeMobileMenu} className="border-b border-white/[0.06] py-3 text-sm text-zinc-200">{content?.faq}</Link>
                            <Link href={`/${lang}/tools/roas-calculator`} onClick={closeMobileMenu} className="border-b border-white/[0.06] py-3 text-sm text-orange-300">{dropdown.roasCalculator}</Link>
                            <Link href={`/${lang}/guides`} onClick={closeMobileMenu} className="border-b border-white/[0.06] py-3 text-sm text-orange-300">{content?.guides}</Link>
                        </div>

                        <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
                            <a href="https://app.scaliente.com" data-analytics="login_click" data-analytics-location="mobile_menu" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/[0.14] font-medium text-zinc-200">{content?.login}</a>
                            <a href="https://apps.shopify.com/scaliente" data-analytics="primary_cta_click" data-analytics-location="mobile_menu" className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-orange-500 font-semibold">{content?.freeTrial}</a>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default Navbar;
