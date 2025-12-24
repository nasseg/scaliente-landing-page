'use client';
import { motion } from 'framer-motion';
import { X, Check, FileSpreadsheet, Frown, LayoutGrid, Smile, AlertTriangle, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const BrowserWindow = ({ children, url, tabs = [], activeTabIndex = 0, className = "" }) => (
    <div className={`bg-[#1A1D24] rounded-xl border border-white/5 overflow-hidden shadow-2xl flex flex-col ${className}`}>
        {/* Window Chrome */}
        <div className="bg-[#0F1115] px-4 pt-3 pb-0 flex items-end gap-4 border-b border-black/50">
            <div className="flex gap-1.5 mb-3 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors" />
            </div>
            {/* Tabs */}
            <div className="flex-1 flex items-end gap-1 overflow-hidden mask-linear-fade-right">
                {tabs.map((tab, idx) => (
                    <div
                        key={idx}
                        className={`
                            px-3 py-2 rounded-t-lg text-[10px] sm:text-xs font-medium flex items-center gap-2 min-w-fit transition-all cursor-default select-none
                            ${idx === activeTabIndex
                                ? 'bg-[#1A1D24] text-gray-200 border-t border-x border-white/5 relative z-10'
                                : 'bg-white/[0.02] text-gray-600 hover:bg-white/[0.04] hover:text-gray-400 mb-0.5'}
                        `}
                    >
                        <div className={`w-2 h-2 rounded-full ${tab.color}`} />
                        <span className="truncate max-w-[60px] sm:max-w-none">{tab.name}</span>
                        {idx === activeTabIndex && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A1D24]" />
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Address Bar */}
        <div className="bg-[#1A1D24] p-2 border-b border-white/5 flex items-center gap-3">
            <div className="flex gap-2 text-gray-600">
                <div className="w-4 h-4 rounded-full border border-gray-700/50" />
                <div className="w-4 h-4 rounded-full border border-gray-700/50" />
                <div className="w-4 h-4 rounded-full border border-gray-700/50" />
            </div>
            <div className="flex-1 bg-[#0F1115] rounded-md h-7 flex items-center px-3 text-[10px] text-gray-500 font-mono overflow-hidden">
                <span className="opacity-50 mr-1">https://</span>{url}
            </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 relative bg-[#15181E] overflow-hidden">
            {children}
        </div>
    </div>
);

const BeforeAfter = ({ content }) => {
    return (
        <section id="comparison" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {content?.title?.main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{content?.title?.highlight}</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        {content?.subtitle}
                    </p>
                </motion.div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* BEFORE - Browser Chaos */}
                    <div className="relative group">
                        {/* Status Label */}
                        <div className="absolute -top-12 left-0 text-red-500 font-bold flex items-center gap-2">
                            <X className="w-5 h-5" />
                            <span>{content?.before?.label}</span>
                        </div>

                        <BrowserWindow
                            url="docs.google.com/spreadsheets/u/0/d/1Xy8..."
                            activeTabIndex={0}
                            className="h-[400px]"
                            tabs={[
                                { name: content?.before?.tabs?.profitCalc || 'Profit Calc v3', color: 'bg-green-600' },
                                { name: content?.before?.tabs?.businessManager || 'Business Manager', color: 'bg-blue-600' },
                                { name: content?.before?.tabs?.googleAds || 'Google Ads', color: 'bg-yellow-500' },
                                { name: content?.before?.tabs?.tiktokAds || 'TikTok Ads', color: 'bg-pink-500' },
                                { name: content?.before?.tabs?.snapchatAds || 'Snapchat Ads', color: 'bg-yellow-300' },
                                { name: content?.before?.tabs?.pinterest || 'Pinterest', color: 'bg-red-600' },
                                { name: content?.before?.tabs?.shopifyAdmin || 'Shopify Admin', color: 'bg-green-400' },
                            ]}
                        >
                            {/* EXCEL UI */}
                            <div className="bg-white h-full w-full text-[10px] sm:text-xs text-black font-mono overflow-hidden flex flex-col opacity-90">
                                {/* Excel Toolbar */}
                                <div className="bg-[#1D6F42] text-white p-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileSpreadsheet className="w-4 h-4" />
                                        <span className="font-semibold">{content?.before?.excel?.filename}</span>
                                    </div>
                                    <div className="flex gap-2 opacity-80">
                                        <div className="w-16 h-4 bg-white/20 rounded-sm" />
                                        <div className="w-4 h-4 bg-white/20 rounded-full" />
                                    </div>
                                </div>
                                <div className="bg-[#F3F4F6] border-b border-gray-300 p-1 flex gap-2">
                                    <div className="bg-white border border-gray-300 px-2 py-0.5 rounded text-gray-500 flex-1">
                                        =SUM(B2:B10) - (C2*1.2)
                                    </div>
                                </div>
                                {/* Grid */}
                                <div className="flex-1 bg-white p-4 relative">
                                    <div className="grid grid-cols-5 gap-px bg-gray-200 border border-gray-300">
                                        {/* Header */}
                                        {(content?.before?.excel?.columns || ['Date', 'Rev', 'Ads', 'COGS', 'Net']).map(h => (
                                            <div key={h} className="bg-gray-100 p-1.5 font-bold text-gray-700 text-center">{h}</div>
                                        ))}
                                        {/* Rows */}
                                        <div className="contents text-gray-600">
                                            <div className="bg-white p-1.5 border-t border-gray-100">01/12</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">1250€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">?</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">450€</div>
                                            <div className="bg-red-50 p-1.5 border-t border-gray-100 text-red-500 font-bold">#REF!</div>

                                            <div className="bg-white p-1.5 border-t border-gray-100">02/12</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">1420€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">500€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">?</div>
                                            <div className="bg-yellow-50 p-1.5 border-t border-gray-100 text-yellow-600 font-bold">#DIV/0</div>

                                            <div className="bg-white p-1.5 border-t border-gray-100">03/12</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">980€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">320€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100">250€</div>
                                            <div className="bg-white p-1.5 border-t border-gray-100 text-gray-400">...</div>
                                        </div>
                                    </div>

                                    {/* Mouse Cursor Stress */}
                                    <div className="absolute bottom-10 right-10">
                                        <MousePointer2 className="w-6 h-6 text-black fill-white drop-shadow-xl animate-bounce" />
                                    </div>

                                    {/* Error Toast */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl border border-gray-200 p-3 rounded-lg flex items-center gap-2 min-w-[200px] animate-pulse">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        <span className="text-red-600 font-bold">{content?.before?.excel?.error}</span>
                                    </div>
                                </div>
                            </div>
                        </BrowserWindow>
                        <p className="mt-4 text-center text-gray-500 text-sm italic">
                            {content?.before?.quote}
                        </p>
                    </div>

                    {/* Arrow Divider for Mobile */}
                    <div className="flex justify-center lg:hidden -my-4 z-20 relative">
                        <div className="bg-[#1A1D24] border border-white/10 p-2 rounded-full">
                            <ArrowRight className="w-6 h-6 text-gray-500 rotate-90" />
                        </div>
                    </div>

                    {/* AFTER - Scaliente Clarity */}
                    <div className="relative group">
                        {/* Status Label */}
                        <div className="absolute -top-12 left-0 text-green-400 font-bold flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            <span>{content?.after?.label}</span>
                        </div>

                        <BrowserWindow
                            url="app.scaliente.com/dashboard"
                            activeTabIndex={0}
                            className="h-[400px] border-orange-500/20 ring-1 ring-orange-500/20"
                            tabs={[
                                { name: content?.after?.tabs?.scaliente || 'Scaliente', color: 'bg-orange-500' },
                            ]}
                        >
                            {/* DASHBOARD UI */}
                            <div className="bg-[#0b0c10] h-full w-full p-6 flex flex-col relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex flex-col">
                                        <h3 className="text-white font-bold text-xl">{content?.after?.dashboard?.title}</h3>
                                        <p className="text-gray-500 text-xs">{content?.after?.dashboard?.lastUpdate}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-green-400 text-xs font-bold">{content?.after?.dashboard?.live}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-[#15181E] p-4 rounded-xl border border-white/5">
                                        <div className="text-gray-500 text-xs font-medium uppercase mb-1">{content?.after?.dashboard?.netProfit}</div>
                                        <div className="text-2xl font-bold text-white">2,845€</div>
                                        <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
                                            <Zap className="w-3 h-3" /> {content?.after?.dashboard?.vsYesterday}
                                        </div>
                                    </div>
                                    <div className="bg-[#15181E] p-4 rounded-xl border border-white/5">
                                        <div className="text-gray-500 text-xs font-medium uppercase mb-1">{content?.after?.dashboard?.margin}</div>
                                        <div className="text-2xl font-bold text-white">32%</div>
                                        <div className="text-gray-500 text-xs mt-1">{content?.after?.dashboard?.stable}</div>
                                    </div>
                                </div>

                                <div className="flex-1 bg-[#15181E] rounded-xl border border-white/5 p-4 flex items-end gap-2 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-orange-600 to-pink-600 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                                    ))}
                                </div>

                                {/* Floating Notification */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="absolute bottom-4 right-4 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 flex items-center gap-2"
                                >
                                    <Check className="w-3 h-3 text-green-400" />
                                    {content?.after?.dashboard?.synced}
                                </motion.div>
                            </div>
                        </BrowserWindow>
                        <p className="mt-4 text-center text-gray-500 text-sm">
                            {content?.after?.quote}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
