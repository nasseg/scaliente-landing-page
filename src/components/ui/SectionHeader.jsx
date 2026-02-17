'use client';
import { motion } from 'framer-motion';
import { EASE_SMOOTH } from '@/lib/animations';

const SectionHeader = ({
    badge,
    badgeIcon: BadgeIcon,
    title,
    highlightedText,
    subtitle,
    theme = 'light',
    className = ''
}) => {
    const isDark = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className={`text-center mb-16 ${className}`}
        >
            {badge && (
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                    isDark
                        ? 'border border-orange-500/20 bg-orange-500/5 text-orange-400'
                        : 'border border-orange-200 bg-orange-50 text-orange-600'
                }`}>
                    {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                    {!BadgeIcon && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    {badge}
                </span>
            )}

            <h2 className={`font-brand text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-[-0.025em] ${
                isDark ? 'text-white' : 'text-zinc-900'
            }`}>
                {title}{' '}
                {highlightedText && (
                    <span className={isDark ? 'text-gradient-orange' : 'text-orange-500'}>
                        {highlightedText}
                    </span>
                )}
            </h2>

            {subtitle && (
                <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeader;
