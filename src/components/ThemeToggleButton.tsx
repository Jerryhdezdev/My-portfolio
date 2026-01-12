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
      <span className="w-5 h-5 text-gray-300">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2h2v10h-2z" />
          <path d="M12 22c5.52 0 10-4.48 10-10 0-4.84-3.44-8.87-8-9.8v2.06c3.39.9 6 4 6 7.74 0 4.41-3.59 8-8 8s-8-3.59-8-8c0-3.74 2.61-6.84 6-7.74V2.2C5.44 3.13 2 7.16 2 12c0 5.52 4.48 10 10 10z" />
        </svg>
      </span>

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
