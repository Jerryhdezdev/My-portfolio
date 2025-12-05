import { useTranslation } from "react-i18next";
import { Tooltip } from "../components/Tooltip";
import { SectionDivider } from "../components/SectionDivider";
import { RetroButton } from "../components/RetroButton";
import profileLight from "../assets/images/profileLight.webp";
import profileDark from "../assets/images/profileDark.webp";
import profileLightMobile from "../assets/images/profileLightMobile.webp";
import profileDarkMobile from "../assets/images/profileDarkMobile.webp";
import GitHubIcon from "../assets/icons/heroGithub.svg?react";
import LinkedInIcon from "../assets/icons/heroLinkedin.svg?react";

interface HomeProps {
  theme: "light" | "dark";
}

export function Home({ theme }: HomeProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="scroll-mt-20 px-6 py-10 min-h-screen flex flex-col justify-center items-center md:items-start"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Text Block */}
        <div className="flex flex-col gap-4 text-center md:text-left order-1 md:order-1">
          <h1
            id="home-heading"
            className="text-[45px] md:text-5xl lg:text-8xl font-extrabold text-(--color-text-primary)"
          >
            {t("sections.home.introStart")}{" "}
            <span className="text-(--color-text-secondary) font-normal big-outline starburst-pop inline-block">
              Jerry Hernández
            </span>
          </h1>

          <p className="text-[22px] md:text-3xl lg:text-4xl font-medium lg:text-start mt-2 lg:mt-6 text-(--color-text-tertiary)">
            {t("sections.home.heroTagline")}
          </p>

          {/* Desktop: Button + Icons in ONE row */}
          <div className="hidden md:flex items-center justify-start gap-6 order-3 mt-6">
            {/* Button */}
            <RetroButton
              text={t("sections.home.cta")}
              className="whitespace-nowrap"
            />

            {/* GitHub Icon */}
            <Tooltip labelKey="sections.home.tooltipGitHub">
              <a
                href="https://github.com/Ghdez13"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-all duration-150 
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <GitHubIcon
                  className="
        h-14 w-14 
        rounded border-2 border-black 
        text-(--color-bg-button)
      "
                />
              </a>
            </Tooltip>

            {/* LinkedIn Icon */}
            <Tooltip labelKey="sections.home.tooltipLinkedIn">
              <a
                href="https://www.linkedin.com/in/jerry-hernandez-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-150 
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <LinkedInIcon
                  className="
        h-14 w-14
        rounded border-2 border-black 
        text-(--color-bg-button)
      "
                />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Profile image */}
        <picture className="order-2 block">
          {/* Desktop image */}
          <source
            media="(min-width: 768px)"
            srcSet={theme === "dark" ? profileDark : profileLight}
            type="image/webp"
          />

          {/* Mobile image */}
          <source
            media="(max-width: 767px)"
            srcSet={theme === "dark" ? profileDarkMobile : profileLightMobile}
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
      rubber-hose
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
            <RetroButton
              text={t("sections.home.cta")}
              className="whitespace-nowrap"
            />

            {/* GitHub Icon */}
            <Tooltip labelKey="sections.home.tooltipGitHub">
              <a
                href="https://github.com/Ghdez13"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-all duration-150 
          focus:outline-none focus-visible:ring-2 
          focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <GitHubIcon className="h-14 w-14 rounded border-2 border-black text-(--color-bg-button)" />
              </a>
            </Tooltip>

            {/* LinkedIn Icon */}
            <Tooltip labelKey="sections.home.tooltipLinkedIn">
              <a
                href="https://www.linkedin.com/in/jerry-hernandez-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-150 
          focus:outline-none focus-visible:ring-2 
          focus-visible:ring-[#d2ad4b] rounded-md
        shadow-(--retro-shadow)
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-0.5 hover:translate-y-0.5"
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
    </section>
  );
}
