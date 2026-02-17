'use client';

import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';

const AffiliateHero = ({ content }) => (
    <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-orange-300">{content?.hero?.badge}</span>
                </div>

                <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-white">{content?.hero?.titleWhite}</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                        {content?.hero?.titleOrange}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {content?.hero?.subtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                    {[
                        { value: '15%', label: content?.stats?.commissionLabel, color: 'from-emerald-400 to-green-500' },
                        { value: '50%', label: content?.stats?.discountLabel, color: 'from-orange-400 to-amber-500' },
                        { value: content?.stats?.cookieValue || '90', label: content?.stats?.cookieLabel, color: 'from-blue-400 to-cyan-500' },
                        { value: content?.stats?.durationValue, label: content?.stats?.durationLabel, color: 'from-orange-400 to-amber-500' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="text-center"
                        >
                            <div className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="#application-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-xl font-bold text-lg text-white hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105"
                >
                    {content?.hero?.cta}
                    <ArrowRight className="w-5 h-5" />
                </motion.a>
            </motion.div>
        </div>
    </section>
);

export default AffiliateHero;
