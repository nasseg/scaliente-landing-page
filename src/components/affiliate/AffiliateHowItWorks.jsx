'use client';

import { motion } from 'framer-motion';
import { Users, Share2, DollarSign } from 'lucide-react';

const stepIcons = [Users, Share2, DollarSign];

const AffiliateHowItWorks = ({ content }) => {
    const steps = content?.howItWorks?.steps || [];

    return (
        <div className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-16"
                >
                    {content?.howItWorks?.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => {
                        const Icon = stepIcons[i] || Users;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="text-center relative"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
                                    <Icon className="w-6 h-6 text-orange-400" />
                                </div>
                                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{step.desc}</p>

                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AffiliateHowItWorks;
