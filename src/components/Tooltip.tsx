import { useId, type ReactNode, useEffect, useRef,useState } from "react";
import { useTranslation } from "react-i18next";

export const Tooltip = ({
  labelKey,
  children,
}: {
  labelKey: string;
  children: ReactNode;
}) => {
  const { t } = useTranslation();
  const label = t(labelKey);
  const id = useId();
  const [visible, setVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  // Clear sticky states when tab/window regains focus
  useEffect(() => {
    
    const handleFocus = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      if (parentRef.current) {
        parentRef.current.dispatchEvent(new Event("mouseleave"));
      }
      setVisible(false);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Hide tooltip immediately on click or Enter/Space key
const handleClick = () => {
  if (parentRef.current) {
    parentRef.current.dispatchEvent(new Event("mouseleave"));
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (parentRef.current) {
        parentRef.current.dispatchEvent(new Event("mouseleave"));
      }
    }
  };

  return (
    <div
      ref={parentRef} // reference to the parent div
      className="tooltip-parent" // styling wrapper for positioning
      aria-describedby={`tooltip-${id}`} // accessibility: associates tooltip with the parent
      onMouseEnter={() => setVisible(true)} // show tooltip on hover
      onMouseLeave={() => setVisible(false)} // hide tooltip when hover ends
      onFocus={() => setVisible(true)} // show tooltip on keyboard focus
      onBlur={() => setVisible(false)} // hide tooltip on keyboard blur
      onClick={handleClick} // hide tooltip on click
      onKeyDown={handleKeyDown} // hide tooltip on Enter/Space key
      tabIndex={0} // make div focusable for keyboard navigation
    >
      {children} {/* render the child element(s) inside the tooltip wrapper */}

      {/* Tooltip element, only rendered when visible */}
      {visible && (
        <div
          id={`tooltip-${id}`} // unique id for accessibility
          role="tooltip" // ARIA role for assistive technologies
          className={`tooltip ${visible ? "tooltip-visible" : ""}`} // styling for the tooltip box
        >
          {label} {/* translated tooltip text */}
        </div>
      )}
    </div>
  );
};