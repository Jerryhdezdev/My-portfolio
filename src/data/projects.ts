import animalShelterLight from "../assets/images/animalShelterLight.webp";
import animalShelterDark from "../assets/images/animalShelterDark.webp";
import portfolioLight from "../assets/images/PortfolioLight.webp";
import portfolioDark from "../assets/images/PortfolioDark.webp";
import type { Tech } from "../data/techColorMap";

export type ProjectImages = {
  light: string;
  dark: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  images: ProjectImages;
  tech: Tech[];
  repoUrl: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "sections.projects.items.0.title",
    description: "sections.projects.items.0.description",
    images: {
      light: portfolioLight,
      dark: portfolioDark,
    },
    tech: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/Ghdez13/My-portfolio"
  },
  {
    id: 2,
    title: "sections.projects.items.1.title",
    description: "sections.projects.items.1.description",
    images: {
      light: animalShelterLight,
      dark: animalShelterDark,
    },
    tech: ["React", "Tailwind", "JavaScript"],
    repoUrl: "https://github.com/Ghdez13/animal-shelter-web",
    demoUrl: "https://jauspet.vercel.app/",
  },
];