import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.add("theme-ready");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    document.documentElement.classList.add("theme-transition");

    setTheme(theme === "dark" ? "light" : "dark");

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 350);
  }

  const MENU_ITEMS = [
    { id: "home", path: "/", label: "navbar.home" },
    { id: "about", path: "/about", label: "navbar.about" },
    { id: "experience", path: "/experience", label: "navbar.experience" },
    { id: "technologies", path: "/technologies", label: "navbar.technologies" },
    { id: "project", path: "/project", label: "navbar.project" },
    { id: "contact", path: "/contact", label: "navbar.contact" },
  ] as const;

  // Language options for your switcher and names for toast messages or UI labels
  const LANGUAGES = [
    { code: "es", label: "ES", name: "Español" },
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
  ] as const;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle outside click, touch, and Escape key
  useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (!modalRef.current) return;
      if (toggleButtonRef.current?.contains(event.target as Node)) return;
      if (!modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="fixed text-(--color-text-navbar) top-0 left-0 w-full z-50 bg-(--color-bg-navbarAndFooter) shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="/"
          aria-label={t("aria.logo")}
          className="inline-block focus:outline-none
             focus-visible:ring-2 focus-visible:ring-[#d2ad4b]
             focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-navbarAndFooter)"
        >
          <img
            src="/logo/logo.webp"
            alt="Jerry.dev logo"
            className="h-8 w-auto sm:h-10 transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6" aria-label={t("aria.mainNav")}>
          {MENU_ITEMS.map(({ id, path, label }) => (
            <NavLink
              key={id}
              to={path}
              end={path === "/"}
              aria-label={t(`navbar.alt.${id}`)}
              className={({ isActive }: { isActive: boolean }) =>
                `relative text-sm lg:text-2xl transition focus:outline-none
         hover:after:w-full focus-visible:after:w-full
         after:absolute after:-bottom-1 after:left-0 after:h-1
         after:bg-(--color-hover-text-navbarAndFooter) after:w-0
         after:transition-all after:duration-300
         ${
           isActive
             ? "after:w-full text-(--color-text-navbar)"
             : "text-(--color-text-navbar)"
         }`
              }
            >
              {t(label)}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleButtonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden p-2 focus:outline-none 
             focus-visible:ring-2 focus-visible:ring-[#d2ad4b]
             focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-navbarAndFooter)
             relative w-6 h-6 z-60"
        >
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-transform duration-300 ease-in-out hover:scale-105
      ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
          />
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-opacity duration-300
      ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-transform duration-300 ease-in-out hover:scale-105
      ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
          />
        </button>

        {/* Desktop language selector */}
        <div
          className="hidden md:flex items-center gap-3"
          aria-label={t("aria.languageSwitcher")}
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={async () => {
                await i18n.changeLanguage(code);
                localStorage.setItem("preferredLanguage", code);

                const activationMessages: Record<string, string> = {
                  es: "Español activado",
                  fr: "Français activé",
                  en: "English activated",
                };

                toast.success(activationMessages[code]);
              }}
              className={`relative inline-block text-sm lg:text-2xl transition hover:after:w-full focus:outline-none focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[#d2ad4b] after:w-0 after:transition-all after:duration-300 ${
                i18n.language === code
                  ? "after:w-full text-(--color-text-navbar)"
                  : "text-(--color-text-navbar)"
              }`}
            >
              {label}
            </button>
          ))}
          {/* Theme toggle */}
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
        </div>
      </div>

      {/* Mobile menu modal */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          aria-label={t("aria.menuToggle")}
        >
          {/* Backdrop */}
          <div className="flex-1 bg-black/50" />

          {/* Drawer */}
          <div
            ref={modalRef}
            className="w-2/3 max-w-sm bg-(--color-bg-navbarAndFooter) h-full shadow-lg p-6 flex flex-col gap-6 text-lg relative"
          >
            {/* Menu mobile items */}
            {MENU_ITEMS.map(({ id, path, label }) => (
              <NavLink
                key={id}
                to={path}
                end={path === "/"}
                aria-label={t(`navbar.alt.${id}`)}
                onClick={() => setIsOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  `relative inline-block w-fit text-lg font-semibold transition
       hover:after:w-full focus:outline-none focus-visible:after:w-full
       after:absolute after:-bottom-1 after:left-0 after:h-1
       after:bg-(--color-hover-text-navbarAndFooter) after:w-0
       after:transition-all after:duration-300
       ${
         isActive
           ? "after:w-full text-(--color-text-navbar)"
           : "text-(--color-text-navbar)"
       }`
                }
              >
                {t(label)}
              </NavLink>
            ))}

            {/* Mobile language selector */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={async () => {
                    await i18n.changeLanguage(code);
                    localStorage.setItem("preferredLanguage", code);

                    const activationMessages: Record<string, string> = {
                      es: "Español activado",
                      fr: "Français activé",
                      en: "English activated",
                    };

                    toast.success(activationMessages[code]);

                    setIsOpen?.(false);
                  }}
                  className={`relative inline-block text-lg transition hover:after:w-full focus:outline-none focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[#d2ad4b] after:w-0 after:transition-all after:duration-300 ${
                    i18n.language === code
                      ? "after:w-full text-(--color-text-navbar)"
                      : "text-(--color-text-navbar)"
                  }`}
                >
                  {label}
                </button>
              ))}
              {/* Mobile theme toggle */}
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
