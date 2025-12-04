import { useTranslation } from "react-i18next";
import { SectionDivider } from "../components/SectionDivider";
import aboutMeLight from "../assets/images/aboutMeLight.webp";
import aboutMeLightMobile from "../assets/images/aboutMeLightMobile.webp";
import aboutMeDark from "../assets/images/aboutMeDark.webp";
import aboutMeDarkMobile from "../assets/images/aboutMeDarkMobile.webp";

interface AboutProps {
  theme: "light" | "dark";
}

export function About({ theme }: AboutProps) {
  const { t } = useTranslation();
  const description = t("sections.about.description", {
    returnObjects: true,
  }) as string[];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-6 py-10 min-h-screen flex flex-col justify-center items-center md:items-start"
    >
      {/* Section title*/}
      <h1
        id="about-heading"
        className="w-full text-center text-(--color-text-primary) mb-10 font-extrabold text-3xl lg:text-4xl xl:text-5xl"
      >
        {t("sections.about.aboutTitle", "About Me")}
      </h1>

      {/* Content container → text + image only */}
      <div className="w-full md:grid md:grid-cols-2 md:gap-10 items-center">
        {/* Text: greeting + paragraphs */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-7xl text-start text-(--color-text-secondary) big-outline md:text-start mb-6 font-bold starburst-pop">
            {t("sections.about.greeting", "Hello...")}
          </h2>

          {description.map((paragraph, i) => (
            <p
              key={i}
              className="text-2xl text-(--color-text-tertiary) leading-relaxed max-w-xl mx-auto md:mx-0 mb-5"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Image */}
        <picture className="order-2 md:order-1 flex justify-center">
          <source
            media="(min-width: 768px)"
            srcSet={theme === "dark" ? aboutMeDark : aboutMeLight}
            type="image/webp"
          />
          <source
            media="(max-width: 767px)"
            srcSet={theme === "dark" ? aboutMeDarkMobile : aboutMeLightMobile}
            type="image/webp"
          />
          <img
            src={theme === "dark" ? aboutMeDark : aboutMeLight}
            alt={t("sections.about.profileAlt", "Jerry’s avatar")}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="rubber-hose object-contain w-full max-w-[300px] md:max-w-[400px]"
          />
        </picture>
      </div>

      {/* Divider */}
      <div className="w-full lg:-mt-5">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[300px] md:w-[340px] lg:w-[375px]"
          altClass="w-[500px] md:w-[600px] lg:w-[800px]"
        />
      </div>
    </section>
  );
}
