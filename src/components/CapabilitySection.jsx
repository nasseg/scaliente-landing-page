'use client';
import { motion } from 'framer-motion';
import { ShieldAlert, Receipt, FileText, UserCog, Store, Download } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { containerVariants, itemVariants } from '@/lib/animations';

/**
 * Icons live here, not in the caller: `page.js` is a Server Component and React
 * cannot serialise a component function across the RSC boundary. The caller
 * passes plain string keys.
 */
const ICONS = {
    disputes: ShieldAlert,
    expenses: Receipt,
    reports: FileText,
    roles: UserCog,
    multiShop: Store,
    export: Download,
};

/**
 * Titled grid of capability cards.
 *
 * Props-driven so one component serves several sections: pass the dictionary
 * slice and the card keys to render. Colours come from the section's CSS
 * variables (see the landing-theming skill), so the same instance renders
 * correctly whether it lands on a light or a dark row of `.alternating-sections`.
 */
const CapabilitySection = ({ content, cards = [], theme = 'light' }) => {
    if (!content) return null;

    return (
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
                badge={content.badge}
                title={content.title?.main}
                highlightedText={content.title?.highlight}
                subtitle={content.subtitle}
                theme={theme}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {cards.map((key) => {
                    const card = content.cards?.[key];
                    const Icon = ICONS[key];
                    if (!card) return null;

                    return (
                        <motion.article
                            key={key}
                            variants={itemVariants}
                            className="group p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-colors duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {Icon && <Icon className="w-6 h-6 text-orange-500" aria-hidden="true" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                {card.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {card.desc}
                            </p>
                        </motion.article>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default CapabilitySection;
