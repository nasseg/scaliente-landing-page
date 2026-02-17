'use client';

import { motion } from 'framer-motion';

const AffiliateEarnings = ({ content }) => {
    const earningsRows = content?.earnings?.rows || [];

    return (
        <div className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        {content?.earnings?.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg">{content?.earnings?.subtitle}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden"
                >
                    <div className="grid grid-cols-4 gap-0 bg-[var(--card-bg-alt)] border-b border-[var(--card-border)]">
                        <div className="p-4 text-sm font-medium text-[var(--text-muted)]">{content?.earnings?.colReferrals}</div>
                        <div className="p-4 text-sm font-medium text-[var(--text-muted)]">{content?.earnings?.colPlan}</div>
                        <div className="p-4 text-sm font-medium text-[var(--text-muted)]">{content?.earnings?.colMonthly}</div>
                        <div className="p-4 text-sm font-medium text-[var(--text-muted)]">{content?.earnings?.colYearly}</div>
                    </div>

                    {earningsRows.map((row, i) => (
                        <div key={i} className={`grid grid-cols-4 gap-0 border-b border-[var(--card-border)] last:border-b-0 ${i === earningsRows.length - 1 ? 'bg-orange-500/[0.05]' : ''}`}>
                            <div className="p-4 text-sm text-[var(--text-primary)] font-medium">{row.referrals}</div>
                            <div className="p-4 text-sm text-[var(--text-secondary)]">{row.plan}</div>
                            <div className="p-4 text-sm font-semibold text-emerald-600">{row.monthly}</div>
                            <div className="p-4 text-sm font-bold text-orange-500">{row.yearly}</div>
                        </div>
                    ))}
                </motion.div>

                <p className="text-center text-xs text-[var(--text-muted)] mt-4">{content?.earnings?.disclaimer}</p>
            </div>
        </div>
    );
};

export default AffiliateEarnings;
