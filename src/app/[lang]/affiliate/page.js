'use client';

import { motion } from 'framer-motion';
import { Percent, Gift, Clock, CreditCard, Check, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

const AffiliatePage = ({ params }) => {
    const [dict, setDict] = useState(null);
    const [lang, setLang] = useState('fr');

    useEffect(() => {
        const loadDict = async () => {
            const resolvedParams = await params;
            setLang(resolvedParams.lang);
            const dictionary = await import(`@/dictionaries/${resolvedParams.lang}.json`);
            setDict(dictionary.default);
        };
        loadDict();
    }, [params]);

    if (!dict) {
        return (
            <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const content = dict.affiliate;
    const benefits = [
        { icon: Percent, ...content?.benefits?.items?.commission },
        { icon: Gift, ...content?.benefits?.items?.discount },
        { icon: Clock, ...content?.benefits?.items?.validation },
        { icon: CreditCard, ...content?.benefits?.items?.payment },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-[#0A0B0D] text-white selection:bg-orange-500/30">
            <Navbar content={dict.navbar} common={dict.common} lang={lang} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-8">
                            <Users className="w-4 h-4 text-orange-400" />
                            <span className="text-sm font-medium text-orange-300">{content?.hero?.badge}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="text-white">{content?.hero?.title?.split(' ').slice(0, 2).join(' ')}</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                                {content?.hero?.title?.split(' ').slice(2).join(' ') || 'Scaliente'}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {content?.hero?.subtitle}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">15%</div>
                                <div className="text-sm text-gray-500 mt-1">Commission</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">50%</div>
                                <div className="text-sm text-gray-500 mt-1">Discount</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Lifetime</div>
                                <div className="text-sm text-gray-500 mt-1">Duration</div>
                            </motion.div>
                        </div>

                        {/* CTA Button */}
                        <motion.a
                            href="#application-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105"
                        >
                            {content?.hero?.cta}
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content?.benefits?.title}</h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/50 to-pink-500/50 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                <div className="relative bg-[#12141A] border border-white/5 rounded-2xl p-6 h-full hover:border-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                                        <benefit.icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Feature List */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{content?.features?.title}</h2>
                            <div className="space-y-4">
                                {content?.features?.items?.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-green-400" />
                                        </div>
                                        <span className="text-gray-300">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />
                            <div className="relative bg-[#12141A] border border-white/10 rounded-2xl p-8">
                                {/* Mock Dashboard */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Dashboard Affilié</span>
                                        <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded-full">Live</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-xl p-4">
                                            <div className="text-xs text-gray-500 mb-1">Parrainages</div>
                                            <div className="text-2xl font-bold text-white">24</div>
                                            <div className="text-xs text-green-400 mt-1">+3 ce mois</div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4">
                                            <div className="text-xs text-gray-500 mb-1">Commissions</div>
                                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">847€</div>
                                            <div className="text-xs text-green-400 mt-1">+156€ ce mois</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">JD</div>
                                                <div>
                                                    <div className="text-sm text-white">Jean D.</div>
                                                    <div className="text-xs text-gray-500">Growth Plan</div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-green-400">+22.35€</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">ML</div>
                                                <div>
                                                    <div className="text-sm text-white">Marie L.</div>
                                                    <div className="text-xs text-gray-500">Scale Plan</div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-green-400">+37.35€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section id="application-form" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content?.form?.title}</h2>
                        <p className="text-gray-400">{content?.form?.disclaimer}</p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-50" />
                        <div className="relative bg-[#12141A] border border-white/10 rounded-2xl p-8 md:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.firstName}</label>
                                    <input
                                        type="text"
                                        placeholder={content?.form?.placeholders?.firstName}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.lastName}</label>
                                    <input
                                        type="text"
                                        placeholder={content?.form?.placeholders?.lastName}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.email}</label>
                                <input
                                    type="email"
                                    placeholder={content?.form?.placeholders?.email}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            {/* Website */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.website}</label>
                                <input
                                    type="url"
                                    placeholder={content?.form?.placeholders?.website}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            {/* Audience */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.audience}</label>
                                <input
                                    type="text"
                                    placeholder={content?.form?.placeholders?.audience}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            {/* Promotion Strategy */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.promotion}</label>
                                <textarea
                                    rows={3}
                                    placeholder={content?.form?.placeholders?.promotion}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                                />
                            </div>

                            {/* Motivation */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{content?.form?.fields?.motivation}</label>
                                <textarea
                                    rows={3}
                                    placeholder={content?.form?.placeholders?.motivation}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                            >
                                {content?.form?.submit}
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* TODO Notice - Placeholder form */}
                            <p className="text-center text-xs text-gray-500 mt-4">
                                {/* Form is currently a placeholder - integration coming soon */}
                            </p>
                        </div>
                    </motion.form>
                </div>
            </section>

            <Footer content={dict.footer} lang={lang} />
        </div>
    );
};

export default AffiliatePage;
