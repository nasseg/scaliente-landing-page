'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    const answerId = `faq-answer-${index}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-[var(--divider)] last:border-0"
        >
            <button
                onClick={onClick}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full py-6 flex items-center justify-between gap-4 text-left group"
            >
                <span className={`text-lg font-medium transition-colors duration-200 ${
                    isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                }`}>
                    {question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                        ? 'bg-orange-100 border border-orange-200'
                        : 'bg-[var(--card-bg-alt)] border border-[var(--card-border)] group-hover:border-[var(--card-border-hover)]'
                }`}>
                    {isOpen ? (
                        <Minus className="w-4 h-4 text-orange-600" />
                    ) : (
                        <Plus className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-muted)]" />
                    )}
                </div>
            </button>
            <motion.div
                id={answerId}
                role="region"
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-[var(--text-muted)] leading-relaxed pl-0 pr-12">
                    {answer}
                </p>
            </motion.div>
        </motion.div>
    );
};

const FAQ = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = content?.questions ? Object.values(content.questions).map(q => ({
        question: q.q,
        answer: q.a
    })) : [];

    return (
        <section id="faq" className="py-24 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg-alt)] text-[var(--text-muted)] text-sm font-medium mb-6">
                        {content?.badge || "FAQ"}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[var(--text-primary)] mb-6 tracking-[-0.025em]">
                        {content?.title}
                    </h2>

                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                        {content?.subtitle}
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 md:p-8 shadow-sm">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            index={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
