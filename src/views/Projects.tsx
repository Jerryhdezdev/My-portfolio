import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import { SectionDivider } from "../components/SectionDivider";
import { projects } from "../data/projects";
import { FilmTape } from "../projects/FilmTape";
import { Projector } from "../projects/Projector";
import { ProjectReview } from "../projects/ProjectReview";

export function Projects() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = projects[currentIndex];

  //Defensive guard (prevents runtime crashes)
  if (!currentProject) {
    return null;
  }

  const currentImage =
    theme === "dark" ? currentProject.images.dark : currentProject.images.light;

  return (
    <section
      id="projects"
      className="scroll-mt-20 px-6 py-[5vh] min-h-[60vh] md:min-h-[70vh]"
    >
      <h1 className="text-6xl lg:text-8xl font-extrabold text-(--color-text-primary) mb-10">
        {t("sections.projects.title", "Projects")}
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className="w-full lg:w-1/2">
          <ProjectReview project={currentProject} />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Projector imageSrc={currentImage} />
        </div>
      </div>

      <div className="mt-16">
        <FilmTape
          projects={projects}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />
      </div>

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
