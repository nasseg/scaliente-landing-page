'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AffiliateFAQ = ({ content }) => {
    const [openFaq, setOpenFaq] = useState(null);
    const faqItems = content?.faq?.items || [];

    return (
        <div className="py-20">
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-12"
                >
                    {content?.faq?.title}
                </motion.h2>

                <div className="space-y-3">
                    {faqItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                            >
                                <span className="text-[var(--text-primary)] font-medium pr-4">{item.q}</span>
                                <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
                                    {item.a}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AffiliateFAQ;
