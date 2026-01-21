'use client';
import { motion } from 'framer-motion';

const SectionDivider = ({ variant = 'gradient', className = '' }) => {
    // Gradient Line Divider - Clean, subtle horizontal gradient
    if (variant === 'gradient') {
        return (
            <div className={`relative py-8 ${className}`}>
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
            </div>
        );
    }

    // Glow Divider - With orange glow accent
    if (variant === 'glow') {
        return (
            <div className={`relative py-12 ${className}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-1 bg-orange-500/30 blur-xl" />
                    </div>
                    {/* Line */}
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                </motion.div>
            </div>
        );
    }

    // Dots Divider - Three subtle dots
    if (variant === 'dots') {
        return (
            <div className={`relative py-10 flex items-center justify-center gap-3 ${className}`}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-orange-500/60' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        );
    }

    // Wave Divider - Modern SVG wave shape
    if (variant === 'wave') {
        return (
            <div className={`relative ${className}`}>
                <motion.svg
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    viewBox="0 0 1200 40"
                    fill="none"
                    className="w-full h-10"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 20C200 35 400 5 600 20C800 35 1000 5 1200 20"
                        stroke="url(#waveGradient)"
                        strokeWidth="1"
                        fill="none"
                        strokeOpacity="0.3"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="1200" y2="0">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </div>
        );
    }

    // Mesh Divider - Subtle mesh gradient accent
    if (variant === 'mesh') {
        return (
            <div className={`relative py-16 overflow-hidden ${className}`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="relative w-full max-w-md h-16">
                        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl" />
                    </div>
                </motion.div>
                <div className="relative h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
        );
    }

    // Diamond Divider - Elegant diamond shape in center
    if (variant === 'diamond') {
        return (
            <div className={`relative py-10 ${className}`}>
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10 origin-right"
                    />
                    <motion.div
                        initial={{ scale: 0, rotate: 45 }}
                        whileInView={{ scale: 1, rotate: 45 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="w-2 h-2 bg-orange-500/50 border border-orange-500/30"
                    />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10 origin-left"
                    />
                </div>
            </div>
        );
    }

    // Default: Simple gradient
    return (
        <div className={`relative py-8 ${className}`}>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
};

export default SectionDivider;
