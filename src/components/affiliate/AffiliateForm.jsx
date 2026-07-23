'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

const EMPTY_FORM = { firstName: '', lastName: '', email: '', website: '', promotion: '' };

function Field({ label, name, value, placeholder, onChange, type = 'text', textarea = false, required = false }) {
    const className = 'mt-2 min-h-12 w-full rounded-[10px] border border-zinc-200 bg-white px-4 text-base text-zinc-950 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10';
    return (
        <label className="block text-sm font-medium text-zinc-800">
            {label}
            {textarea
                ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={5} className={`${className} resize-y py-3`} />
                : <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className={className} />}
        </label>
    );
}

export default function AffiliateForm({ content, lang = 'fr' }) {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status === 'loading') return;
        setStatus('loading');
        setError('');

        try {
            const response = await fetch('/api/affiliate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, lang }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Unable to submit application');
            setStatus('success');
            setFormData(EMPTY_FORM);
        } catch (submissionError) {
            setError(submissionError.message || 'Unable to submit application');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-6 w-6" aria-hidden="true" /></span>
                <h2 className="mt-7 font-brand text-4xl font-semibold tracking-[-0.045em]">{content?.form?.successTitle}</h2>
                <p className="mt-4 text-zinc-600">{content?.form?.successMessage}</p>
            </div>
        );
    }

    const fields = content?.form?.fields || {};
    const placeholders = content?.form?.placeholders || {};
    const change = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

    return (
        <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">05 / Candidature</p>
                <h2 className="mt-6 text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content?.form?.title}</h2>
                <p className="mt-6 text-sm leading-6 text-zinc-600">{content?.form?.disclaimer}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-[20px] border border-zinc-200 bg-white p-5 sm:p-8">
                {error && <p role="alert" className="rounded-[10px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={fields.firstName} name="firstName" value={formData.firstName} placeholder={placeholders.firstName} onChange={change} required />
                    <Field label={fields.lastName} name="lastName" value={formData.lastName} placeholder={placeholders.lastName} onChange={change} required />
                </div>
                <Field label={fields.email} name="email" type="email" value={formData.email} placeholder={placeholders.email} onChange={change} required />
                <Field label={fields.website} name="website" type="url" value={formData.website} placeholder={placeholders.website} onChange={change} />
                <Field label={fields.promotion} name="promotion" value={formData.promotion} placeholder={placeholders.promotion} onChange={change} textarea />
                <button type="submit" disabled={status === 'loading'} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-400 disabled:cursor-wait disabled:opacity-60">
                    {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}{content?.form?.submit}
                </button>
            </form>
        </div>
    );
}
