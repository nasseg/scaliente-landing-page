'use client';
import { motion } from 'framer-motion';
import { Layers, DollarSign, Activity, Wallet, Settings, BarChart3 } from 'lucide-react';

const FeatureSection = ({ content }) => {
    const features = [
        {
            icon: Layers,
            color: 'purple',
            title: content?.cards?.ads?.title,
            desc: content?.cards?.ads?.desc,
        },
        {
            icon: DollarSign,
            color: 'green',
            title: content?.cards?.profit?.title,
            desc: content?.cards?.profit?.desc,
        },
        {
            icon: Activity,
            color: 'orange',
            title: content?.cards?.realtime?.title,
            desc: content?.cards?.realtime?.desc,
        },
        {
            icon: Wallet,
            color: 'cyan',
            title: content?.cards?.expenses?.title,
            desc: content?.cards?.expenses?.desc,
        },
        {
            icon: Settings,
            color: 'pink',
            title: content?.cards?.wizard?.title,
            desc: content?.cards?.wizard?.desc,
        },
        {
            icon: BarChart3,
            color: 'amber',
            title: content?.cards?.adsPage?.title,
            desc: content?.cards?.adsPage?.desc,
        },
    ];

    const colorMap = {
        purple: {
            bg: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            text: 'text-purple-600',
            border: 'group-hover:border-purple-200',
            glow: 'group-hover:shadow-purple-100/50'
        },
        green: {
            bg: 'bg-emerald-50',
            iconBg: 'bg-emerald-100',
            text: 'text-emerald-600',
            border: 'group-hover:border-emerald-200',
            glow: 'group-hover:shadow-emerald-100/50'
        },
        orange: {
            bg: 'bg-orange-50',
            iconBg: 'bg-orange-100',
            text: 'text-orange-600',
            border: 'group-hover:border-orange-200',
            glow: 'group-hover:shadow-orange-100/50'
        },
        cyan: {
            bg: 'bg-cyan-50',
            iconBg: 'bg-cyan-100',
            text: 'text-cyan-600',
            border: 'group-hover:border-cyan-200',
            glow: 'group-hover:shadow-cyan-100/50'
        },
        pink: {
            bg: 'bg-pink-50',
            iconBg: 'bg-pink-100',
            text: 'text-pink-600',
            border: 'group-hover:border-pink-200',
            glow: 'group-hover:shadow-pink-100/50'
        },
        amber: {
            bg: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            text: 'text-amber-600',
            border: 'group-hover:border-amber-200',
            glow: 'group-hover:shadow-amber-100/50'
        },
    };

    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <h2 className="font-brand text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-6 tracking-[-0.025em]">
                        {content?.title?.part1}{' '}
                        <span className="text-orange-500">{content?.title?.part2}</span>
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        {content?.description}
                    </p>
                </motion.div>

                {/* Feature Grid - Enhanced Bento Style */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, idx) => {
                        const colors = colorMap[feature.color];
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={`group relative p-7 rounded-2xl bg-white border border-zinc-100 hover:border-zinc-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${colors.glow} ${colors.border}`}
                            >
                                {/* Subtle gradient overlay on hover */}
                                <div className={`absolute inset-0 rounded-2xl ${colors.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                                <div className="relative">
                                    <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                        <feature.icon className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <h3 className="font-brand text-xl font-semibold text-zinc-900 mb-3 tracking-[-0.01em]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Profit Calculator - Premium Bento Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Label */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            {content?.howItWorks}
                        </span>
                    </div>

                    {/* Calculator Grid */}
                    <div className="grid grid-cols-12 gap-3">
                        {/* Revenue - Full Width */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="col-span-12 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-brand font-bold text-sm">CA</span>
                                </div>
                                <span className="text-zinc-800 font-medium">{content?.bento?.totalRevenue || "Chiffre d'affaires Total"}</span>
                            </div>
                            <span className="text-2xl md:text-3xl font-sans font-bold text-zinc-900 number-display">68,540 €</span>
                        </motion.div>

                        {/* Expenses Row */}
                        {[
                            { label: content?.bento?.ads || "Ads", value: "8,340 €", bgClass: 'bg-red-50', borderClass: 'border-red-200', text: 'text-red-600' },
                            { label: content?.bento?.cogs || "COGS", value: "12,120 €", bgClass: 'bg-orange-50', borderClass: 'border-orange-200', text: 'text-orange-600' },
                            { label: content?.bento?.shipping || "Shipping", value: "18,750 €", bgClass: 'bg-amber-50', borderClass: 'border-amber-200', text: 'text-amber-600' },
                            { label: content?.bento?.fees || "Fees", value: "2,878 €", bgClass: 'bg-purple-50', borderClass: 'border-purple-200', text: 'text-purple-600' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                                className={`col-span-6 md:col-span-3 rounded-2xl p-4 border ${item.bgClass} ${item.borderClass}`}
                            >
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="text-lg text-zinc-400">−</span>
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${item.text}`}>{item.label}</span>
                                </div>
                                <span className={`text-xl font-sans font-bold ${item.text} number-display`}>{item.value}</span>
                            </motion.div>
                        ))}

                        {/* Result - Full Width with Premium Styling */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="col-span-12 relative group"
                        >
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-300/40 via-amber-300/30 to-orange-300/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

                            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center">
                                        <span className="text-green-400 font-brand font-bold text-xl">=</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-zinc-400 text-sm font-medium">
                                                {content?.bento?.trueProfit || "Votre Vrai Profit"}
                                            </span>
                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/20 border border-orange-500/30 rounded-md">
                                                Scaliente
                                            </span>
                                        </div>
                                        <span className="text-3xl md:text-4xl font-sans font-bold text-gradient-orange number-display">
                                            26,450 €
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 bg-green-500/15 border border-green-500/30 rounded-xl">
                                        <span className="text-zinc-400 text-sm mr-2">{content?.bento?.margin || "Marge:"}</span>
                                        <span className="text-green-400 font-bold font-sans">38.6%</span>
                                    </div>
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
