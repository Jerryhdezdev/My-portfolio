import { useTranslation } from "react-i18next";
import { SectionDivider } from "../components/SectionDivider";


export function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 px-6 py-16 min-h-screen flex flex-col justify-center items-center"
    >
      {/* Section title */}
      <h1
        id="projects-heading"
        tabIndex={-1}
        className="w-full text-center text-(--color-text-primary) mb-8 font-extrabold text-[45px] md:text-5xl lg:text-8xl"
      >
        {t("sections.projects.title", "Projects")}
      </h1>

      {/* Divider */}
      <div className="w-full mt-16">
        <SectionDivider
          className="justify-start md:justify-start gap-10 md:gap-20"
          primaryClass="w-[500px] md:w-[600px] lg:w-[800px]"
          altClass="w-[300px] md:w-[340px] lg:w-[375px]"
        />
      </div>
    </section>
  );
}
