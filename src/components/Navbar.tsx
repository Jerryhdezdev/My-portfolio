import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "./Tooltip";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement | null>(null);

  const MENU_ITEMS = [
    { id: "home", path: "#home", label: "navbar.home" },
    { id: "about", path: "#about", label: "navbar.about" },
    { id: "experience", path: "#experience", label: "navbar.experience" },
    { id: "technologies", path: "#technologies", label: "navbar.technologies" },
    { id: "projects", path: "#projects", label: "navbar.projects" },
    { id: "contact", path: "#contact", label: "navbar.contact" },
  ] as const;

  // Language options for your switcher and names for toast messages or UI labels
  const LANGUAGES = [
    { code: "es", label: "ES", name: "Español" },
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
  ] as const;

  useEffect(() => {
    document.documentElement.classList.add("theme-ready");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (!isOpen) {
        if (window.scrollY > 10) {
          headerRef.current?.classList.add("navbar-scrolled");
        } else {
          headerRef.current?.classList.remove("navbar-scrolled");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      headerRef.current?.classList.add("mobile-open");
      headerRef.current?.classList.remove("navbar-scrolled");
    } else {
      headerRef.current?.classList.remove("mobile-open");
    }
  }, [isOpen]);

  // IntersectionObserver for active section
useEffect(() => {
  const sections = MENU_ITEMS.map((item) =>
    document.getElementById(item.id)
  ).filter((el): el is HTMLElement => el !== null);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          history.replaceState(null, "", `#${entry.target.id}`);
        }
      });
    },
    {
      threshold: 0.3,              // much better for your layout
      rootMargin: "-80px 0px 0px", // matches your scroll-mt-20 approx
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle outside click, touch, tab key and Escape key
  useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (!modalRef.current) return;
      if (toggleButtonRef.current?.contains(event.target as Node)) return;
      if (!modalRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const handleFocusIn = (event: FocusEvent) => {
      if (!modalRef.current) return;
      if (
        !modalRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  const renderMenuItems = (isMobile = false) =>
    MENU_ITEMS.map(({ id, path, label }) => {
      const isActive = activeSection === id;
      return (
        <a
          key={id}
          href={path}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            setActiveSection(id);
            if (isMobile) setIsOpen(false);
          }}
          aria-label={t(`navbar.alt.${id}`)}
          className={`relative inline-block w-fit md:text-sm lg:text-xl xl:text-2xl font-Light transition
       hover:after:w-full focus:outline-none focus-visible:after:w-full
       after:absolute after:-bottom-1 after:left-0 after:h-1
       after:bg-(--color-hover-text-navbarAndFooter) after:w-0
       after:transition-all after:duration-300
            ${isActive ? "after:w-full text-(--color-text-navbar)" : "text-(--color-text-navbar)"}`}
        >
          {t(label)}
        </a>
      );
    });

  const renderLanguages = (isMobile = false) =>
    LANGUAGES.map(({ code, label }) => (
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
          if (isMobile) setIsOpen(false);
        }}
        className={`relative inline-block text-sm lg:text-2xl transition hover:after:w-full focus:outline-none focus-visible:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-[#d2ad4b] after:w-0 after:transition-all after:duration-300
          ${i18n.language === code ? "after:w-full text-(--color-text-navbar)" : "text-(--color-text-navbar)"}`}
      >
        {label}
      </button>
    ));

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-(--color-bg-navbarAndFooter) text-(--color-text-navbar) shadow-md navbar-scroll"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Tooltip labelKey="navbar.tooltipLogo">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({
                block: "start",
                behavior: "smooth",
              });
            }}
            aria-label={t("aria.logo")}
            className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2ad4b] focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-navbarAndFooter) rounded-md"
          >
            <img
              src="/logo/logo.webp"
              alt="Jerry.dev logo"
              className="h-12 lg:h-15 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </Tooltip>

        {/* Desktop menu */}
        <nav className="hidden  md:flex gap-6" aria-label={t("aria.mainNav")}>
          {renderMenuItems()}
        </nav>

        {/* Desktop languages + theme */}
        <div className="hidden md:flex items-center gap-3">
          {renderLanguages()}
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile menu toggle */}
        <div className="relative flex flex-col  items-center ">
          <button
            ref={toggleButtonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden p-2 focus:outline-none 
     focus-visible:ring-2 focus-visible:ring-[#d2ad4b]
     focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-navbarAndFooter)
     relative w-12 h-6 z-60 transition-transform duration-300 hover:scale-105"
          >
            <span
              className={`absolute left-0 top-1/2 w-12 h-0.5 bg-white transition-transform duration-300 ease-in-out hover:scale-105
      ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
            />
            <span
              className={`absolute left-0 top-1/2 w-12 h-0.5 bg-white transition-opacity duration-300
      ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-1/2 w-12 h-0.5 bg-white transition-transform duration-300 ease-in-out hover:scale-105
      ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
            />
          </button>

          {/* Dynamic label below button */}
          <span className="md:hidden mt-1 text-sm  text-white select-none relative z-70">
            {isOpen ? t("navbar.menuClose") : t("navbar.menuOpen")}
          </span>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
           {/* Backdrop */}
          <div className="flex-1 bg-black/50" />
          {/* Drawer */}
          <div
            ref={modalRef}
            className="w-2/3 max-w-sm bg-(--color-bg-navbarAndFooter) h-full shadow-lg p-6 flex flex-col gap-6 text-lg relative pt-18"
          >
            {renderMenuItems(true)}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              {renderLanguages(true)}
              <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
