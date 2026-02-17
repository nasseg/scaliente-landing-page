'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Percent, Gift, Clock, CreditCard, Check, Users, TrendingUp,
    ArrowRight, Loader2, Share2, DollarSign, ChevronDown,
    Youtube, PenLine, Store, Megaphone
} from 'lucide-react';

const AffiliateContent = ({ content, lang = 'fr' }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        promotion: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/affiliate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, lang }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', website: '', promotion: '' });
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        { icon: Percent, ...content?.benefits?.items?.commission },
        { icon: Gift, ...content?.benefits?.items?.discount },
        { icon: Clock, ...content?.benefits?.items?.cookie },
        { icon: CreditCard, ...content?.benefits?.items?.payment },
    ];

    const steps = content?.howItWorks?.steps || [];

    const stepIcons = [Users, Share2, DollarSign];

    const audiences = [
        { icon: Youtube, ...content?.audiences?.items?.creators },
        { icon: PenLine, ...content?.audiences?.items?.bloggers },
        { icon: Store, ...content?.audiences?.items?.agencies },
        { icon: Megaphone, ...content?.audiences?.items?.merchants },
    ];

    const earningsRows = content?.earnings?.rows || [];

    const faqItems = content?.faq?.items || [];

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
                            <Users className="w-4 h-4 text-orange-400" />
                            <span className="text-sm font-medium text-orange-300">{content?.hero?.badge}</span>
                        </div>

                        {/* Title */}
                        <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="text-white">{content?.hero?.titleWhite}</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                                {content?.hero?.titleOrange}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {content?.hero?.subtitle}
                        </p>

                        {/* Stats Row */}
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

                        {/* CTA */}
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

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-brand text-3xl md:text-4xl font-bold text-white text-center mb-16"
                    >
                        {content?.benefits?.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-orange-500/20 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                    <benefit.icon className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-brand text-3xl md:text-4xl font-bold text-white text-center mb-16"
                    >
                        {content?.howItWorks?.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => {
                            const Icon = stepIcons[i] || Users;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="text-center relative"
                                >
                                    {/* Step number */}
                                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
                                        <Icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                                        {step.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>

                                    {/* Connector line */}
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Earnings Calculator */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-brand text-3xl md:text-4xl font-bold text-white mb-4">
                            {content?.earnings?.title}
                        </h2>
                        <p className="text-zinc-400 text-lg">{content?.earnings?.subtitle}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="grid grid-cols-4 gap-0 bg-white/[0.03] border-b border-white/5">
                            <div className="p-4 text-sm font-medium text-zinc-500">{content?.earnings?.colReferrals}</div>
                            <div className="p-4 text-sm font-medium text-zinc-500">{content?.earnings?.colPlan}</div>
                            <div className="p-4 text-sm font-medium text-zinc-500">{content?.earnings?.colMonthly}</div>
                            <div className="p-4 text-sm font-medium text-zinc-500">{content?.earnings?.colYearly}</div>
                        </div>

                        {/* Rows */}
                        {earningsRows.map((row, i) => (
                            <div key={i} className={`grid grid-cols-4 gap-0 border-b border-white/5 last:border-b-0 ${i === earningsRows.length - 1 ? 'bg-orange-500/[0.05]' : ''}`}>
                                <div className="p-4 text-sm text-white font-medium">{row.referrals}</div>
                                <div className="p-4 text-sm text-zinc-300">{row.plan}</div>
                                <div className="p-4 text-sm font-semibold text-emerald-400">{row.monthly}</div>
                                <div className="p-4 text-sm font-bold text-orange-400">{row.yearly}</div>
                            </div>
                        ))}
                    </motion.div>

                    <p className="text-center text-xs text-zinc-500 mt-4">{content?.earnings?.disclaimer}</p>
                </div>
            </section>

            {/* Who Should Join */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-brand text-3xl md:text-4xl font-bold text-white text-center mb-16"
                    >
                        {content?.audiences?.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {audiences.map((aud, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center hover:border-orange-500/20 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                                    <aud.icon className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{aud.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{aud.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview + Features */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Features */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-brand text-3xl md:text-4xl font-bold text-white mb-8">{content?.features?.title}</h2>
                            <div className="space-y-4">
                                {(content?.features?.items || []).map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <span className="text-zinc-300">{item}</span>
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
                                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">847€</div>
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
                                            <span className="text-sm text-emerald-400">+22.35€</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">ML</div>
                                                <div>
                                                    <div className="text-sm text-white">Marie L.</div>
                                                    <div className="text-xs text-zinc-500">Scale Plan</div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-emerald-400">+37.35€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-brand text-3xl md:text-4xl font-bold text-white text-center mb-12"
                    >
                        {content?.faq?.title}
                    </motion.h2>

                    <div className="space-y-3">
                        {faqItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                                >
                                    <span className="text-white font-medium pr-4">{item.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="application-form" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.05] via-transparent to-transparent pointer-events-none" />
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-brand text-3xl md:text-4xl font-bold text-white mb-4">{content?.form?.title}</h2>
                        <p className="text-zinc-400">{content?.form?.disclaimer}</p>
                    </motion.div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.03] border border-emerald-500/20 rounded-2xl p-8 md:p-10 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{content?.form?.successTitle}</h3>
                            <p className="text-zinc-400">{content?.form?.successMessage}</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 md:p-10"
                            onSubmit={handleSubmit}
                        >
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">{content?.form?.fields?.firstName}</label>
                                    <input
                                        type="text" name="firstName" required
                                        value={formData.firstName} onChange={handleChange}
                                        placeholder={content?.form?.placeholders?.firstName}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">{content?.form?.fields?.lastName}</label>
                                    <input
                                        type="text" name="lastName" required
                                        value={formData.lastName} onChange={handleChange}
                                        placeholder={content?.form?.placeholders?.lastName}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">{content?.form?.fields?.email}</label>
                                <input
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                    placeholder={content?.form?.placeholders?.email}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">{content?.form?.fields?.website}</label>
                                <input
                                    type="url" name="website"
                                    value={formData.website} onChange={handleChange}
                                    placeholder={content?.form?.placeholders?.website}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">{content?.form?.fields?.promotion}</label>
                                <textarea
                                    rows={3} name="promotion"
                                    value={formData.promotion} onChange={handleChange}
                                    placeholder={content?.form?.placeholders?.promotion}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit" disabled={loading}
                                className="w-full py-4 bg-gradient-to-b from-orange-500 to-orange-600 rounded-xl font-bold text-lg text-white hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {content?.form?.submit}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </div>
            </section>
        </>
    );
};

export default AffiliateContent;
