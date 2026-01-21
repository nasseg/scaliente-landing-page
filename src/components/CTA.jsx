'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = ({ content }) => (
    <section className="py-32 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
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
                <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                    {content?.title}
                </h2>

                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                    {content?.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://app.scaliente.com"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
                    >
                        {content?.button}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <p className="mt-6 text-sm text-zinc-500">
                    {content?.noCard}
                </p>
            </motion.div>
        </div>
    </section>
);

export default CTA;
