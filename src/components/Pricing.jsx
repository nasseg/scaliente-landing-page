'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles, Zap } from 'lucide-react';

const Pricing = ({ content, common }) => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: content?.plans?.discovery?.name || 'Discovery',
            badge: null,
            desc: content?.plans?.discovery?.desc || "Testez gratuitement",
            price: { monthly: 0, annual: 0 },
            featured: false,
            tier: 'free',
            features: [
                { text: content?.plans?.discovery?.features?.orders || "20 commandes/mois", included: true },
                { text: content?.plans?.discovery?.features?.shop || "1 boutique", included: true },
                { text: content?.plans?.discovery?.features?.history || "Historique 30 jours", included: true },
                { text: content?.plans?.discovery?.features?.adPlatform || "1 plateforme ads", included: true },
                { text: content?.plans?.discovery?.features?.comparison || "Comparaison périodes", included: false },
                { text: content?.plans?.discovery?.features?.export || "Export CSV", included: false },
            ],
            cta: content?.plans?.discovery?.cta || "Commencer Gratuitement"
        },
        {
            name: content?.plans?.starter?.name || 'Starter',
            badge: null,
            desc: content?.plans?.starter?.desc || "Pour démarrer",
            price: { monthly: 89, annual: 854 },
            featured: false,
            tier: 'starter',
            features: [
                { text: content?.plans?.starter?.features?.orders || "300 commandes/mois", included: true },
                { text: content?.plans?.starter?.features?.shop || "1 boutique", included: true },
                { text: content?.plans?.starter?.features?.history || "Historique illimité", included: true },
                { text: content?.plans?.starter?.features?.adPlatforms || "5 plateformes ads", included: true },
                { text: content?.plans?.starter?.features?.comparison || "Comparaison périodes", included: true },
                { text: content?.plans?.starter?.features?.export || "Export CSV", included: true },
            ],
            cta: content?.plans?.starter?.cta || "Choisir Starter"
        },
        {
            name: content?.plans?.growth?.name || 'Growth',
            badge: content?.plans?.growth?.badge || 'Recommandé',
            desc: content?.plans?.growth?.desc || "Pour scaler",
            price: { monthly: 149, annual: 1430 },
            featured: true,
            tier: 'growth',
            features: [
                { text: content?.plans?.growth?.features?.orders || "1,500 commandes/mois", included: true },
                { text: content?.plans?.growth?.features?.shops || "Jusqu'à 3 boutiques", included: true, highlight: true },
                { text: content?.plans?.growth?.features?.history || "Historique illimité", included: true },
                { text: content?.plans?.growth?.features?.adPlatforms || "5 plateformes ads", included: true },
                { text: content?.plans?.growth?.features?.multiShop || "Vue consolidée", included: true },
                { text: content?.plans?.growth?.features?.comparison || "Comparaison avancée", included: true },
            ],
            cta: content?.plans?.growth?.cta || "Choisir Growth"
        },
        {
            name: content?.plans?.scale?.name || 'Scale',
            badge: content?.plans?.scale?.badge || 'Ultimate',
            desc: content?.plans?.scale?.desc || "Sans limites",
            price: { monthly: 249, annual: 2390 },
            featured: false,
            tier: 'scale',
            features: [
                { text: content?.plans?.scale?.features?.orders || "Commandes illimitées", included: true, highlight: true },
                { text: content?.plans?.scale?.features?.shops || "Boutiques illimitées", included: true, highlight: true },
                { text: content?.plans?.scale?.features?.history || "Historique illimité", included: true },
                { text: content?.plans?.scale?.features?.adPlatforms || "5 plateformes ads", included: true },
                { text: content?.plans?.scale?.features?.slackSupport || "Support Slack dédié", included: true },
                { text: content?.plans?.scale?.features?.priority || "Support prioritaire", included: true },
            ],
            cta: content?.plans?.scale?.cta || "Choisir Scale"
        }
    ];

    return (
        <section id="pricing" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                        {content?.header?.title?.main}{' '}
                        <span className="text-orange-500">{content?.header?.title?.highlight}</span>
                    </h2>

                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-12">
                        {content?.header?.quote}
                    </p>

                    {/* Toggle - Light theme */}
                    <div className="inline-flex items-center p-1 bg-zinc-100 border border-zinc-200 rounded-full">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                !isAnnual
                                    ? 'text-white'
                                    : 'text-zinc-500 hover:text-zinc-700'
                            }`}
                        >
                            {!isAnnual && (
                                <motion.div
                                    layoutId="toggle-bg"
                                    className="absolute inset-0 bg-zinc-900 rounded-full"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{content?.toggle?.monthly}</span>
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                isAnnual
                                    ? 'text-white'
                                    : 'text-zinc-500 hover:text-zinc-700'
                            }`}
                        >
                            {isAnnual && (
                                <motion.div
                                    layoutId="toggle-bg"
                                    className="absolute inset-0 bg-zinc-900 rounded-full"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {content?.toggle?.annual}
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                                    {content?.toggle?.discount}
                                </span>
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-20">
                    {plans.map((plan, idx) => {
                        const monthlyEquivalent = Math.round(plan.price.annual / 12);
                        const displayPrice = isAnnual ? monthlyEquivalent : plan.price.monthly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className={`group relative flex flex-col rounded-2xl transition-all duration-500 ${
                                    plan.featured
                                        ? 'lg:-mt-4 lg:mb-4'
                                        : ''
                                }`}
                            >
                                {/* Card Background */}
                                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                                    plan.featured
                                        ? 'bg-gradient-to-b from-orange-100 via-orange-50 to-white border-2 border-orange-300 shadow-xl shadow-orange-200/30'
                                        : 'bg-white border border-zinc-200 group-hover:border-zinc-300 group-hover:shadow-lg'
                                }`} />

                                {/* Glow effect for featured */}
                                {plan.featured && (
                                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-orange-200/50 to-transparent blur-xl opacity-50" />
                                )}

                                {/* Content */}
                                <div className="relative p-6 flex flex-col flex-1">
                                    {/* Badge */}
                                    {plan.badge && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                            <motion.span
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 + idx * 0.1 }}
                                                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
                                                    plan.featured
                                                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                                                        : 'bg-zinc-800 text-zinc-200'
                                                }`}
                                            >
                                                {plan.featured ? <Sparkles className="w-3.5 h-3.5" /> : <Zap className="w-3 h-3" />}
                                                {plan.badge}
                                            </motion.span>
                                        </div>
                                    )}

                                    {/* Plan Name & Description */}
                                    <div className="mb-5 pt-3">
                                        <h3 className={`font-brand text-xl font-semibold mb-1.5 ${
                                            plan.featured ? 'text-orange-600' : 'text-zinc-900'
                                        }`}>
                                            {plan.name}
                                        </h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{plan.desc}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            {isAnnual && plan.price.monthly > 0 && (
                                                <span className="text-base text-zinc-400 line-through font-medium">
                                                    {plan.price.monthly}€
                                                </span>
                                            )}
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={displayPrice}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-4xl font-sans font-bold text-zinc-900 tracking-tight"
                                                >
                                                    {displayPrice === 0 ? (common?.free || 'Gratuit') : `${displayPrice}€`}
                                                </motion.span>
                                            </AnimatePresence>
                                            {displayPrice > 0 && (
                                                <span className="text-zinc-500 text-sm font-medium">/{common?.month || 'mois'}</span>
                                            )}
                                        </div>
                                        {isAnnual && plan.price.annual > 0 && (
                                            <p className="text-xs text-zinc-500 mt-1.5">
                                                {common?.billed || 'Facturé'} {plan.price.annual}€/{common?.year || 'an'}
                                            </p>
                                        )}
                                        {plan.price.monthly === 0 && (
                                            <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                                                {common?.noCard || 'Aucune carte requise'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className={`h-px mb-5 ${
                                        plan.featured
                                            ? 'bg-gradient-to-r from-transparent via-orange-300 to-transparent'
                                            : 'bg-zinc-200'
                                    }`} />

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className={`flex items-start gap-2.5 text-sm ${
                                                !feature.included ? 'opacity-35' : ''
                                            }`}>
                                                {feature.included ? (
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                        plan.featured
                                                            ? 'bg-orange-100'
                                                            : 'bg-emerald-100'
                                                    }`}>
                                                        <Check className={`w-3 h-3 ${
                                                            plan.featured ? 'text-orange-600' : 'text-emerald-600'
                                                        }`} />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-zinc-100">
                                                        <X className="w-3 h-3 text-zinc-400" />
                                                    </div>
                                                )}
                                                <span className={
                                                    feature.highlight && feature.included
                                                        ? 'text-zinc-900 font-medium'
                                                        : 'text-zinc-600'
                                                }>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <a
                                        href="https://app.scaliente.com"
                                        className={`w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                                            plan.featured
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)] hover:-translate-y-0.5'
                                                : 'bg-zinc-900 text-white hover:bg-zinc-800'
                                        }`}
                                    >
                                        {plan.cta}
                                        {plan.featured && <ArrowRight className="w-4 h-4" />}
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Enterprise Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative p-8 md:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl -ml-20 -mb-20" />

                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold mb-4">
                                    <Sparkles className="w-3 h-3" />
                                    Enterprise
                                </div>
                                <h3 className="font-brand text-2xl md:text-3xl font-bold text-white mb-3">
                                    {content?.enterprise?.title}
                                </h3>
                                <p className="text-zinc-400 mb-6 max-w-lg leading-relaxed">
                                    {content?.enterprise?.desc}
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {content?.enterprise?.features && Object.values(content.enterprise.features).map((feature, i) => (
                                        <span key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                            <Check className="w-4 h-4 text-orange-400" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center md:text-right shrink-0">
                                <p className="text-zinc-500 text-sm mb-1">{content?.enterprise?.price?.custom}</p>
                                <p className="text-3xl font-sans font-bold text-white mb-5">
                                    {content?.enterprise?.price?.range}
                                    <span className="text-base font-normal text-zinc-500 ml-1">/{common?.month || 'mois'}</span>
                                </p>
                                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                    {content?.enterprise?.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mt-16 text-zinc-500 italic max-w-xl mx-auto"
                >
                    {content?.finalQuote}
                </motion.p>
            </div>
        </section>
    );
};

export default Pricing;
