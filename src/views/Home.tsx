import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import { Tooltip } from "../components/Tooltip";
import { SectionDivider } from "../components/SectionDivider";
import { RetroButton } from "../components/RetroButton";
import { motion } from "framer-motion";
import { heroVariant, titleVariant } from "../animations/retroAnimations";
import profileLight from "../assets/images/profileLight.webp";
import profileDark from "../assets/images/profileDark.webp";
import GitHubIcon from "../assets/icons/heroGithub.svg?react";
import LinkedInIcon from "../assets/icons/heroLinkedin.svg?react";

export function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  return (
    <motion.section
      id="home"
      aria-labelledby="home-heading"
      className="scroll-mt-20 px-6 py-10 min-h-screen flex flex-col justify-center items-center md:items-start"
      variants={heroVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Text Block */}
        <div className="flex flex-col gap-4 text-center md:text-left order-1 md:order-1 md:w-[55%]">
          <motion.h1
            id="home-heading"
            tabIndex={-1}
            className="text-6xl lg:text-8xl text-start font-extrabold text-(--color-text-primary)"
            variants={titleVariant}
          >
            {t("sections.home.introStart")}{" "}
            <span className="text-(--color-text-secondary) font-normal big-outline starburst-pop inline-block">
              Jerry Hernández
            </span>
          </motion.h1>
          <p className="text-[22px] md:text-3xl lg:text-4xl font-medium text-start mt-2 lg:mt-6 text-(--color-text-tertiary)">
            {t("sections.home.heroTagline")}
          </p>

          {/* Desktop: Button + Icons in ONE row */}
          <div className="hidden md:flex items-center justify-start gap-6 order-3 mt-6">
            {/* Button */}
            <RetroButton className="whitespace-nowrap">
              {t("sections.home.cta")}
            </RetroButton>

            {/* GitHub Icon */}
            <Tooltip labelKey="sections.home.tooltipGitHub">
              <a
                href="https://github.com/Jerryhdezdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="motion-press  
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)"
              >
                <GitHubIcon
                  className="
       h-13 w-13
        rounded border-2 border-black 
        text-(--color-bg-button)
      "
                />
              </a>
            </Tooltip>

            {/* LinkedIn Icon */}
            <Tooltip labelKey="sections.home.tooltipLinkedIn">
              <a
                href="https://www.linkedin.com/in/jerryhdez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="motion-press 
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)"
              >
                <LinkedInIcon
                  className="
         h-13 w-13 
        rounded border-2 border-black 
        text-(--color-bg-button)
      "
                />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Profile image */}
        <picture className="order-2  scale-interactive md:w-[40%] flex justify-center">
          {/* Desktop image */}
          <source
            media="(min-width: 768px)"
            srcSet={isDark ? profileDark : profileLight}
            type="image/webp"
          />

          {/* Mobile image */}
          <source
            media="(max-width: 767px)"
            srcSet={isDark ? profileDark : profileLight}
            type="image/webp"
          />

          {/* Fallback */}
          <img
            src={theme === "dark" ? profileDark : profileLight}
            alt={t("sections.home.profileAlt", "Jerry’s avatar")}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="
    object-contain
    w-full
    max-w-[500px]                /* mobile */
    md:max-w-[700px]            /* tablet */
    mx-auto
    "
          />
        </picture>

        {/* Mobile: Button + Icons in one row */}
        <div className="block md:hidden order-3 mt-4">
          <div className="flex items-center justify-center gap-4">
            {/* Button */}
            <RetroButton className="whitespace-nowrap">
              {t("sections.home.cta")}
            </RetroButton>

            {/* GitHub Icon */}
            <Tooltip labelKey="sections.home.tooltipGitHub">
              <a
                href="https://github.com/Jerryhdezdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="motion-press 
          focus:outline-none focus-visible:ring-2 
          focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)"
              >
                <GitHubIcon className="h-14 w-14 rounded border-2 border-black text-(--color-bg-button)" />
              </a>
            </Tooltip>

            {/* LinkedIn Icon */}
            <Tooltip labelKey="sections.home.tooltipLinkedIn">
              <a
                href="https://www.linkedin.com/in/jerryhdez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="motion-press  
          focus:outline-none focus-visible:ring-2 
          focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)"
              >
                <LinkedInIcon className="h-14 w-14 rounded border-2 border-black text-(--color-bg-button) " />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Divider at the bottom of Home section */}
      <div className="col-span-2 w-full sm:-mt-3 lg:mt-12 xl:mt-20 order-3">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[500px] md:w-[600px] lg:w-[800px]"
          altClass="w-[300px] md:w-[340px] lg:w-[375px]"
        />
      </div>
    </motion.section>
  );
}
