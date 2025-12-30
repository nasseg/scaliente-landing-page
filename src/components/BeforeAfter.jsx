'use client';
import { motion } from 'framer-motion';
import { X, Check, FileSpreadsheet, Frown, LayoutGrid, Smile, AlertTriangle, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const BrandIcons = {
    Google: () => (
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.52 12.273c0-.85-.076-1.67-.218-2.452H12v4.637h6.455c-.278 1.5-1.127 2.772-2.396 3.619v3.01h3.88c2.273-2.092 3.585-5.173 3.585-8.814z" fill="#4285F4" />
            <path d="M12 24c3.24 0 5.956-1.074 7.942-2.906l-3.88-3.01c-1.078.722-2.456 1.15-4.062 1.15-3.124 0-5.77-2.11-6.713-4.944H1.272v3.111C3.253 21.365 7.275 24 12 24z" fill="#34A853" />
            <path d="M5.287 14.29c-.244-.733-.383-1.52-.383-2.29s.139-1.557.383-2.29V6.599H1.272C.46 8.21.002 10.038.002 12s.458 3.791 1.27 5.401l4.015-3.111z" fill="#FBBC05" />
            <path d="M12 4.75c1.764 0 3.35.607 4.596 1.795l3.444-3.445C17.95 1.153 15.235 0 12 0 7.275 0 3.253 2.635 1.272 6.599l4.015 3.111c.943-2.834 3.589-4.96 6.713-4.96z" fill="#EA4335" />
        </svg>
    ),
    Meta: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: '#0668E1' }}>
            <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
        </svg>
    ),
    TikTok: () => (
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" style={{ color: '#ffffff' }}>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    ),
    Snapchat: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: '#FFFC00' }}>
            <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
        </svg>
    ),
    Pinterest: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: '#E60023' }}>
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
    ),
    Shopify: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: '#96bf48' }}>
            <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" />
        </svg>
    ),
};

const BrowserWindow = ({ children, url, tabs = [], activeTabIndex = 0, className = "", compact = false }) => (
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
                            rounded-t-lg text-[10px] sm:text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-default select-none
                            ${compact ? 'w-9 h-8 p-0' : 'px-3 py-2 min-w-fit'}
                            ${idx === activeTabIndex
                                ? 'bg-[#1A1D24] text-gray-200 border-t border-x border-white/5 relative z-10'
                                : 'bg-white/[0.02] text-gray-600 hover:bg-white/[0.04] hover:text-gray-400 mb-0.5'}
                        `}
                        title={tab.name}
                    >
                        {tab.icon ? tab.icon : <div className={`w-2 h-2 rounded-full ${tab.color}`} />}
                        {!compact && <span className="truncate max-w-[60px] sm:max-w-none">{tab.name}</span>}
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
                            compact={true}
                            className="h-[400px]"
                            tabs={[
                                { name: content?.before?.tabs?.profitCalc || 'Profit Calc v3', icon: <FileSpreadsheet className="w-4 h-4 text-green-600" /> },
                                { name: content?.before?.tabs?.businessManager || 'Meta', icon: <BrandIcons.Meta /> },
                                { name: content?.before?.tabs?.googleAds || 'Google Ads', icon: <BrandIcons.Google /> },
                                { name: content?.before?.tabs?.tiktokAds || 'TikTok', icon: <BrandIcons.TikTok /> },
                                { name: content?.before?.tabs?.snapchatAds || 'Snapchat', icon: <BrandIcons.Snapchat /> },
                                { name: content?.before?.tabs?.pinterest || 'Pinterest', icon: <BrandIcons.Pinterest /> },
                                { name: content?.before?.tabs?.shopifyAdmin || 'Shopify', icon: <BrandIcons.Shopify /> },
                                { name: content?.before?.tabs?.googleAds || 'Google Ads', icon: <BrandIcons.Google /> },
                                { name: content?.before?.tabs?.businessManager || 'Meta', icon: <BrandIcons.Meta /> },
                                { name: content?.before?.tabs?.tiktokAds || 'TikTok', icon: <BrandIcons.TikTok /> },
                                { name: content?.before?.tabs?.shopifyAdmin || 'Shopify', icon: <BrandIcons.Shopify /> },
                                { name: content?.before?.tabs?.snapchatAds || 'Snapchat', icon: <BrandIcons.Snapchat /> },
                                { name: content?.before?.tabs?.pinterest || 'Pinterest', icon: <BrandIcons.Pinterest /> },
                                { name: content?.before?.tabs?.businessManager || 'Meta', icon: <BrandIcons.Meta /> },
                                { name: content?.before?.tabs?.googleAds || 'Google Ads', icon: <BrandIcons.Google /> },
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
