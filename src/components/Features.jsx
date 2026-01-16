'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, DollarSign, Activity, Wallet, Settings, BarChart3 } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

const FeatureSection = ({ content }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{content?.title?.part1} <span className="text-orange-500">{content?.title?.part2}</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">{content?.description}</p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <FeatureCard
                        icon={<Layers className="text-purple-400" />}
                        title={content?.cards?.ads?.title}
                        desc={content?.cards?.ads?.desc}
                    />
                    <FeatureCard
                        icon={<DollarSign className="text-green-400" />}
                        title={content?.cards?.profit?.title}
                        desc={content?.cards?.profit?.desc}
                    />
                    <FeatureCard
                        icon={<Activity className="text-orange-400" />}
                        title={content?.cards?.realtime?.title}
                        desc={content?.cards?.realtime?.desc}
                    />
                    <FeatureCard
                        icon={<Wallet className="text-cyan-400" />}
                        title={content?.cards?.expenses?.title}
                        desc={content?.cards?.expenses?.desc}
                    />
                    <FeatureCard
                        icon={<Settings className="text-pink-400" />}
                        title={content?.cards?.wizard?.title}
                        desc={content?.cards?.wizard?.desc}
                    />
                    <FeatureCard
                        icon={<BarChart3 className="text-yellow-400" />}
                        title={content?.cards?.adsPage?.title}
                        desc={content?.cards?.adsPage?.desc}
                    />
                </div>

                {/* Profit Calculator - Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Section Label */}
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            {content?.howItWorks}
                        </span>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-12 gap-3 md:gap-4">
                        {/* CA Total - Full Width */}
                        <motion.div
                            variants={itemVariants}
                            className="col-span-12 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-bold">CA</div>
                                <span className="text-white text-sm font-medium">{content?.bento?.totalRevenue || "Chiffre d'affaires Total"}</span>
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-white">68,540.20 €</span>
                        </motion.div>

                        {/* Expenses Row - 2x2 Grid */}
                        <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
                            <div className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <span className="text-lg">−</span> {content?.bento?.ads || "Ads"}
                            </div>
                            <div className="text-lg md:text-xl font-bold text-red-400">8,340 €</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
                            <div className="text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <span className="text-lg">−</span> {content?.bento?.cogs || "COGS"}
                            </div>
                            <div className="text-lg md:text-xl font-bold text-orange-400">12,120 €</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
                            <div className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <span className="text-lg">−</span> {content?.bento?.shipping || "Shipping"}
                            </div>
                            <div className="text-lg md:text-xl font-bold text-yellow-400">18,750 €</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-6 md:col-span-3 bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4">
                            <div className="text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <span className="text-lg">−</span> {content?.bento?.fees || "Fees"}
                            </div>
                            <div className="text-lg md:text-xl font-bold text-purple-400">2,878 €</div>
                        </motion.div>

                        {/* Result - Full Width with Gradient */}
                        <motion.div
                            variants={itemVariants}
                            className="col-span-12 relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-[#15181E] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center text-green-400 font-bold">=</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">{content?.bento?.trueProfit || "Votre Vrai Profit"}</span>
                                            <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded">Scaliente</span>
                                        </div>
                                        <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">26,450.90 €</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
                                    <span className="text-gray-400 text-xs font-medium">{content?.bento?.margin || "Marge:"}</span>
                                    <span className="text-green-400 font-bold">38.6%</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection;
