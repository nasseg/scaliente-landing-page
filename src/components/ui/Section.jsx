const Section = ({ id, className, frosted, children, ...props }) => {
  if (frosted) {
    return (
      <div id={id} className="relative py-3" {...props}>
        {/* Frame edges — block canvas on straight edges */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
        {/* Card wrapper */}
        <div className="relative mx-3 md:mx-4">
          <div className={`relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden border border-white/5 shadow-[0_0_0_1.25rem_#fafafa] md:shadow-[0_0_0_1.5rem_#fafafa] ${className || ''}`}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id={id}
      className={`bg-[var(--section-bg)] ${className || ''}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
