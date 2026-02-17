'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Loader2, Gift } from 'lucide-react';

const ExitIntentPopup = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (sessionStorage.getItem('exitPopupShown')) return;

        let handler;
        const timer = setTimeout(() => {
            handler = (e) => {
                if (e.clientY <= 0) {
                    setIsVisible(true);
                    sessionStorage.setItem('exitPopupShown', 'true');
                    document.removeEventListener('mouseleave', handler);
                }
            };
            document.addEventListener('mouseleave', handler);
        }, 5000);

        return () => {
            clearTimeout(timer);
            if (handler) {
                document.removeEventListener('mouseleave', handler);
            }
        };
    }, []);

    const close = useCallback(() => {
        setIsVisible(false);
    }, []);

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'exit-intent' }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to subscribe');
            }

            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md bg-[#09090b]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {status === 'success' ? (
                            <div className="text-center py-4">
                                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <Check className="w-6 h-6 text-emerald-500" />
                                </div>
                                <p className="text-white font-brand text-xl font-bold mb-2">
                                    {content?.successMessage || 'Thank you!'}
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Icon */}
                                <div className="mx-auto w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-5">
                                    <Gift className="w-6 h-6 text-orange-500" />
                                </div>

                                {/* Title */}
                                <h3 className="text-white font-brand text-2xl font-bold text-center mb-2">
                                    {content?.title || 'Wait!'}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-zinc-400 text-center text-sm mb-6 leading-relaxed">
                                    {content?.subtitle || 'Get exclusive tips to boost your e-commerce profitability.'}
                                </p>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                        placeholder={content?.emailPlaceholder || 'Your email'}
                                        required
                                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm ${
                                            error
                                                ? 'border-red-400 bg-red-500/5 text-red-400 placeholder:text-red-400/50'
                                                : 'bg-white/10 border-white/10 text-white placeholder:text-zinc-500'
                                        }`}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full px-6 py-3 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
                                    >
                                        {status === 'loading' ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                {content?.cta || 'Get Free Tips'}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                                </form>

                                {/* No thanks */}
                                <button
                                    onClick={close}
                                    className="block mx-auto mt-4 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                                >
                                    {content?.noThanks || 'No thanks'}
                                </button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
