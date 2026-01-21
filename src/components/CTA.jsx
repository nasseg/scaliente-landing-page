'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = ({ content }) => (
    <section className="py-32 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/[0.05] text-orange-300 text-sm font-medium mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    {content?.badge || "Commencez gratuitement"}
                </motion.div>

                <h2 className="font-brand text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-6 tracking-[-0.025em]">
                    {content?.title}
                </h2>

                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    {content?.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://app.scaliente.com"
                        className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-lg transition-all duration-300 overflow-hidden"
                    >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600" />
                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-b from-orange-400 to-orange-500" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                        {/* Shadow */}
                        <div className="absolute inset-0 rounded-2xl shadow-[0_8px_32px_rgba(249,115,22,0.3)] group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.4)] transition-shadow duration-300" />
                        <span className="relative z-10">{content?.button}</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <p className="mt-8 text-sm text-zinc-500">
                    {content?.noCard}
                </p>
            </motion.div>
        </div>
    </section>
);

export default CTA;
