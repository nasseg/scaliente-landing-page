'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Maxime D.",
        role: "Fondateur, 7 figures/an",
        avatar: "M",
        color: "from-orange-500 to-pink-500",
        rating: 5,
        text: "J'ai utilisé un concurrent premium pendant 4 ans. Beaucoup trop complexe pour ce que j'en faisais réellement. Scaliente me donne exactement ce dont j'ai besoin : ma rentabilité réelle, en quelques secondes. Et surtout, le prix n'explose pas avec mon chiffre d'affaires.",
    },
    {
        name: "Sarah L.",
        role: "E-commerçante, Multi-shops",
        avatar: "S",
        color: "from-blue-500 to-purple-500",
        rating: 5,
        text: "Mon ancien outil était trop cher et m'induisait en erreur. Je prenais des décisions basées sur des métriques inutiles. Depuis que je suis sur Scaliente, mes décisions sont claires et le support est ultra réactif. Ils ajoutent des features en continu !",
    },
    {
        name: "Thomas B.",
        role: "Dropshipper, Testing intensif",
        avatar: "T",
        color: "from-green-500 to-teal-500",
        rating: 5,
        text: "Je postais mes \"wins\" sur X alors qu'en réalité, c'était des journées catastrophiques. Avec Scaliente, j'ai découvert que mon produit à 1K/jour n'était rentable qu'à 8%. J'ai pu couper mes tests perdants et identifier mes vrais winners.",
    },
];

const TestimonialCard = ({ testimonial, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative group"
    >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-[#0F1115] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col">
            <Quote className="w-8 h-8 text-orange-500/30 mb-4" />

            <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
            </div>

            <p className="text-gray-300 leading-relaxed flex-1 mb-6">
                "{testimonial.text}"
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.avatar}
                </div>
                <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
            </div>
        </div>
    </motion.div>
);

const Testimonials = ({ content }) => {
    // Map dictionaries data to match component expectations
    // content.reviews is an array in dictionary
    const testimonials = content?.reviews?.map(review => ({
        // We might not have 'color' or 'avatar' in the dictionary, so we assign them based on the review index or name
        name: review.author,
        role: review.role,
        avatar: review.author.charAt(0),
        color: review.author.startsWith('T') ? "from-green-500 to-teal-500" : review.author.startsWith('S') ? "from-blue-500 to-purple-500" : "from-orange-500 to-pink-500", // Preserving original color logic based on mock data names essentially
        rating: 5,
        text: review.text
    })) || [
            // Fallback to avoid crash if dictionary is missing
            {
                name: "Maxime D.",
                role: "Fondateur, 7 figures/an",
                avatar: "M",
                color: "from-orange-500 to-pink-500",
                rating: 5,
                text: "J'ai utilisé un concurrent premium pendant 4 ans. Beaucoup trop complexe pour ce que j'en faisais réellement. Scaliente me donne exactement ce dont j'ai besoin : ma rentabilité réelle, en quelques secondes. Et surtout, le prix n'explose pas avec mon chiffre d'affaires.",
            }
        ];

    return (
        <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
                        {content?.badge || "Testimonials"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {content?.title?.main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{content?.title?.highlight}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {content?.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{content?.stats?.activeUsers || "+2500 active e-merchants"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>{content?.stats?.satisfaction || "4.9/5 satisfaction"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>{content?.stats?.support || "Support in under 2h"}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
