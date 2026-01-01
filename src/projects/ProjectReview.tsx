import type { Project } from "../data/projects";
import { techColorMap } from "../data/techColorMap";
import { useTranslation } from "react-i18next";
import { Tooltip } from "../components/Tooltip";

type ProjectReviewProps = {
  project: Project;
};

export const ProjectReview = ({ project }: ProjectReviewProps) => {
  const { t } = useTranslation();

  return (
    <article>
      <h2 className="text-4xl lg:text-6xl text-start text-(--color-text-secondary) big-outline md:text-start mb-6 font-bold starburst-pop">
        {t(project.title)}
      </h2>

      <p className="text-2xl text-(--color-text-tertiary) mb-4">
        {t(project.description)}
      </p>

      <ul className="flex gap-3 flex-wrap">
        {project.tech.map((tech) => {
          const bgClass = techColorMap[tech] ?? "tech-projects-primary";

          return (
            <li
              key={tech}
              className={`
                px-3 py-1
                shadow-[4px_4px_0_var(--color-shadow-card-primary)]
                ${bgClass}
                border-5 border-black
                text-lg scale-interactive
              `}
            >
              {tech}
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4 mt-6">
        <Tooltip labelKey="sections.projects.tooltipGitHub">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("sections.projects.github")}
            className="
      px-4 py-2
      border-5 border-black
      shadow-[4px_4px_0_var(--color-shadow-card-primary)]
      bg-(--color-bg-button-github)
      text-lg font-bold
      scale-interactive
    "
          >
            GitHub
          </a>
        </Tooltip>
        {project.demoUrl && (
          <Tooltip labelKey="sections.projects.tooltipLiveDemo">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("sections.projects.demo")}
              className="
        px-4 py-2
        border-5 border-black
        shadow-[4px_4px_0_var(--color-shadow-card-primary)]
        bg-(--color-bg-button-liveDemo)
        text-lg font-bold
        scale-interactive
      "
            >
              Live Demo
            </a>
          </Tooltip>
        )}
      </div>
    </article>
  );
};
