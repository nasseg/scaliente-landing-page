'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, LayoutDashboard, BarChart3, Package, Layers, CreditCard } from 'lucide-react';
import AnimatedGrid from './ui/AnimatedGrid';
import Image from 'next/image';

const Hero = ({ content, common }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
            <AnimatedGrid />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    {content?.pill}
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                    {content?.title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
                        {content?.subtitle}
                    </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    {content?.description}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col items-center gap-4 mb-20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://app.scaliente.com" className="cta-animated-border w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2 group">
                            {common?.getStarted || content?.ctaStart}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="/#comparison" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all backdrop-blur-sm text-center">
                            {content?.ctaDemo}
                        </a>
                    </div>
                    {/* Free Badge */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{common?.free || 'Gratuit'}</span>
                        <span className="text-gray-600">•</span>
                        <span>{common?.noCard || 'Aucune carte requise'}</span>
                    </div>
                </motion.div>

                {/* Dashboard Visualization with Beam Effect */}
                <motion.div style={{ y: y1, rotateX: 10 }} className="relative mx-auto w-full max-w-6xl perspective-1000 block">
                    {/* Glow Effect behind dashboard */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>

                    {/* Main Container - Consistent Dark Theme */}
                    <div className="relative bg-[#0F1115] border border-white/10 rounded-[2rem] md:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col md:flex-row text-left font-sans h-[650px] md:h-auto">

                        {/* Sidebar (Desktop Only) */}
                        <div className="hidden md:flex w-20 lg:w-64 border-r border-white/5 bg-[#0F1115] flex-col justify-between py-6">
                            <div className="space-y-6 px-4">
                                {/* Logo Area */}
                                <div className="flex items-center px-2 mb-8">
                                    <Image
                                        src="/scaliente_horizontale.png"
                                        alt="Scaliente"
                                        width={160}
                                        height={40}
                                        className="h-10 w-auto hidden lg:block"
                                    />
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center shrink-0 lg:hidden">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <nav className="space-y-1">
                                    {[
                                        { icon: LayoutDashboard, label: content?.dashboard?.menu?.dashboard || 'Dashboard', active: true },
                                        { icon: BarChart3, label: content?.dashboard?.menu?.adsInsights || 'Ads Insights', active: false },
                                        { icon: CreditCard, label: content?.dashboard?.menu?.profit || 'Bénéfice', active: false },
                                        { icon: Package, label: content?.dashboard?.menu?.inbox || 'Inbox', active: false },
                                        { icon: Layers, label: content?.dashboard?.menu?.settings || 'Paramètres', active: false },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-orange-500/10 text-orange-500 border-l-2 border-orange-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                            <item.icon className="w-5 h-5" />
                                            <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="px-6 py-4 border-t border-white/5">
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    <span className="hidden lg:block text-sm">{content?.dashboard?.menu?.logout || 'Se déconnecter'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 bg-[#0F1115] text-white relative w-full flex flex-col">
                            {/* Top Header */}
                            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-[#0F1115]">
                                <div className="block md:hidden text-lg font-bold text-white">{content?.dashboard?.menu?.dashboard || 'Dashboard'}</div>
                                <div className="hidden md:block"></div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-[#1A1D24] border border-white/10 px-3 py-1.5 rounded-lg">
                                        <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-pink-600 rounded text-[10px] flex items-center justify-center text-white font-bold">S</div>
                                        <span className="text-sm font-medium text-gray-300 hidden sm:block">{content?.dashboard?.menu?.store || 'Store'}</span>
                                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/10">N</div>
                                </div>
                            </div>

                            {/* Mobile Date Filter (Dark) */}
                            <div className="md:hidden px-6 pt-6 pb-2">
                                <div className="bg-[#1A1D24] border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3 text-gray-300 font-medium">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {content?.dashboard?.today || "Aujourd'hui"}
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            {/* Scrollable Dashboard Area - Unified */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 pb-28 md:pb-8">
                                <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{content?.dashboard?.overview || "Vue d'ensemble"}</h2>
                                        <p className="text-gray-400 text-sm md:text-base">{content?.dashboard?.performance || "Vos performances en temps réel"}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#1A1D24] border border-white/10 rounded-lg p-1 self-start sm:self-auto">
                                        <button className="px-3 md:px-4 py-1.5 bg-white text-black rounded text-xs md:text-sm font-bold shadow-sm">{content?.dashboard?.today || "Aujourd'hui"}</button>
                                        <button className="px-3 md:px-4 py-1.5 text-gray-400 hover:text-white text-xs md:text-sm font-medium transition-colors">{content?.dashboard?.yesterday || "Hier"}</button>
                                    </div>
                                </div>

                                {/* Cards Grid - Unified */}
                                <div className="grid grid-cols-12 gap-4 md:gap-6">

                                    {/* CA TOTAL - Top Row, Full Width */}
                                    <div className="col-span-12 bg-[#15181E] border border-white/5 rounded-3xl p-6 flex justify-between items-center">
                                        <div>
                                            <div className="text-blue-400 text-xs font-bold uppercase mb-2">{content?.dashboard?.totalRevenue || "CA Total"}</div>
                                            <div className="text-3xl md:text-4xl font-bold text-white">68,540.20 €</div>
                                        </div>
                                    </div>

                                    {/* BÉNÉFICE NET - Left Column of Bottom Section */}
                                    <div className="col-span-12 lg:col-span-7 bg-[#15181E] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between">
                                        <div className="absolute right-0 top-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">{content?.dashboard?.netProfit || "Bénéfice Net"}</div>
                                            <div className="p-3 bg-white/5 rounded-full">
                                                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                        </div>

                                        <div className="mb-2 relative z-10">
                                            <span className="text-4xl md:text-6xl font-bold text-white tracking-tight whitespace-nowrap">21,450.90 €</span>
                                        </div>
                                        <div className="mb-8 flex items-center gap-2 relative z-10">
                                            <span className="text-gray-400 font-medium">{content?.dashboard?.netMargin || "Marge nette:"}</span>
                                            <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded text-sm">34.2%</span>
                                        </div>

                                        {/* Graph Curve */}
                                        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 pointer-events-none">
                                            <svg className="w-full h-full" preserveAspectRatio="none">
                                                <path d="M0,80 C100,70 200,90 300,50 S500,20 600,60 S800,40 1000,10 L1000,120 L0,120 Z" fill="url(#greenGradient)" />
                                                <path d="M0,80 C100,70 200,90 300,50 S500,20 600,60 S800,40 1000,10" fill="none" stroke="#4ade80" strokeWidth="3" />
                                                <defs>
                                                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#4ade8050" />
                                                        <stop offset="100%" stopColor="#4ade8000" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 relative z-10 mt-auto pt-8">
                                            <div>
                                                <div className="text-gray-500 text-xs font-bold uppercase mb-1">{content?.dashboard?.supplierCosts || "Coûts Fournisseur"}</div>
                                                <div className="text-lg md:text-xl font-bold text-white">12,120.45 €</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-xs font-bold uppercase mb-1">{content?.dashboard?.adSpend || "Dépenses Ads"}</div>
                                                <div className="text-lg md:text-xl font-bold text-white">8,340.20 €</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT COLUMN - Panier & En Attente */}
                                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 md:gap-6">
                                        <div className="bg-[#15181E] border border-white/5 rounded-3xl p-6 flex flex-col justify-between flex-1 min-h-[160px]">
                                            <div className="flex justify-between items-start">
                                                <div className="text-purple-400 text-xs font-bold uppercase">{content?.dashboard?.avgOrderValue || "Panier Moyen"}</div>
                                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold text-white">55.27 €</div>
                                        </div>

                                        <div className="bg-[#15181E] border border-white/5 rounded-3xl p-6 flex flex-col justify-between flex-1 min-h-[160px]">
                                            <div className="flex justify-between items-start">
                                                <div className="text-orange-400 text-xs font-bold uppercase">{content?.dashboard?.pending || "En Attente"}</div>
                                                <div className="p-2 bg-orange-500/10 rounded-lg">
                                                    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold text-white">42</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Mobile Bottom Navigation */}
                            <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1D24] px-6 py-3 rounded-full flex gap-8 items-center shadow-2xl z-20 border border-white/10">
                                <div className="p-2 bg-white/20 rounded-lg text-white">
                                    <LayoutDashboard className="w-5 h-5" />
                                </div>
                                <div className="text-gray-500">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <div className="text-gray-500">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div className="text-gray-500">
                                    <Layers className="w-5 h-5" />
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
