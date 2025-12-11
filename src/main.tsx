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
