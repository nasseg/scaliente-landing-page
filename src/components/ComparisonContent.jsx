'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, Shield, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const ComparisonContent = ({ content, competitorName = 'TrueProfit', lang, slug }) => {
    const [showTable, setShowTable] = useState(true);

    const differentiators = [
        {
            icon: Zap,
            color: 'orange',
            title: content?.differentiators?.freePlan?.title || 'Plan gratuit genereux',
            description: content?.differentiators?.freePlan?.desc || 'Testez sans limites de temps avec 20 commandes/mois. TrueProfit ne propose pas de plan gratuit.',
        },
        {
            icon: Shield,
            color: 'emerald',
            title: content?.differentiators?.noSurcharge?.title || 'Pas de surcharge par commande',
            description: content?.differentiators?.noSurcharge?.desc || 'Un abonnement fixe et transparent. Pas de frais caches par commande traitee.',
        },
        {
            icon: Globe,
            color: 'blue',
            title: content?.differentiators?.multiCurrency?.title || 'Multi-devises natif',
            description: content?.differentiators?.multiCurrency?.desc || 'Conversion automatique avec taux ECB quotidiens. Gerez des boutiques en EUR, USD, GBP, CZK...',
        },
    ];

    const colorMap = {
        orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    };

    const comparisonRows = [
        { feature: content?.table?.freePlan || 'Plan gratuit', scaliente: true, competitor: content?.table?.competitorFreePlan ?? false },
        { feature: content?.table?.perOrderFee || 'Sans frais par commande', scaliente: true, competitor: content?.table?.competitorPerOrderFee ?? false },
        { feature: content?.table?.multiCurrency || 'Multi-devises', scaliente: true, competitor: content?.table?.competitorMultiCurrency ?? false },
        { feature: content?.table?.multiShop || 'Multi-boutiques', scaliente: true, competitor: content?.table?.competitorMultiShop ?? true },
        { feature: content?.table?.adPlatforms || '5 plateformes ads', scaliente: true, competitor: content?.table?.competitorAdPlatforms ?? true },
        { feature: content?.table?.realtime || 'Donnees temps reel', scaliente: true, competitor: content?.table?.competitorRealtime ?? true },
        { feature: content?.table?.mobileApp || 'Mobile app (PWA)', scaliente: true, competitor: content?.table?.competitorMobileApp ?? true },
        { feature: content?.table?.gdpr || 'GDPR compliant', scaliente: true, competitor: content?.table?.competitorGdpr ?? true },
        { feature: content?.table?.europeanHosting || 'Hebergement europeen', scaliente: true, competitor: content?.table?.competitorEuropeanHosting ?? false },
        { feature: content?.table?.startingPrice || 'A partir de', scaliente: content?.table?.scalinetPrice || '0/mois', competitor: content?.table?.competitorPrice || '$49/mois' },
    ];

    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-6">
                {/* Key Differentiators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {differentiators.map((diff, i) => {
                        const colors = colorMap[diff.color];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white border border-zinc-100 hover:shadow-lg transition-all"
                            >
                                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                                    <diff.icon className={`w-6 h-6 ${colors.text}`} />
                                </div>
                                <h3 className="font-brand text-lg font-semibold text-zinc-900 mb-2">{diff.title}</h3>
                                <p className="text-sm text-zinc-600 leading-relaxed">{diff.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Comparison Table Toggle */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => setShowTable(!showTable)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-all"
                    >
                        {content?.tableToggle || 'Voir la comparaison detaillee'}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showTable ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Comparison Table */}
                {showTable && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-16"
                    >
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 bg-zinc-50 border-b border-zinc-200 text-left font-medium text-zinc-500 text-sm">
                                        {content?.table?.feature || 'Fonctionnalite'}
                                    </th>
                                    <th className="p-4 bg-orange-50 border-b border-zinc-200 text-center font-semibold text-orange-600 text-sm">
                                        Scaliente
                                    </th>
                                    <th className="p-4 bg-zinc-50 border-b border-zinc-200 text-center font-medium text-zinc-600 text-sm">
                                        {competitorName}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, i) => (
                                    <tr key={i} className="border-b border-zinc-100 last:border-0">
                                        <td className="p-4 text-sm text-zinc-700">
                                            {row.feature}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof row.scaliente === 'boolean' ? (
                                                row.scaliente ? (
                                                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-sm font-semibold text-orange-600">{row.scaliente}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof row.competitor === 'boolean' ? (
                                                row.competitor ? (
                                                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-sm font-medium text-zinc-600">{row.competitor}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {/* Why European merchants choose Scaliente */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="font-brand text-3xl font-bold text-zinc-900 mb-6">
                        {content?.whyScaliente?.title || 'Pourquoi les e-commercants europeens choisissent Scaliente'}
                    </h2>
                    <p className="text-lg text-zinc-600 leading-relaxed mb-4">
                        {content?.whyScaliente?.p1}
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        {content?.whyScaliente?.p2}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                        {[
                            { slug: 'profit-dashboard', label: 'Profit Dashboard' },
                            { slug: 'ad-tracking', label: 'Ad Tracking' },
                            { slug: 'product-analytics', label: 'Product Analytics' },
                            { slug: 'multi-shop', label: 'Multi-Store' },
                            { slug: 'multi-currency', label: 'Multi-Currency' },
                            { slug: 'reports', label: 'Reports' },
                        ].map(f => (
                            <Link
                                key={f.slug}
                                href={`/${lang}/features/${f.slug}`}
                                className="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-medium text-orange-600 hover:bg-orange-100 transition-all"
                            >
                                {f.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* See Also */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h3 className="font-brand text-xl font-bold text-zinc-900 mb-4 text-center">
                        {content?.seeAlso || 'See also'}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {[
                            { slug: 'scaliente-vs-trueprofit', label: 'Scaliente vs TrueProfit' },
                            { slug: 'scaliente-vs-triple-whale', label: 'Scaliente vs Triple Whale' },
                            { slug: 'scaliente-vs-lifetimely', label: 'Scaliente vs Lifetimely' },
                        ]
                            .filter(c => c.slug !== slug)
                            .map(c => (
                                <Link
                                    key={c.slug}
                                    href={`/${lang}/compare/${c.slug}`}
                                    className="px-6 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center hover:border-orange-200 hover:bg-orange-50 transition-all text-sm font-medium text-zinc-700 hover:text-orange-600"
                                >
                                    {c.label}
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ComparisonContent;
