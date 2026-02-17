'use client';

import { motion } from 'framer-motion';
import { Youtube, PenLine, Store, Megaphone } from 'lucide-react';

const AffiliateAudiences = ({ content }) => {
    const audiences = [
        { icon: Youtube, ...content?.audiences?.items?.creators },
        { icon: PenLine, ...content?.audiences?.items?.bloggers },
        { icon: Store, ...content?.audiences?.items?.agencies },
        { icon: Megaphone, ...content?.audiences?.items?.merchants },
    ];

    return (
        <div className="py-20">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-16"
                >
                    {content?.audiences?.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audiences.map((aud, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 text-center hover:border-orange-500/20 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                                <aud.icon className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{aud.title}</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{aud.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AffiliateAudiences;
