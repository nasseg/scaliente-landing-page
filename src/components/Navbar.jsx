'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ content, lang }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Smooth scroll to section
    const scrollToSection = useCallback((e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const navbarHeight = 80; // Account for fixed navbar
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
            });
        }
        setMobileMenuOpen(false);
    }, []);

    const navLinks = [
        { sectionId: 'features', label: content?.features || "Fonctionnalités" },
        { sectionId: 'pricing', label: content?.pricing || "Tarifs" },
        { sectionId: 'comparison', label: content?.comparison || "Avant/Après" },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-[#09090b]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.08]'
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

                        {/* Desktop Navigation Links - Center */}
                        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                            <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                {navLinks.map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => scrollToSection(e, link.sectionId)}
                                        className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200 cursor-pointer"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Right Side - Actions */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <LanguageSelector currentLang={lang} position="bottom" />

                            <a
                                href="https://app.scaliente.com"
                                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 px-4 py-2"
                            >
                                {content?.login || "Connexion"}
                            </a>

                            <a
                                href="https://app.scaliente.com"
                                className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300"
                            >
                                {/* Button gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-300" />
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-orange-400 to-orange-500" />
                                <span className="relative z-10">{content?.freeTrial || "Essai Gratuit"}</span>
                            </a>
                        </div>

                        {/* Mobile Right Side */}
                        <div className="flex lg:hidden items-center gap-2">
                            <LanguageSelector currentLang={lang} position="bottom" />

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-16 left-4 right-4 z-50 lg:hidden"
                        >
                            <div className="bg-[#18181b]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden">
                                {/* Navigation Links */}
                                <div className="p-4 space-y-1">
                                    {navLinks.map((link, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={(e) => scrollToSection(e, link.sectionId)}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="block w-full text-left px-4 py-3 text-base text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                                        >
                                            {link.label}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mx-4" />

                                {/* CTA Section */}
                                <div className="p-4 space-y-3">
                                    <a
                                        href="https://app.scaliente.com"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center px-4 py-3 text-zinc-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/[0.05]"
                                    >
                                        {content?.login || "Connexion"}
                                    </a>

                                    <a
                                        href="https://app.scaliente.com"
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
