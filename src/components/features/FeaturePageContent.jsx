'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp, Percent, CalendarRange, LayoutGrid, Zap, PieChart,
    Layers, Target, Activity, BarChart3, ArrowLeftRight, DollarSign,
    Package, Globe, Coins, Clock, RefreshCw, Shield, FileText,
    Download, Users, AlertTriangle
} from 'lucide-react';
import { containerVariants, itemVariants, fadeInUp } from '@/lib/animations';
import CTAButton from '@/components/ui/CTAButton';
import Link from 'next/link';

const ICON_MAP = {
    TrendingUp, Percent, CalendarRange, LayoutGrid, Zap, PieChart,
    Layers, Target, Activity, BarChart3, ArrowLeftRight, DollarSign,
    Package, Globe, Coins, Clock, RefreshCw, Shield, FileText,
    Download, Users, AlertTriangle
};

const COLORS = [
    { bg: 'bg-emerald-500/10', iconBg: 'bg-emerald-500/15', text: 'text-emerald-500', border: 'border-emerald-500/20' },
    { bg: 'bg-blue-500/10', iconBg: 'bg-blue-500/15', text: 'text-blue-500', border: 'border-blue-500/20' },
    { bg: 'bg-orange-500/10', iconBg: 'bg-orange-500/15', text: 'text-orange-500', border: 'border-orange-500/20' },
    { bg: 'bg-purple-500/10', iconBg: 'bg-purple-500/15', text: 'text-purple-500', border: 'border-purple-500/20' },
    { bg: 'bg-cyan-500/10', iconBg: 'bg-cyan-500/15', text: 'text-cyan-500', border: 'border-cyan-500/20' },
    { bg: 'bg-amber-500/10', iconBg: 'bg-amber-500/15', text: 'text-amber-500', border: 'border-amber-500/20' },
];

function getIcon(name) {
    return ICON_MAP[name] || Zap;
}

export default function FeaturePageContent({ page, common, lang, slug }) {
    const problem = page.problem;
    const solution = page.solution;
    const features = Array.isArray(page.features) ? page.features : [];
    const howItWorks = page.howItWorks;
    const finalCta = page.finalCta;
    const points = Array.isArray(problem?.points) ? problem.points : [];

    return (
        <>
            {/* Section 1 — Problem */}
            {problem && (
                <section className="py-20 bg-[#fafafa]">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div {...fadeInUp} className="text-center mb-12">
                            {problem.badge && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-red-200 bg-red-50 text-red-600">
                                    <AlertTriangle className="w-4 h-4" />
                                    {problem.badge}
                                </span>
                            )}
                            <h2 className="font-brand text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                                {problem.title}
                            </h2>
                            {problem.subtitle && (
                                <p className="text-lg text-zinc-500 max-w-2xl mx-auto">{problem.subtitle}</p>
                            )}
                        </motion.div>

                        {points.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid md:grid-cols-3 gap-6"
                            >
                                {points.map((point, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-red-200 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                                            <span className="text-red-500 font-bold text-lg">{i + 1}</span>
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 mb-2">{point.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{point.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* Section 2 — Solution */}
            {solution && (
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.div {...fadeInUp} className="text-center">
                            {solution.badge && (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-200 bg-orange-50 text-orange-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    {solution.badge}
                                </span>
                            )}
                            <h2 className="font-brand text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                                {solution.title}{' '}
                                {solution.titleHighlight && (
                                    <span className="text-orange-500">{solution.titleHighlight}</span>
                                )}
                            </h2>
                            <p className="text-lg text-zinc-500 leading-relaxed">{solution.description}</p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Section 3 — Features Grid */}
            {features.length > 0 && (
                <section className="py-20 bg-[#fafafa]">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {features.map((feature, i) => {
                                const color = COLORS[i % COLORS.length];
                                const Icon = getIcon(feature.icon);
                                return (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className={`bg-white rounded-2xl p-6 border ${color.border} hover:shadow-lg transition-all duration-300`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${color.iconBg} flex items-center justify-center mb-4`}>
                                            <Icon className={`w-6 h-6 ${color.text}`} />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 mb-2 text-lg">{feature.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Section 4 — How It Works */}
            {howItWorks && (
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.div {...fadeInUp} className="text-center mb-14">
                            <h2 className="font-brand text-3xl md:text-4xl font-bold text-zinc-900">
                                {howItWorks.title}{' '}
                                {howItWorks.titleHighlight && (
                                    <span className="text-orange-500">{howItWorks.titleHighlight}</span>
                                )}
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {Array.isArray(howItWorks.steps) && howItWorks.steps.map((step, i) => (
                                <motion.div key={i} variants={itemVariants} className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-semibold text-zinc-900 mb-2">{step.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Section 5 — Final CTA */}
            {finalCta && (
                <section className="py-20 bg-[#fafafa]">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="font-brand text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                                {finalCta.title}
                            </h2>
                            {finalCta.subtitle && (
                                <p className="text-lg text-zinc-500 mb-8 max-w-xl mx-auto">{finalCta.subtitle}</p>
                            )}
                            <CTAButton variant="ghost" size="md">
                                {common?.getStarted || 'Start Free'}
                            </CTAButton>
                            <p className="mt-4 text-sm text-zinc-400">{common?.noCard || 'No credit card required'}</p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Related Features */}
            <section className="py-16 bg-white border-t border-zinc-100">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="font-brand text-2xl font-bold text-zinc-900 mb-8 text-center">
                        {common?.relatedFeatures || 'Explore More Features'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { key: 'profit-dashboard', label: common?.featureLabels?.profitDashboard || 'Profit Dashboard' },
                            { key: 'ad-tracking', label: common?.featureLabels?.adTracking || 'Ad Tracking' },
                            { key: 'product-analytics', label: common?.featureLabels?.productAnalytics || 'Product Analytics' },
                            { key: 'multi-shop', label: common?.featureLabels?.multiShop || 'Multi-Store' },
                            { key: 'multi-currency', label: common?.featureLabels?.multiCurrency || 'Multi-Currency' },
                            { key: 'reports', label: common?.featureLabels?.reports || 'Reports' },
                        ]
                            .filter(f => f.key !== slug)
                            .map(f => (
                                <Link
                                    key={f.key}
                                    href={`/${lang}/features/${f.key}`}
                                    className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-center hover:border-orange-200 hover:bg-orange-50 transition-all text-sm font-medium text-zinc-700 hover:text-orange-600"
                                >
                                    {f.label}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}
