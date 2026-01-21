'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
    >
        {/* Stars */}
        <div className="flex gap-1 mb-5">
            {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
            ))}
        </div>

        {/* Quote */}
        <p className="text-zinc-300 leading-relaxed mb-6 text-[15px]">
            &quot;{testimonial.text}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-5 border-t border-white/[0.05]">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-semibold`}>
                {testimonial.avatar}
            </div>
            <div>
                <div className="font-medium text-white">{testimonial.name}</div>
                <div className="text-sm text-zinc-500">{testimonial.role}</div>
            </div>
        </div>
    </motion.div>
);

const Testimonials = ({ content }) => {
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
        <section className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grain pointer-events-none" />

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

                    <h2 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        {content?.title?.main}{' '}
                        <span className="text-gradient-orange">{content?.title?.highlight}</span>
                    </h2>

                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        {content?.subtitle}
                    </p>
                </motion.div>

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
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{content?.stats?.activeUsers || "+2500 e-marchands actifs"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>{content?.stats?.satisfaction || "4.9/5 satisfaction"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>{content?.stats?.support || "Support en moins de 2h"}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
