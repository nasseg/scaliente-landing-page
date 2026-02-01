'use client';
import { motion } from 'framer-motion';
import { Quote, Users, Clock, TrendingDown } from 'lucide-react';

const StatCard = ({ stat, index, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
    >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 mb-4">
            <Icon className="w-6 h-6" />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
        <div className="text-sm text-zinc-400">{stat.label}</div>
    </motion.div>
);

const FounderStory = ({ content }) => {
    const icons = [Users, Clock, TrendingDown];

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grain pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-sm font-medium mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {content?.badge || "Why We Built This"}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        {content?.title?.main}{' '}
                        <span className="text-gradient-orange">{content?.title?.highlight}</span>
                    </h2>

                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        {content?.subtitle}
                    </p>
                </motion.div>

                {/* Founder Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                        <Quote className="absolute top-6 left-6 w-10 h-10 text-orange-500/20" />

                        <blockquote className="relative z-10">
                            <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed mb-8 italic">
                                &quot;{content?.founderStory?.quote}&quot;
                            </p>

                            <footer className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                                    S
                                </div>
                                <div>
                                    <div className="font-semibold text-white text-lg">{content?.founderStory?.author}</div>
                                    <div className="text-zinc-400">{content?.founderStory?.role}</div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </motion.div>

                {/* Problem Stats */}
                {content?.problemStats && (
                    <div className="mb-16">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center text-2xl font-semibold text-white mb-8"
                        >
                            {content.problemStats.title}
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {content.problemStats.stats?.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    stat={stat}
                                    index={index}
                                    icon={icons[index]}
                                />
                            ))}
                        </div>

                        {content.problemStats.source && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-center text-sm text-zinc-500 mt-6"
                            >
                                {content.problemStats.source}
                            </motion.p>
                        )}
                    </div>
                )}

                {/* Waitlist Stats */}
                {content?.waitlistStats && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-lg font-semibold text-white">{content.waitlistStats.count}</span>
                            <span className="text-zinc-400">{content.waitlistStats.label}</span>
                        </div>

                        {content.waitlistStats.cta && (
                            <span className="text-orange-400 font-medium cursor-pointer hover:text-orange-300 transition-colors">
                                {content.waitlistStats.cta} &rarr;
                            </span>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FounderStory;
