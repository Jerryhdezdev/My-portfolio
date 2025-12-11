import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "./Tooltip";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import GitHubIcon from "../assets/icons/github.svg?react";
import LinkedInIcon from "../assets/icons/linkedin.svg?react";

export function Footer() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const LANGUAGES = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  //Close when clicking or moving outside
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [open]);

  return (
    <footer className="w-full bg-(--color-bg-navbarAndFooter) text-(--color-text-navbar) shadow-md pt-6">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo with tooltip */}
        <div className="w-full md:w-auto flex justify-start">
          {/* Logo */}
          <Tooltip labelKey="navbar.tooltipLogo">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault(); // prevent route navigation
                document
                  .getElementById("home") // find your home section
                  ?.scrollIntoView({ block: "start", behavior: "smooth" }); // scroll to its start
              }}
              aria-label={t("aria.logo")}
              className="inline-block focus:outline-none
      focus-visible:ring-2 focus-visible:ring-[#d2ad4b]
      focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-navbarAndFooter)
      rounded-md"
            >
              <img
                src="/logo/logo.webp"
                alt="Jerry.dev logo"
                className="h-12 lg:h-15 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </Tooltip>
        </div>

        {/* Social + email Icons */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-6">
            {/* Email Image */}
            <Tooltip labelKey="footer.tooltipEmail">
              <a
                href="mailto:gerardo-hernandez03@outlook.com"
                className="hover:wiggle hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2ad4b] rounded-md"
              >
                <img
                  src="/src/assets/icons/email.webp"
                  alt="Email"
                  className="h-26 w-26 md:h-32 md:w-32"
                />
              </a>
            </Tooltip>
            {/* GitHub Icon */}
            <Tooltip labelKey="footer.tooltipGitHub">
              <a
                href="https://github.com/Ghdez13"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2ad4b] rounded-md"
              >
                <GitHubIcon className="h-12 w-12 text-(--color-text-secondary)" />
              </a>
            </Tooltip>
            {/* LinkedIn Icon */}
            <Tooltip labelKey="footer.tooltipLinkedIn">
              <a
                href="https://www.linkedin.com/in/jerry-hernandez-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2ad4b] rounded-md"
              >
                <LinkedInIcon className="h-12 w-12 text-(--color-text-secondary)" />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Language selector */}
        <div
          ref={containerRef}
          className="w-full md:w-auto flex justify-end relative"
        >
          {/* Label description */}
          <label
            htmlFor="lang"
            className="text-sm mt-2 text-(--color-text-navbar)/40 w-22 block"
          >
            {t("footer.language")}
          </label>
          <div className="flex flex-col items-left relative">
            {/* Selected language button */}
            <button
              id="lang"
              onClick={() => setOpen((prev) => !prev)}
              className="bg-transparent border border-(--color-hover-text-navbarAndFooter) text-(--color-text-navbar)
     px-3 py-1 rounded-md text-sm cursor-pointer w-30 flex justify-between items-center
     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2ad4b] relative z-20"
            >
              {LANGUAGES.find((l) => l.code === i18n.language)?.name}
              <span className="ml-2 text-(--color-text-secondary)">
                {open ? "▼" : "▲"}
              </span>
            </button>

            {/* Dropdown language selector*/}
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute bottom-full left-0 bg-(--color-bg-navbarAndFooter) text-(--color-text-navbar)
                     w-32 border border-(--color-hover-text-navbarAndFooter) rounded-md shadow overflow-hidden z-40"
                  style={{ transformOrigin: "bottom" }}
                >
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      open: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.05,
                        },
                      },
                      closed: {
                        transition: {
                          staggerChildren: 0.05,
                          staggerDirection: -1,
                        },
                      },
                    }}
                  >
                    {LANGUAGES.map((lang, index) => (
                      <motion.li
                        key={lang.code}
                        variants={{
                          open: { opacity: 1, y: 0 },
                          closed: { opacity: 0, y: 10 },
                        }}
                        transition={{ duration: 0.2 }}
                        onClick={() => {
                          //Change language
                          i18n.changeLanguage(lang.code);
                          localStorage.setItem("preferredLanguage", lang.code);
                          setOpen(false);

                          // Fire toast on selection
                          const activationMessages: Record<
                            "es" | "en" | "fr",
                            string
                          > = {
                            es: "Español activado",
                            en: "English activated",
                            fr: "Français activé",
                          };

                          toast.success(
                            activationMessages[lang.code as "es" | "en" | "fr"]
                          );
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-[#fbbd35]/10 select-none"
                      >
                        {lang.name}
                        {index < LANGUAGES.length - 1 && (
                          <div className="pt-2">
                            <hr className="border-t border-gray-300" />
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </motion.div>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer separator */}
      <div className="border-t border-(--color-text-navbar)/40 py-4">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} {t("footer.developer")} Jerry Hernández
        </p>
      </div>
    </footer>
  );
}
