'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => (
    <article>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300"
        >
            <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-[15px]">
                &quot;{testimonial.text}&quot;
            </p>
            <div className="flex items-center gap-4 pt-5 border-t border-[var(--divider)]">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-semibold`}>
                    {testimonial.avatar}
                </div>
                <div>
                    <div className="font-medium text-[var(--text-primary)]">{testimonial.name}</div>
                    <div className="text-sm text-[var(--text-muted)]">{testimonial.role}</div>
                </div>
            </div>
        </motion.div>
    </article>
);

const Testimonials = ({ content, founderStory }) => {
    const testimonials = content?.reviews?.map((review, idx) => ({
        name: review.author,
        role: review.role,
        avatar: review.author.charAt(0),
        color: idx === 0 ? "from-orange-500 to-amber-500" :
               idx === 1 ? "from-blue-500 to-indigo-500" :
               "from-emerald-500 to-teal-500",
        rating: 5,
        text: review.text
    })) || [];

    return (
        <section id="testimonials" className="py-32">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-sm font-medium mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {content?.badge || "Testimonials"}
                    </span>

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                        {content?.title?.main}{' '}
                        <span className="text-gradient-orange">{content?.title?.highlight}</span>
                    </h2>

                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        {content?.subtitle}
                    </p>
                </motion.div>

                {/* Founder Quote (integrated from FounderStory) */}
                {founderStory?.founderStory?.quote && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto mb-12"
                    >
                        <div className="relative p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-orange-500/10">
                            <Quote className="absolute top-4 left-4 w-8 h-8 text-orange-500/15" />
                            <blockquote className="relative z-10">
                                <p className="text-lg md:text-xl text-[var(--text-primary)] leading-relaxed mb-4 italic pl-6">
                                    &quot;{founderStory.founderStory.quote}&quot;
                                </p>
                                <footer className="flex items-center gap-3 pl-6">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                        S
                                    </div>
                                    <div>
                                        <div className="font-medium text-[var(--text-primary)] text-sm">{founderStory.founderStory.author}</div>
                                        <div className="text-xs text-[var(--text-muted)]">{founderStory.founderStory.role}</div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </motion.div>
                )}

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm"
                >
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{content?.stats?.activeUsers || "+2500 e-marchands actifs"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>{content?.stats?.satisfaction || "4.9/5 satisfaction"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>{content?.stats?.support || "Support en moins de 2h"}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
