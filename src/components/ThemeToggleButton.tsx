import React from "react";

interface ThemeToggleButtonProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300
        bg-black text-gray-300
        shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.7),0_4px_6px_rgba(0,0,0,0.8)]
        active:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.9),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]
      `}
    >
      {/* Power symbol */}
      <span className="text-lg font-bold">⏻</span>

      {/* Status line */}
      <span
        className={`mt-0.5 h-0.5 w-4 rounded-sm transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-transparent"
              : "bg-green-500 shadow-[0_0_6px_#22c55e]"
          }`}
      />
    </button>
  );
};