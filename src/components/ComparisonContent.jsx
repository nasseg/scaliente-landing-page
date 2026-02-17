'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, Shield, Globe, Zap } from 'lucide-react';

const ComparisonContent = ({ content, competitorName = 'TrueProfit' }) => {
    const [showTable, setShowTable] = useState(false);

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
                        <div className="grid grid-cols-3 gap-0">
                            {/* Header */}
                            <div className="p-4 bg-zinc-50 border-b border-zinc-200 font-medium text-zinc-500 text-sm">
                                {content?.table?.feature || 'Fonctionnalite'}
                            </div>
                            <div className="p-4 bg-orange-50 border-b border-zinc-200 font-semibold text-orange-600 text-center text-sm">
                                Scaliente
                            </div>
                            <div className="p-4 bg-zinc-50 border-b border-zinc-200 font-medium text-zinc-600 text-center text-sm">
                                {competitorName}
                            </div>

                            {/* Rows */}
                            {comparisonRows.map((row, i) => (
                                <React.Fragment key={i}>
                                    <div className="p-4 border-b border-zinc-100 text-sm text-zinc-700">
                                        {row.feature}
                                    </div>
                                    <div className="p-4 border-b border-zinc-100 text-center">
                                        {typeof row.scaliente === 'boolean' ? (
                                            row.scaliente ? (
                                                <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                            )
                                        ) : (
                                            <span className="text-sm font-semibold text-orange-600">{row.scaliente}</span>
                                        )}
                                    </div>
                                    <div className="p-4 border-b border-zinc-100 text-center">
                                        {typeof row.competitor === 'boolean' ? (
                                            row.competitor ? (
                                                <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                            )
                                        ) : (
                                            <span className="text-sm font-medium text-zinc-600">{row.competitor}</span>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
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
                </div>

            </div>
        </section>
    );
};

export default ComparisonContent;
