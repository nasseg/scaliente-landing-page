'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: 'Starter',
            color: 'green',
            badge: null,
            desc: "Savoir enfin si tu gagnes de l'argent",
            price: { monthly: 99, annual: 950 },
            features: [
                { text: "1 Shop", included: true },
                { text: "Profit réel journalier", included: true },
                { text: "Ads + shipping + fees + outils", included: true },
                { text: "Alerte jour non rentable", included: true },
                { text: "Consolidation multi-shops", included: false },
                { text: "Comparaison des shops", included: false },
            ],
            cta: "Commencer avec Starter"
        },
        {
            name: 'Pro',
            color: 'blue',
            badge: '⭐️ Le + Populaire',
            desc: "Piloter plusieurs shops sans approximation",
            price: { monthly: 149, annual: 1430 },
            features: [
                { text: "Jusqu'à 3 Shops", included: true, highlight: true },
                { text: "Vue consolidée", included: true },
                { text: "Comparaison des shops", included: true },
                { text: "Décisions rapides (cut / scale)", included: true },
                { text: "Analyse journalière précise", included: true },
                { text: "Support prioritaire", included: true },
            ],
            cta: "Passer au Pro"
        },
        {
            name: 'Max',
            color: 'orange',
            badge: 'Ultimate',
            desc: "Maîtrise totale de la rentabilité multi-shops",
            price: { monthly: 299, annual: 2870 },
            features: [
                { text: "Jusqu'à 7 Shops", included: true, highlight: true },
                { text: "Multi-marques / multi-pays", included: true },
                { text: "Historique long terme", included: true },
                { text: "Comparaison avancée", included: true },
                { text: "Accès anticipé features", included: true },
                { text: "Onboarding + support dédié", included: true },
            ],
            cta: "Passer au Max"
        }
    ];

    const colorClasses = {
        green: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            badge: 'bg-green-500',
            button: 'hover:bg-green-500 hover:text-white border-green-500/30 text-green-400',
            glow: 'group-hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]'
        },
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            badge: 'bg-blue-500',
            button: 'bg-blue-500 text-white hover:bg-blue-600 border-transparent',
            glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]'
        },
        orange: {
            bg: 'bg-[#FF6B35]/10',
            border: 'border-[#FF6B35]/20',
            text: 'text-[#FF6B35]',
            badge: 'bg-[#FF6B35]',
            button: 'hover:bg-[#FF6B35] hover:text-white border-[#FF6B35]/30 text-[#FF6B35]',
            glow: 'group-hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]'
        }
    };

    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Investissez dans votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">contrôle</span>.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium mb-8"
                    >
                        &quot;On ne track pas des ventes. On track ce que tu gardes vraiment.&quot;
                    </motion.p>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Mensuel</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-8 bg-[#1A1D24] border border-white/10 rounded-full relative p-1 transition-colors hover:border-white/20"
                        >
                            <motion.div
                                animate={{ x: isAnnual ? 24 : 0 }}
                                className="w-5 h-5 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full shadow-lg"
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                            Annuel <span className="text-green-400 text-xs font-bold ml-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">-20%</span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, idx) => {
                        const colors = colorClasses[plan.color];
                        const price = isAnnual ? plan.price.annual : plan.price.monthly;
                        const period = isAnnual ? '/an' : '/mois';
                        const monthlyEquivalent = isAnnual ? Math.round(plan.price.annual / 12) : plan.price.monthly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`
                                    relative flex flex-col p-8 rounded-3xl border transition-all duration-300 group
                                    ${colors.bg} ${colors.border} ${colors.glow}
                                    ${plan.name === 'Control' ? 'scale-105 z-10 shadow-2xl bg-[#0F1115] border-blue-500/30' : 'hover:scale-[1.02] bg-[#0F1115]/50 backdrop-blur-sm'}
                                `}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className={`${colors.badge} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap`}>
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{plan.name}</h3>
                                    <p className="text-gray-400 text-sm h-10">{plan.desc}</p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl md:text-5xl font-bold text-white transition-all duration-300">
                                            {price}€
                                        </span>
                                        <span className="text-gray-500">{period}</span>
                                    </div>
                                    {isAnnual && (
                                        <p className={`text-sm mt-2 font-medium ${colors.text}`}>
                                            Reviens à {monthlyEquivalent}€/mois
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm ${!feature.included ? 'opacity-40' : ''}`}>
                                            {feature.included ? (
                                                <Check className={`w-5 h-5 shrink-0 ${colors.text}`} />
                                            ) : (
                                                <X className="w-5 h-5 shrink-0 text-gray-600" />
                                            )}
                                            <span className={`${feature.highlight && feature.included ? 'text-white font-bold' : 'text-gray-300'}`}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="https://app.scaliente.com"
                                    className={`
                                        w-full py-4 rounded-xl font-bold transition-all duration-300 border block text-center
                                        ${colors.button}
                                    `}
                                >
                                    {plan.cta}
                                </a>

                                {/* Anti-objection for this plan */}
                                {plan.name === 'Pro' && (
                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-gray-500">
                                            Le choix de 70% des e-commerçants
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Enterprise Plan - Hidden Gem */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F1115] to-[#15181E] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Enterprise / Agency</h3>
                            </div>
                            <p className="text-gray-400 max-w-md mb-6">
                                Pour les agences et groupes e-commerce qui gèrent du gros volume. Shops illimités, accès équipe et permissions avancées.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-white" /> Shops illimités
                                </span>
                                <span className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-white" /> Reporting client
                                </span>
                                <span className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-white" /> SLA Support
                                </span>
                            </div>
                        </div>

                        <div className="text-center md:text-right shrink-0">
                            <div className="text-lg text-gray-400 font-medium mb-1">Sur devis</div>
                            <div className="text-3xl font-bold text-white mb-6">500€ - 2000€<span className="text-sm font-normal text-gray-500">/mois</span></div>
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto md:mx-0">
                                Contacter l&apos;équipe Sales <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Anti-Objection */}
                <div className="text-center mt-20">
                    <p className="text-gray-400 text-sm md:text-base italic max-w-2xl mx-auto">
                        &quot;Une seule journée mal pilotée coûte plus cher qu&apos;un mois d&apos;abonnement. Les chiffres Shopify ne montrent pas ce que tu gardes.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
