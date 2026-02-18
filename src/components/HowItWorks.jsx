'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, Megaphone, Settings2, Receipt, ArrowRight } from 'lucide-react';

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
            bg: 'bg-emerald-500/10',
            iconBg: 'bg-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/20',
            number: 'text-emerald-400',
        },
        blue: {
            bg: 'bg-blue-500/10',
            iconBg: 'bg-blue-500/20',
            text: 'text-blue-400',
            border: 'border-blue-500/20',
            number: 'text-blue-400',
        },
        orange: {
            bg: 'bg-orange-500/10',
            iconBg: 'bg-orange-500/20',
            text: 'text-orange-400',
            border: 'border-orange-500/20',
            number: 'text-orange-400',
        },
        purple: {
            bg: 'bg-purple-500/10',
            iconBg: 'bg-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/20',
            number: 'text-purple-400',
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
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
                        <Settings2 className="w-4 h-4" />
                        {content?.badge || 'Configuration simple'}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[var(--text-primary)] mb-6 tracking-[-0.025em]">
                        {content?.title?.part1 || 'Opérationnel en'}{' '}
                        <span className="text-orange-500">{content?.title?.part2 || '5 minutes'}</span>
                    </h2>

                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                        {content?.description || 'Connectez vos outils, configurez vos coûts, et commencez à voir votre vrai profit. Aucune expertise technique requise.'}
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.ol
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 list-none p-0 m-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {steps.map((step, idx) => {
                        const colors = colorMap[step.color];
                        return (
                            <motion.li
                                key={idx}
                                variants={itemVariants}
                                className={`group relative p-6 rounded-2xl bg-[var(--card-bg)] border ${colors.border} hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}
                            >
                                {/* Step Number */}
                                <div className={`absolute -top-3 -right-2 w-10 h-10 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                                    <span className={`text-sm font-bold ${colors.number}`}>{step.number}</span>
                                </div>

                                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                                    <step.icon className={`w-6 h-6 ${colors.text}`} />
                                </div>

                                <h3 className="font-brand text-lg font-semibold text-[var(--text-primary)] mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                                    {step.desc}
                                </p>

                                <span className={`inline-flex items-center text-xs font-medium ${colors.text}`}>
                                    {step.time}
                                </span>
                            </motion.li>
                        );
                    })}
                </motion.ol>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <a
                        href="https://apps.shopify.com/scaliente"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all duration-300 text-lg"
                    >
                        {content?.cta || 'Commencer Gratuitement'}
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
