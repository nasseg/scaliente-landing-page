'use client';
import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

const EmailCaptureForm = ({
    onSubmit,
    placeholder = 'Votre email',
    buttonText = 'Envoyer',
    variant = 'inline', // 'inline' | 'stacked'
    fields = 'email', // 'email' | 'email+name'
    successMessage = 'Merci !',
    className = ''
}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Email invalide');
            return;
        }

        setStatus('loading');
        try {
            await onSubmit?.({ email, name });
            setStatus('success');
            setEmail('');
            setName('');
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Une erreur est survenue');
        }
    };

    if (status === 'success') {
        return (
            <div className={`flex items-center gap-2 text-emerald-500 font-medium ${className}`}>
                <Check className="w-5 h-5" />
                <span>{successMessage}</span>
            </div>
        );
    }

    const isInline = variant === 'inline';

    return (
        <form onSubmit={handleSubmit} className={`${className}`}>
            <div className={isInline ? 'flex gap-2' : 'space-y-3'}>
                {fields === 'email+name' && (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm"
                    />
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder={placeholder}
                    required
                    className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm ${
                        error
                            ? 'border-red-400 bg-red-500/5 text-red-400 placeholder:text-red-400/50'
                            : 'bg-white/10 border-white/10 text-white placeholder:text-zinc-500'
                    }`}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)] transition-all duration-300 text-sm inline-flex items-center gap-2 shrink-0 disabled:opacity-60"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            {buttonText}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </form>
    );
};

export default EmailCaptureForm;
