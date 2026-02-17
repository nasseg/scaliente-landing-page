// Shared ease curve used everywhere
export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

// Container with stagger children
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

// Item fade-in-up
export const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: EASE_SMOOTH
        }
    }
};

// Simple fade in up (for individual elements)
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: EASE_SMOOTH }
};

// Stagger children (alternative with different timing)
export const staggerChildren = (stagger = 0.08, delay = 0.1) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger,
            delayChildren: delay
        }
    }
});
