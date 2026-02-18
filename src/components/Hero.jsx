'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, LayoutDashboard, TrendingUp, Wallet, FileText, Settings, DollarSign, Clock, RotateCcw, Percent, Users, Target, BarChart3, Sparkles } from 'lucide-react';

const Hero = ({ content, common }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 800], [0, 120]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Grain Texture Only - WebGL background shows through */}
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Subtle radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.03)_0%,transparent_70%)] pointer-events-none" />

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Badge - Enhanced */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-10"
                >
                    <div className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-orange-500/20 bg-orange-500/[0.05] backdrop-blur-sm hover:border-orange-500/30 hover:bg-orange-500/[0.08] transition-all duration-300 cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-sm text-orange-300 font-medium tracking-wide">{content?.pill}</span>
                        <Sparkles className="w-3.5 h-3.5 text-orange-400/70 group-hover:text-orange-400 transition-colors" />
                    </div>
                </motion.div>

                {/* Main Headline - Enhanced typography */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                >
                    <h1 className="font-brand text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.025em] text-white leading-[1.08] mb-3">
                        {content?.title}
                        <br />
                        <span className="text-gradient-orange">{content?.subtitle}</span>
                    </h1>
                </motion.div>

                {/* Description - Refined */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto mb-14 leading-relaxed font-light"
                >
                    {content?.description}
                </motion.p>

                {/* CTA Buttons - Enhanced with better hover effects */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                >
                    <a
                        href="https://apps.shopify.com/scaliente"
                        className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                    >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-300" />
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-b from-orange-400 to-orange-500" />
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        {/* Shadow */}
                        <div className="absolute inset-0 rounded-2xl shadow-[0_8px_32px_rgba(249,115,22,0.25)] group-hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition-shadow duration-300" />
                        <span className="relative z-10">{content?.ctaStart || common?.getStarted}</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#before-after"
                        className="group w-full sm:w-auto px-8 py-4 rounded-2xl text-white/90 font-medium border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 text-center relative overflow-hidden"
                    >
                        <span className="relative z-10">{content?.ctaDemo}</span>
                    </a>
                </motion.div>

                <motion.p variants={itemVariants} className="text-sm text-zinc-500 text-center mb-8">
                    {content?.microText}
                </motion.p>

                {/* Trust Indicators - Enhanced */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-8 text-sm text-zinc-500 mb-20"
                >
                    <div className="flex items-center gap-2.5 group">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-zinc-400">{common?.free || 'Gratuit'}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                    <div className="flex items-center gap-2.5 group">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-zinc-400">{common?.noCard || 'Aucune carte requise'}</span>
                    </div>
                </motion.div>

                {/* Dashboard Preview - Matching actual Scaliente app (light theme) */}
                <motion.div
                    style={{ y: y1, perspective: '2000px', perspectiveOrigin: 'center center' }}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto w-full max-w-5xl"
                >
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent rounded-[2.5rem] blur-3xl opacity-60 animate-pulse-glow" />

                    {/* Main Dashboard Card - Light Theme like actual app */}
                    <div
                        className="relative bg-[#fafafa] border border-zinc-200/50 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-black/20"
                    >
                        {/* Window Controls */}
                        <div className="flex items-center gap-2 px-5 py-3 bg-zinc-100/80 border-b border-zinc-200/50">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 bg-white rounded-lg text-xs text-zinc-500 font-medium border border-zinc-200/50">
                                    app.scaliente.com
                                </div>
                            </div>
                            <div className="w-16" />
                        </div>

                        {/* App Layout */}
                        <div className="flex">
                            {/* Sidebar */}
                            <div className="w-44 bg-white border-r border-zinc-100 p-4 hidden md:block">
                                {/* Logo */}
                                <div className="mb-6">
                                    <span className="font-brand font-bold text-lg text-zinc-900">Scaliente</span>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-1">
                                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-50 text-orange-600 font-medium text-sm border-l-2 border-orange-500">
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </a>
                                    <a className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg text-sm">
                                        <TrendingUp className="w-4 h-4" />
                                        Ads Insights
                                    </a>
                                    <a className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg text-sm">
                                        <DollarSign className="w-4 h-4" />
                                        Profit
                                    </a>
                                    <a className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg text-sm">
                                        <Wallet className="w-4 h-4" />
                                        Expenses
                                    </a>
                                    <a className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg text-sm">
                                        <FileText className="w-4 h-4" />
                                        Report
                                    </a>
                                    <a className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg text-sm">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </a>
                                </nav>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-5 bg-[#fafafa]">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <div className="font-brand text-2xl font-bold text-zinc-900 relative inline-block">
                                            Overview
                                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ transform: 'rotate(-2deg)' }}></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-sm text-zinc-600">
                                            <Clock className="w-4 h-4" />
                                            Last 30 days
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                            N
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics Grid - Matching actual app layout */}
                                <div className="grid grid-cols-12 gap-3">
                                    {/* NET PROFIT - Main Card with green gradient (like actual app) */}
                                    <div className="col-span-12 md:col-span-7 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-100 rounded-xl p-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-bl-full" />
                                        <div className="relative">
                                            <span className="inline-block px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded uppercase tracking-wide mb-2">
                                                Net Profit
                                            </span>
                                            <div className="flex items-end gap-2 mb-1">
                                                <span className="text-3xl md:text-4xl font-sans font-bold text-zinc-900">3 954,66 €</span>
                                                <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center mb-1">
                                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                                </div>
                                            </div>
                                            <p className="text-xs text-zinc-600 mb-3">Marge nette: <span className="text-emerald-600 font-semibold">20.8%</span></p>

                                            {/* Mini Chart */}
                                            <div className="h-10 flex items-end gap-0.5">
                                                {[30, 45, 35, 60, 40, 55, 50, 70, 45, 65, 55, 75].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 bg-gradient-to-t from-emerald-400/50 to-emerald-300/30 rounded-t"
                                                        style={{ height: `${h}%` }}
                                                    />
                                                ))}
                                            </div>

                                            {/* Bottom Stats */}
                                            <div className="flex gap-6 mt-3 pt-2 border-t border-emerald-100/50">
                                                <div>
                                                    <p className="text-[9px] text-zinc-500 uppercase tracking-wide">Supplier Costs</p>
                                                    <p className="text-xs font-semibold text-zinc-800">5 115,28 €</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-zinc-500 uppercase tracking-wide">Ad Spend</p>
                                                    <p className="text-xs font-semibold text-zinc-800">9 233,25 €</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column */}
                                    <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-3">
                                        {/* TOTAL REVENUE */}
                                        <div className="bg-white border border-zinc-100 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                                                    <DollarSign className="w-3 h-3 text-blue-500" />
                                                </div>
                                                <span className="text-[9px] text-zinc-500 uppercase tracking-wide font-medium">Total Revenue</span>
                                            </div>
                                            <p className="text-2xl font-sans font-bold text-zinc-900 mb-0.5">19 011,90 €</p>
                                            <p className="text-[10px] text-emerald-500 font-medium">470 orders</p>
                                        </div>

                                        {/* AVG ORDER + PENDING row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* AVG ORDER VALUE */}
                                            <div className="bg-white border border-zinc-100 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="w-5 h-5 bg-violet-50 rounded flex items-center justify-center">
                                                        <BarChart3 className="w-3 h-3 text-violet-500" />
                                                    </div>
                                                    <span className="text-[8px] text-zinc-500 uppercase tracking-wide font-medium">Avg Order</span>
                                                </div>
                                                <p className="text-lg font-sans font-bold text-zinc-900">40,45 €</p>
                                                <p className="text-[9px] text-zinc-400">From 470 orders</p>
                                            </div>

                                            {/* PENDING - Orange gradient */}
                                            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-100 rounded-xl p-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                                                        <Clock className="w-3 h-3 text-orange-500" />
                                                    </div>
                                                    <span className="text-[8px] text-orange-600 uppercase tracking-wide font-medium">Pending</span>
                                                </div>
                                                <p className="text-lg font-sans font-bold text-zinc-900">23</p>
                                                <p className="text-[9px] text-orange-500">5% of total</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Row - 4 cards */}
                                    {/* REFUNDED - Pink gradient */}
                                    <div className="col-span-6 md:col-span-3 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <RotateCcw className="w-3 h-3 text-pink-500" />
                                            <span className="text-[8px] text-pink-600 uppercase tracking-wide font-medium">Refunded</span>
                                        </div>
                                        <p className="text-base font-sans font-bold text-zinc-900">0,00 €</p>
                                        <p className="text-[9px] text-pink-400">0.0% of revenue</p>
                                    </div>

                                    {/* TRANSACTION FEES */}
                                    <div className="col-span-6 md:col-span-3 bg-white border border-zinc-100 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Percent className="w-3 h-3 text-zinc-400" />
                                            <span className="text-[8px] text-zinc-500 uppercase tracking-wide font-medium">Fees</span>
                                        </div>
                                        <p className="text-base font-sans font-bold text-zinc-900">708,71 €</p>
                                        <p className="text-[9px] text-zinc-400">3.7% of revenue</p>
                                    </div>

                                    {/* CUSTOMER LTV */}
                                    <div className="col-span-6 md:col-span-3 bg-white border border-zinc-100 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Users className="w-3 h-3 text-zinc-400" />
                                            <span className="text-[8px] text-zinc-500 uppercase tracking-wide font-medium">Customer LTV</span>
                                        </div>
                                        <p className="text-base font-sans font-bold text-zinc-900">0 €</p>
                                        <p className="text-[9px] text-zinc-400">No data yet</p>
                                    </div>

                                    {/* BREAKEVEN ROAS - Green gradient */}
                                    <div className="col-span-6 md:col-span-3 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Target className="w-3 h-3 text-emerald-500" />
                                            <span className="text-[8px] text-emerald-600 uppercase tracking-wide font-medium">Breakeven</span>
                                        </div>
                                        <p className="text-base font-sans font-bold text-zinc-900">1.37x</p>
                                        <p className="text-[9px] text-emerald-500">ROAS: 2.06x ✓</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-white/40 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
