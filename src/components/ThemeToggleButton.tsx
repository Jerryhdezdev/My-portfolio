import React from "react";
import { useTheme } from "./ThemeContext";

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "light" ? "true" : "false"} // string used to satisfy static a11y analyzers
      className="flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300
        bg-black text-gray-300
        shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.7),0_4px_6px_rgba(0,0,0,0.8)]
        active:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.9),inset_-2px_-2px_4px_rgba(255,255,255,0.05)]
      "
    >
      {/* Power symbol */}
      <span className="text-lg font-bold">⏻</span>

      {/* Status line = ON in light mode */}
      <span
        className={`mt-0.5 h-0.5 w-4 rounded-sm transition-all duration-300
          ${
            theme === "light"
              ? "bg-green-500 shadow-[0_0_6px_#22c55e]"
              : "bg-transparent"
          }`}
      />
    </button>
  );
};
