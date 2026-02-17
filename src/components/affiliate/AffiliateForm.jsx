'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

const AffiliateForm = ({ content, lang = 'fr' }) => {
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

    return (
        <div className="py-20">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-brand text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">{content?.form?.title}</h2>
                    <p className="text-[var(--text-secondary)]">{content?.form?.disclaimer}</p>
                </motion.div>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[var(--card-bg)] border border-emerald-500/20 rounded-2xl p-8 md:p-10 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{content?.form?.successTitle}</h3>
                        <p className="text-[var(--text-secondary)]">{content?.form?.successMessage}</p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-10"
                        onSubmit={handleSubmit}
                    >
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">{content?.form?.fields?.firstName}</label>
                                <input
                                    type="text" name="firstName" required
                                    value={formData.firstName} onChange={handleChange}
                                    placeholder={content?.form?.placeholders?.firstName}
                                    className="w-full px-4 py-3 bg-[var(--card-bg-alt)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">{content?.form?.fields?.lastName}</label>
                                <input
                                    type="text" name="lastName" required
                                    value={formData.lastName} onChange={handleChange}
                                    placeholder={content?.form?.placeholders?.lastName}
                                    className="w-full px-4 py-3 bg-[var(--card-bg-alt)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">{content?.form?.fields?.email}</label>
                            <input
                                type="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                placeholder={content?.form?.placeholders?.email}
                                className="w-full px-4 py-3 bg-[var(--card-bg-alt)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">{content?.form?.fields?.website}</label>
                            <input
                                type="url" name="website"
                                value={formData.website} onChange={handleChange}
                                placeholder={content?.form?.placeholders?.website}
                                className="w-full px-4 py-3 bg-[var(--card-bg-alt)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">{content?.form?.fields?.promotion}</label>
                            <textarea
                                rows={3} name="promotion"
                                value={formData.promotion} onChange={handleChange}
                                placeholder={content?.form?.placeholders?.promotion}
                                className="w-full px-4 py-3 bg-[var(--card-bg-alt)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
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
        </div>
    );
};

export default AffiliateForm;
