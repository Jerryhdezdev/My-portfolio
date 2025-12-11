interface SectionDividerProps {
  className?: string;      
  primaryClass?: string;   
  altClass?: string;       
}

export function SectionDivider({
  className = "",
  primaryClass = "",
  altClass = "",
}: SectionDividerProps) {
  return (
    <div
      className={`
        flex flex-row max-w-full gap-6
        ${className}
      `}
      aria-hidden="true"
    >
      {/* Main divider */}
      <div className={`section-divider ${primaryClass}`}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Alternate divider */}
      <div className={`section-divider-alt ${altClass}`}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
