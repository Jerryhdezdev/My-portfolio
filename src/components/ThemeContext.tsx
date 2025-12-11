import { createContext, useState, useContext, useEffect} from "react";
import type { ReactNode } from "react";

// Define the shape of our context
type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// ThemeProvider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  // Add class to html on mount
  useEffect(() => {
    document.documentElement.classList.add("theme-ready");
  }, []);

  // Update html attribute and localStorage whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming the context
export const useTheme = () => useContext(ThemeContext);