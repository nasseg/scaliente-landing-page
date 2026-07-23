const Section = ({ id, className = '', frosted, children, ...props }) => (
  <div
    id={id}
    data-header-theme={frosted ? 'dark' : 'light'}
    className={`reveal-section relative ${frosted ? 'bg-[#09090b]' : 'z-10 overflow-clip rounded-[28px] bg-[var(--section-bg)] sm:rounded-[42px]'} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Section;
