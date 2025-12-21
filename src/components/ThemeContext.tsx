import { createContext, useState, useContext, useEffect} from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

// Define the shape of our context
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// ThemeProvider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  // Sync html class + localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

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