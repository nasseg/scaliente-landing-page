'use client';
import { motion } from 'framer-motion';
import { Mail, Sparkles, MessageSquare, Shield, ArrowRight } from 'lucide-react';

const FeatureCard = ({ feature, index, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-all duration-300"
    >
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 mb-3">
            <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
        <p className="text-sm text-zinc-400">{feature.desc}</p>
    </motion.div>
);

const AIFeatureTeaser = ({ content }) => {
    const icons = [Mail, Sparkles, MessageSquare, Shield];

    return (
        <section className="py-32 relative overflow-hidden bg-[#09090b]/50 backdrop-blur-sm">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                {content?.badge || "Coming Soon"}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-brand text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                        >
                            {content?.title?.main}{' '}
                            <span className="text-gradient-orange">{content?.title?.highlight}</span>
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-zinc-300 mb-4"
                        >
                            {content?.subtitle}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-zinc-400 mb-8"
                        >
                            {content?.description}
                        </motion.p>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {content?.features?.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    feature={feature}
                                    index={index}
                                    icon={icons[index]}
                                />
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="space-y-3"
                        >
                            <p className="text-sm text-zinc-400">{content?.cta?.title}</p>
                            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                                {content?.cta?.button}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-xs text-zinc-500">{content?.cta?.note}</p>
                        </motion.div>
                    </div>

                    {/* Right: Preview Mock */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                            {/* Mock Inbox Header */}
                            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-sm text-zinc-400 ml-2">{content?.preview?.inboxLabel || "Customer Inbox"}</span>
                            </div>

                            {/* Mock Email */}
                            <div className="p-4 border-b border-white/[0.06] bg-orange-500/5">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 text-sm font-medium shrink-0">
                                        C
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-white">{content?.preview?.exampleEmail?.from}</span>
                                            <span className="text-xs text-zinc-500">2m ago</span>
                                        </div>
                                        <div className="text-sm text-zinc-300 font-medium mb-1">{content?.preview?.exampleEmail?.subject}</div>
                                        <div className="text-sm text-zinc-500 truncate">{content?.preview?.exampleEmail?.preview}</div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Response Section */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium text-purple-400">{content?.preview?.suggestedLabel || "AI Suggested Response"}</span>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {content?.preview?.exampleResponse}
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors">
                                        Send
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-white/[0.05] text-zinc-400 text-sm font-medium hover:bg-white/[0.1] transition-colors">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur-3xl -z-10 opacity-50" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIFeatureTeaser;
