'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ChevronDown, Calculator } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ content, lang, isHomePage = true }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navigateToSection = useCallback((e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 80;
            const pos = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: pos - navbarHeight, behavior: 'smooth' });
        } else {
            window.location.href = `/${lang}#${sectionId}`;
        }
        setMobileMenuOpen(false);
    }, [lang]);

    const handleDropdownEnter = () => {
        clearTimeout(timeoutRef.current);
        setDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
    };

    const dropdown = content?.dropdown || {};
    const featureLinks = [
        { label: dropdown.profitDashboard || 'Dashboard Profit', href: `/${lang}/features/profit-dashboard` },
        { label: dropdown.adTracking || 'Suivi Ads', href: `/${lang}/features/ad-tracking` },
        { label: dropdown.productAnalytics || 'Analyse Produits', href: `/${lang}/features/product-analytics` },
        { label: dropdown.multiShop || 'Multi-Boutiques', href: `/${lang}/features/multi-shop` },
        { label: dropdown.multiCurrency || 'Multi-Devises', href: `/${lang}/features/multi-currency` },
        { label: dropdown.reports || 'Rapports', href: `/${lang}/features/reports` },
    ];
    const calculatorLink = { label: dropdown.roasCalculator || 'Calculateur ROAS', href: `/${lang}/tools/roas-calculator` };

    const pillClass = "px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200 cursor-pointer";

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-[#09090b]/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.08]'
                    : 'bg-transparent'
            }`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="h-16 sm:h-18 flex items-center justify-between">
                        {/* Logo */}
                        <a href={`/${lang}`} className="flex items-center shrink-0">
                            <Image
                                src="/scaliente_horizontale.png"
                                alt="Scaliente"
                                width={140}
                                height={36}
                                className="h-7 sm:h-8 w-auto"
                                priority
                            />
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center justify-center flex-1 mx-8 gap-4">
                            <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                {/* Features Dropdown */}
                                <div
                                    ref={dropdownRef}
                                    className="relative"
                                    onMouseEnter={handleDropdownEnter}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button className={`${pillClass} flex items-center gap-1`}>
                                        {content?.features || "Fonctionnalités"}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                className="absolute top-full left-0 mt-2 w-56 py-2 bg-[#18181b]/95 backdrop-blur-xl rounded-xl border border-white/[0.1] shadow-2xl shadow-black/50"
                                            >
                                                {featureLinks.map((item, i) => (
                                                    <a
                                                        key={i}
                                                        href={item.href}
                                                        className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
                                                    >
                                                        {item.label}
                                                    </a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Comparaison - page link */}
                                <a
                                    href={`/${lang}/compare/scaliente-vs-trueprofit`}
                                    className={pillClass}
                                >
                                    {content?.comparison || "Comparaison"}
                                </a>

                                {/* Tarifs - anchor */}
                                <button
                                    onClick={(e) => navigateToSection(e, 'pricing')}
                                    className={pillClass}
                                >
                                    {content?.pricing || "Tarifs"}
                                </button>

                                {/* FAQ - anchor */}
                                <button
                                    onClick={(e) => navigateToSection(e, 'faq')}
                                    className={pillClass}
                                >
                                    {content?.faq || "FAQ"}
                                </button>
                            </div>

                            {/* ROAS Calculator pill */}
                            <a
                                href={calculatorLink.href}
                                className="bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/15 px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5"
                            >
                                <Calculator className="w-3.5 h-3.5" />
                                {calculatorLink.label}
                            </a>
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <LanguageSelector currentLang={lang} position="bottom" />

                            <a
                                href="https://app.scaliente.com"
                                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2"
                            >
                                {content?.login || "Connexion"}
                            </a>

                            <a
                                href="https://apps.shopify.com/scaliente"
                                className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-300" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-orange-400 to-orange-500" />
                                <span className="relative z-10">{content?.freeTrial || "Essai Gratuit"}</span>
                            </a>
                        </div>

                        {/* Mobile Right Side */}
                        <div className="flex lg:hidden items-center gap-2">
                            <LanguageSelector currentLang={lang} position="bottom" />
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-16 left-4 right-4 z-50 lg:hidden"
                        >
                            <div className="bg-[#18181b]/90 backdrop-blur-xl rounded-2xl border border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden">
                                <div className="p-4 space-y-1">
                                    {/* Features accordion */}
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0 }}
                                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                        className="flex items-center justify-between w-full text-left px-4 py-3 text-base text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                                    >
                                        {content?.features || "Fonctionnalités"}
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                                    </motion.button>

                                    <AnimatePresence>
                                        {mobileDropdownOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-4 space-y-0.5">
                                                    {featureLinks.map((item, i) => (
                                                        <a
                                                            key={i}
                                                            href={item.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors duration-150"
                                                        >
                                                            {item.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* ROAS Calculator */}
                                    <motion.a
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 }}
                                        href={calculatorLink.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-base font-medium text-orange-400 hover:text-orange-300 bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/10 rounded-xl transition-all duration-200"
                                    >
                                        <Calculator className="w-4 h-4" />
                                        {calculatorLink.label}
                                    </motion.a>

                                    {/* Comparaison */}
                                    <motion.a
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        href={`/${lang}/compare/scaliente-vs-trueprofit`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-left px-4 py-3 text-base text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                                    >
                                        {content?.comparison || "Comparaison"}
                                    </motion.a>

                                    {/* Tarifs */}
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 }}
                                        onClick={(e) => navigateToSection(e, 'pricing')}
                                        className="block w-full text-left px-4 py-3 text-base text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                                    >
                                        {content?.pricing || "Tarifs"}
                                    </motion.button>

                                    {/* FAQ */}
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={(e) => navigateToSection(e, 'faq')}
                                        className="block w-full text-left px-4 py-3 text-base text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                                    >
                                        {content?.faq || "FAQ"}
                                    </motion.button>
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mx-4" />

                                <div className="p-4 space-y-3">
                                    <a
                                        href="https://app.scaliente.com"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-4 py-3 text-zinc-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/[0.05]"
                                    >
                                        {content?.login || "Connexion"}
                                    </a>
                                    <a
                                        href="https://apps.shopify.com/scaliente"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-6 py-3.5 bg-gradient-to-b from-orange-500 to-orange-600 rounded-xl text-base font-semibold text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300"
                                    >
                                        {content?.freeTrial || "Essai Gratuit"}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
