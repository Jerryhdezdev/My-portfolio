import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import { SectionDivider } from "../components/SectionDivider";
import { experienceData } from "../data/experienceData";

export function Experience() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 px-6 py-[5vh] min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center"
    >
      {/* Section title */}
      <h1
        id="experience-heading"
        tabIndex={-1}
        className="w-full text-center text-(--color-text-primary) mb-8 font-extrabold text-6xl lg:text-8xl"
      >
        {t("sections.experience.title", "Experience")}
      </h1>
      <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-20 font-bold starburst-pop">
        {t("sections.experience.subtitle", "Things I’ve crafted")}
      </h2>

      {/* Timeline wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Vertical center line */}
        <div className="absolute top-0 bottom-0 left-1/2 border-4 border-dashed border-(--color-text-tertiary) opacity-80 transform -translate-x-1/2 pointer-events-none"></div>

        {/* Timeline items */}
        <div className="flex flex-col gap-20">
          {experienceData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const description = t(item.descriptionKey, {
              returnObjects: true,
            }) as string[];

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Dot on the line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-(--color-text-tertiary) border-4 border-(--color-text-primary)  rounded-full z-10"></div>

                {/* Card */}
                <div
                  className={`scale-interactive relative w-full md:w-[45%] 
  p-6 pt-14 rounded-2xl 
   ${item.bgClass} 
  shadow-[10px_10px_0_var(--color-shadow-card-primary)]
  border-6 border-black
  ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                >
                  {/* Title tag */}
                  <div
                    className="absolute text-lg lg:text-2xl tracking-wider -top-4 left-4 bg-(--color-shadow-card-primary) 
      text-(--color-text-navbar) font-bold px-4 py-1 rounded-xl 
      shadow-md border-4 border-black"
                  >
                    {item.year} — {t(item.titleKey)}
                  </div>

                  {/* Overpassing image */}
                  <img
                    src={item.images[theme]}
                    alt={t("sections.experience.imageAlt")}
                    className="absolute -right-5 -top-12 w-20 h-auto lg:w-30 lg:-right-22 lg:-top-20 rubber-hose"
                    draggable="false"
                    loading="lazy"
                  />

                  {/* Text body */}
                  <div className="space-y-3">
                    {description.map((paragraph, i) => (
                      <p
                        key={i}
                        className="${item.bgClass} text-lg lg:text-2xl leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full xl:mt-15 ">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[500px] md:w-[600px] lg:w-[800px]"
          altClass="w-[300px] md:w-[340px] lg:w-[375px]"
        />
      </div>
    </section>
  );
}
