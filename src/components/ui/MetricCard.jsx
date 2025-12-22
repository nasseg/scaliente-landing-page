'use client';
import { motion } from 'framer-motion';

const MetricCard = ({ title, value, trend, color, isExpense, isHighlight, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay, duration: 0.4 }}
        className={`p-4 rounded-xl border ${isHighlight
            ? 'bg-gradient-to-b from-white/10 to-white/5 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]'
            : 'bg-white/5 border-white/5'
            }`}
    >
        <div className="flex justify-between items-start mb-2">
            <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
            <span className={`text-xs px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{trend}</span>
        </div>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        {isExpense && <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-3/4"></div>
        </div>}
        {isHighlight && <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full animate-pulse"></div>
        </div>}
    </motion.div>
);

export default MetricCard;
