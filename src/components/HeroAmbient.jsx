const HeroAmbient = () => (
    <div className="hero-ambient pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="hero-ambient__depth absolute inset-0" />
        <div className="hero-ambient__light-pass absolute" />
    </div>
);

export default HeroAmbient;
