import React from 'react';

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors group">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default FeatureCard;
