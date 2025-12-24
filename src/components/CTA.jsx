const CTA = ({ content }) => (
    <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{content?.title}</h2>
            <p className="text-xl text-gray-300 mb-10">{content?.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                    href="https://app.scaliente.com"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all text-center"
                >
                    {content?.button}
                </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">{content?.noCard}</p>
        </div>
    </section>
);

export default CTA;
