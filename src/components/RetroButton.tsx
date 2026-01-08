/* eslint-disable jsx-a11y/aria-proptypes */
import React from "react";

interface RetroButtonProps {
  children?: React.ReactNode;
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function RetroButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  className = "",
}: RetroButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled ? "true" : "false"}
      aria-busy={isLoading ? "true" : "false"}
      className={`
        relative inline-block px-6 py-3
        font-bold uppercase tracking-wide
        rounded-xl
        transition-all duration-150

        bg-(--color-bg-button)
        text-(--color-text-button)

        border-2 border-black
        shadow-(--retro-shadow)
        motion-press

        active:shadow-none active:translate-x-1 active:translate-y-1

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#d2ad4b]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-(--color-bg-navbarAndFooter)

        disabled:opacity-50 disabled:cursor-not-allowed

        ${className}
      `}
    >
      {children}
    </button>
  );
}