// Theme detection FIRST (before React renders)
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const theme = getInitialTheme();
document.documentElement.classList.toggle("dark", theme === "dark");

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Fallback } from "./components/Fallback";
import { ThemeProvider } from "./components/ThemeContext";
import "./index.css";
import "./core/i18n.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Fallback />}>
        <BrowserRouter> 
        <ThemeProvider>
          <App />
          </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
