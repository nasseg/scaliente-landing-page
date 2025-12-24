'use client';
import { motion } from 'framer-motion';

const AnimatedGrid = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-[#0F1115]" />
        </div>
    );
};

export default AnimatedGrid;
