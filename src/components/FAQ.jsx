'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const FAQ = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = Object.values(content?.questions || {});

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <h2 className="max-w-[11ch] text-balance font-brand text-[clamp(2.7rem,5vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.04em]">{content?.title}</h2>
                    <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.subtitle}</p>
                </div>

                <div className="border-b border-[var(--divider)]">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const answerId = `faq-answer-${index}`;
                        return (
                            <article key={faq.q} className="border-t border-[var(--divider)]">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    className="flex min-h-16 w-full items-center justify-between gap-5 py-6 text-left"
                                >
                                    <span className="max-w-[60ch] font-brand text-lg font-semibold tracking-[-0.02em]">{faq.q}</span>
                                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-orange-500 text-white' : 'border border-[var(--card-border)] text-[var(--text-secondary)]'}`}>
                                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </span>
                                </button>
                                <div id={answerId} role="region" className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="max-w-[70ch] pb-7 pr-10 text-pretty leading-7 text-[var(--text-secondary)]">{faq.a}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
