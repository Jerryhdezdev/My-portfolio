// RetroButton.tsx
import React from "react";

interface RetroButtonProps {
  text: string;             
  onClick?: () => void;      
  className?: string;         
}

const RetroButton: React.FC<RetroButtonProps> = ({
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-block px-6 py-3
        font-bold uppercase tracking-wide
        rounded-xl
        transition-all duration-150

        bg-(--color-bg-button)
        text-(--color-text-button)

        border-4 border-black
        shadow-(--retro-shadow)
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5

        active:shadow-none active:translate-x-1 active:translate-y-1

    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#d2ad4b]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-(--color-bg-navbarAndFooter)



        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default RetroButton;
