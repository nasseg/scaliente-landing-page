'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-zinc-200 last:border-0"
    >
        <button
            onClick={onClick}
            className="w-full py-6 flex items-center justify-between gap-4 text-left group"
        >
            <span className={`text-lg font-medium transition-colors duration-200 ${
                isOpen ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'
            }`}>
                {question}
            </span>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen
                    ? 'bg-orange-100 border border-orange-200'
                    : 'bg-zinc-100 border border-zinc-200 group-hover:border-zinc-300'
            }`}>
                {isOpen ? (
                    <Minus className="w-4 h-4 text-orange-600" />
                ) : (
                    <Plus className="w-4 h-4 text-zinc-500 group-hover:text-zinc-700" />
                )}
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-zinc-600 leading-relaxed pl-0 pr-12">
                        {answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const FAQ = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = content?.questions ? Object.values(content.questions).map(q => ({
        question: q.q,
        answer: q.a
    })) : [];

    return (
        <section className="py-20 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-600 text-sm font-medium mb-6">
                        {content?.badge || "FAQ"}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                        {content?.title}
                    </h2>

                    <p className="text-lg text-zinc-600">
                        {content?.subtitle}
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="rounded-2xl bg-white border border-zinc-200 p-6 md:p-8 shadow-sm">
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
