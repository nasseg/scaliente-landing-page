'use client';

import { motion } from 'framer-motion';
import { Percent, Gift, Clock, CreditCard } from 'lucide-react';

const AffiliateBenefits = ({ content }) => {
    const benefits = [
        { icon: Percent, ...content?.benefits?.items?.commission },
        { icon: Gift, ...content?.benefits?.items?.discount },
        { icon: Clock, ...content?.benefits?.items?.cookie },
        { icon: CreditCard, ...content?.benefits?.items?.payment },
    ];

    return (
        <div className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-16"
                >
                    {content?.benefits?.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 hover:border-orange-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <benefit.icon className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{benefit.title}</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AffiliateBenefits;
