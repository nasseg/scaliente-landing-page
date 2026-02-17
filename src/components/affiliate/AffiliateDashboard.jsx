'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AffiliateDashboard = ({ content }) => (
    <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Features */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8">{content?.features?.title}</h2>
                    <div className="space-y-4">
                        {(content?.features?.items || []).map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-colors"
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                </div>
                                <span className="text-[var(--text-secondary)]">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Mock Dashboard */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-[#12141A] border border-white/10 rounded-2xl p-8">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">{content?.dashboard?.title}</span>
                                <span className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded-full">{content?.dashboard?.live}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="text-xs text-zinc-500 mb-1">{content?.dashboard?.referrals}</div>
                                    <div className="text-2xl font-bold text-white">24</div>
                                    <div className="text-xs text-emerald-400 mt-1">{content?.dashboard?.referralsChange}</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4">
                                    <div className="text-xs text-zinc-500 mb-1">{content?.dashboard?.commissions}</div>
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">847&euro;</div>
                                    <div className="text-xs text-emerald-400 mt-1">{content?.dashboard?.commissionsChange}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">JD</div>
                                        <div>
                                            <div className="text-sm text-white">Jean D.</div>
                                            <div className="text-xs text-zinc-500">Growth Plan</div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-emerald-400">+22.35&euro;</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">ML</div>
                                        <div>
                                            <div className="text-sm text-white">Marie L.</div>
                                            <div className="text-xs text-zinc-500">Scale Plan</div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-emerald-400">+37.35&euro;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);

export default AffiliateDashboard;
