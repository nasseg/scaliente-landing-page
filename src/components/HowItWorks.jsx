'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, Megaphone, Settings2, Receipt, TrendingUp, Package, Scale, ArrowRight, Check } from 'lucide-react';

const HowItWorks = ({ content }) => {
    const steps = [
        {
            number: '01',
            icon: ShoppingBag,
            color: 'emerald',
            title: content?.steps?.shopify?.title || 'Connectez Shopify',
            desc: content?.steps?.shopify?.desc || 'Connexion OAuth en un clic. Vos commandes, produits et revenus sont synchronisés automatiquement.',
            time: content?.steps?.shopify?.time || '30 secondes',
        },
        {
            number: '02',
            icon: Megaphone,
            color: 'blue',
            title: content?.steps?.ads?.title || 'Liez vos Ads',
            desc: content?.steps?.ads?.desc || 'Connectez Meta, Google, TikTok, Pinterest et Snapchat en OAuth. Toutes vos dépenses ads centralisées.',
            time: content?.steps?.ads?.time || '2 minutes',
        },
        {
            number: '03',
            icon: Settings2,
            color: 'orange',
            title: content?.steps?.mode?.title || 'Choisissez votre Mode',
            desc: content?.steps?.mode?.desc || 'Dropshipping ou Classic - configurez comment vos coûts sont calculés.',
            time: content?.steps?.mode?.time || '1 minute',
        },
        {
            number: '04',
            icon: Receipt,
            color: 'purple',
            title: content?.steps?.expenses?.title || 'Ajoutez vos Frais',
            desc: content?.steps?.expenses?.desc || 'Abonnements, salaires, charges fixes. Générez des rapports avec votre bénéfice réel après toutes charges.',
            time: content?.steps?.expenses?.time || 'Optionnel',
        },
    ];

    const colorMap = {
        emerald: {
            bg: 'bg-emerald-50',
            iconBg: 'bg-emerald-100',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            number: 'text-emerald-500',
        },
        blue: {
            bg: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            text: 'text-blue-600',
            border: 'border-blue-200',
            number: 'text-blue-500',
        },
        orange: {
            bg: 'bg-orange-50',
            iconBg: 'bg-orange-100',
            text: 'text-orange-600',
            border: 'border-orange-200',
            number: 'text-orange-500',
        },
        purple: {
            bg: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            text: 'text-purple-600',
            border: 'border-purple-200',
            number: 'text-purple-500',
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm font-medium mb-6">
                        <Settings2 className="w-4 h-4" />
                        {content?.badge || 'Configuration simple'}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-zinc-900 mb-6 tracking-[-0.025em]">
                        {content?.title?.part1 || 'Opérationnel en'}{' '}
                        <span className="text-orange-500">{content?.title?.part2 || '5 minutes'}</span>
                    </h2>

                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        {content?.description || 'Connectez vos outils, configurez vos coûts, et commencez à voir votre vrai profit. Aucune expertise technique requise.'}
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {steps.map((step, idx) => {
                        const colors = colorMap[step.color];
                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={`group relative p-6 rounded-2xl bg-white border ${colors.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}
                            >
                                {/* Step Number */}
                                <div className={`absolute -top-3 -right-2 w-10 h-10 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                                    <span className={`text-sm font-bold ${colors.number}`}>{step.number}</span>
                                </div>

                                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                                    <step.icon className={`w-6 h-6 ${colors.text}`} />
                                </div>

                                <h3 className="font-brand text-lg font-semibold text-zinc-900 mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                                    {step.desc}
                                </p>

                                <span className={`inline-flex items-center text-xs font-medium ${colors.text}`}>
                                    {step.time}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Modes Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <h3 className="font-brand text-2xl font-bold text-zinc-900 mb-2">
                            {content?.modes?.title || 'Deux modes de calcul'}
                        </h3>
                        <p className="text-zinc-500">
                            {content?.modes?.subtitle || 'Choisissez celui qui correspond à votre business model'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Mode Dropshipping */}
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-brand font-semibold text-zinc-900">
                                        {content?.modes?.dropshipping?.title || 'Mode Dropshipping'}
                                    </h4>
                                    <span className="text-xs text-orange-600 font-medium">
                                        {content?.modes?.dropshipping?.badge || 'Print-on-demand, AliExpress...'}
                                    </span>
                                </div>
                            </div>

                            <p className="text-zinc-600 text-sm mb-4">
                                {content?.modes?.dropshipping?.desc || 'COGS calculés en fonction du nombre de produits vendus par commande.'}
                            </p>

                            <div className="bg-white/60 rounded-xl p-4 border border-orange-100">
                                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wide">
                                    {content?.modes?.dropshipping?.example || 'Exemple'}
                                </p>
                                <div className="space-y-1.5 text-sm text-zinc-700">
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.dropshipping?.product || 'Produit'}</span>
                                        <span className="font-medium">1 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.dropshipping?.shipping1 || 'Livraison 1 produit'}</span>
                                        <span className="font-medium">5 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.dropshipping?.shipping2 || 'Livraison 2 produits'}</span>
                                        <span className="font-medium">7 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mode Classic */}
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-brand font-semibold text-zinc-900">
                                        {content?.modes?.classic?.title || 'Mode Classic'}
                                    </h4>
                                    <span className="text-xs text-blue-600 font-medium">
                                        {content?.modes?.classic?.badge || 'E-commerce avec stock'}
                                    </span>
                                </div>
                            </div>

                            <p className="text-zinc-600 text-sm mb-4">
                                {content?.modes?.classic?.desc || 'Prix de livraison basé sur le poids du colis. Configuration par tranches.'}
                            </p>

                            <div className="bg-white/60 rounded-xl p-4 border border-blue-100">
                                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wide">
                                    {content?.modes?.classic?.example || 'Exemple'}
                                </p>
                                <div className="space-y-1.5 text-sm text-zinc-700">
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.classic?.weight1 || '0 - 500g'}</span>
                                        <span className="font-medium">4.90 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.classic?.weight2 || '500g - 1kg'}</span>
                                        <span className="font-medium">6.90 €</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{content?.modes?.classic?.weight3 || '1kg - 2kg'}</span>
                                        <span className="font-medium">8.90 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Result Analytics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mx-auto mt-12"
                >
                    <div className="relative p-8 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20" />

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-brand text-xl font-bold text-white">
                                        {content?.result?.title || 'Résultat : Vos Analytics Complètes'}
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                        {content?.result?.subtitle || 'Tout ce dont vous avez besoin pour piloter votre rentabilité'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: content?.result?.metrics?.profit || 'Net Profit', color: 'emerald' },
                                    { label: content?.result?.metrics?.roas || 'ROAS & POAS', color: 'blue' },
                                    { label: content?.result?.metrics?.breakeven || 'Breakeven ROAS', color: 'orange' },
                                    { label: content?.result?.metrics?.reports || 'Rapports Mensuels', color: 'purple' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                                        <Check className={`w-4 h-4 text-${item.color}-400`} />
                                        <span className="text-sm text-zinc-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
