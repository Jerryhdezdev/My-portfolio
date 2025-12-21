import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeContext";
import { SectionDivider } from "../components/SectionDivider";
import FrontendLight from "../assets/images/frontendLight.webp";
import FrontendDark from "../assets/images/frontendDark.webp";
import BackendLight from "../assets/images/backendLight.webp";
import BackendDark from "../assets/images/backendDark.webp";
import ToolsLight from "../assets/images/toolsLight.webp";
import ToolsDark from "../assets/images/toolsDark.webp";
import ReactIcon from "../assets/icons/react.svg?react";
import Tailwind from "../assets/icons/tailwind.svg?react";
import JavaScript from "../assets/icons/javascript.svg?react";
import TypeScript from "../assets/icons/typescript.svg?react";
import Java from "../assets/icons/java.svg?react";
import SpringBoot from "../assets/icons/springboot.svg?react";
import API from "../assets/icons/api.svg?react";
import JPAHibernate from "../assets/icons/jpa-hibernate.svg?react";
import GIT from "../assets/icons/git.svg?react";
import Docker from "../assets/icons/docker.svg?react";
import Postman from "../assets/icons/postman.svg?react";
import Vite from "../assets/icons/vite.svg?react";

/** Base model representing a technology with its display name and icon */
interface TechItem {
  name: string; // Technology name shown in the UI
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // SVG icon as a React component
}

/** Props for a draggable animated tech card */
interface VintageCardProps extends TechItem {
  index: number; // Index used for animation staggering
  constraintsRef: React.RefObject<HTMLDivElement | null>; // Container ref that limits drag movement
}

/* Data names & icons */

const frontendTech: TechItem[] = [
  { name: "React", Icon: ReactIcon },
  { name: "Tailwind", Icon: Tailwind },
  { name: "JavaScript", Icon: JavaScript },
  { name: "TypeScript", Icon: TypeScript },
];

const backendTech: TechItem[] = [
  { name: "Java", Icon: Java },
  { name: "Spring Boot", Icon: SpringBoot },
  { name: "REST API", Icon: API },
  { name: "JPA / Hibernate", Icon: JPAHibernate },
];

const toolsTech: TechItem[] = [
  { name: "Git", Icon: GIT },
  { name: "Docker", Icon: Docker },
  { name: "Postman", Icon: Postman },
  { name: "Vite", Icon: Vite },
];

/* Components */

const VintageCard = ({
  name,
  Icon,
  index,
  constraintsRef,
}: VintageCardProps) => (
  <motion.div
    drag
    dragConstraints={constraintsRef ?? undefined}
    dragElastic={0.25}
    dragTransition={{
      bounceStiffness: 600,
      bounceDamping: 20,
    }}

    /* Floating idle animation */
    animate={{
      y: [0, -6, 0],
      rotate: [-0.6, 0.6, -0.6],
    }}
    transition={{
      duration: 4 + index * 0.3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}

    /* Interaction feedback */
whileHover={{
  scale: 1.05,
  y: -2,
  boxShadow: "8px 8px 0px rgba(0,0,0,1)",
}}
    whileTap={{
      scale: 1.08,
      cursor: "grabbing",
    }}

    className="
      w-32 h-40 md:w-36 md:h-44
      p-2
      flex flex-col
      bg-(--color-bg-tech-card-primary)
      text-black
      border-[3px] border-black
      shadow-(--retro-shadow)
      rounded-xl
      cursor-grab
      active:cursor-grabbing
      select-none
    "
  >
    {/* Icon area */}
    <div
      className="
      flex-1
      flex items-center justify-center
      border-2 border-black
      bg-(--color-bg-tech-card-secondary)
    "
    >
      <Icon className="h-12 w-12 text-black" aria-hidden="true" />
    </div>

    {/* Label */}
    <p className="mt-2 text-center text-lg font-bold tracking-widest uppercase">
      {name}
    </p>
  </motion.div>
);

/* Main Section */
export function Technologies() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="scroll-mt-20 px-6 py-16 min-h-screen flex flex-col items-center"
    >
      {/* Title */}
      <h1
        id="technologies-heading"
        tabIndex={-1}
        className="
          w-full text-center
          font-extrabold
          text-[45px] md:text-5xl lg:text-8xl
          text-(--color-text-primary)
        "
      >
        {t("sections.technologies.title", "Technologies")}
      </h1>
      {/* Title complement*/}
      <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-20 font-bold starburst-pop">
        {t("sections.technologies.titleComplement", "I’ve been working with")}
      </h2>

      {/* Frontend section */}
      <div className="w-full flex justify-center mb-5">
        <div className="flex flex-col items-start">
          <h2 className="flex items-center gap-4 text-4xl lg:text-6xl text-(--color-text-tertiary) big-outline mb-1 font-bold">
            Frontend
            <img
              src={theme === "dark" ? FrontendDark : FrontendLight}
              alt={t(
                "sections.technologies.frontendAlt",
                "Frontend technologies icon"
              )}
              className="w-26 h-31 lg:w-34 lg:h-39  scale-interactive"
            />
          </h2>

          <div
            ref={frontendRef}
            className="flex flex-wrap gap-8 tech-frontend justify-start"
          >
            {frontendTech.map((tech, index) => (
              <VintageCard
                key={tech.name}
                index={index}
                constraintsRef={frontendRef}
                {...tech}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Backend section */}
      <div className="w-full flex justify-center mb-5">
        <div className="flex flex-col items-start">
          <h2 className="flex items-center gap-4 text-4xl lg:text-6xl text-(--color-text-tertiary) big-outline mb-1 font-bold">
            Backend
            <img
              src={theme === "dark" ? BackendDark : BackendLight}
              alt={t(
                "sections.technologies.backendAlt",
                "Backend technologies icon"
              )}
              className="w-30 h-32 lg:w-38 lg:h-40  scale-interactive"
            />
          </h2>
          <div
            ref={backendRef}
            className="flex flex-wrap gap-8 tech-backend justify-start"
          >
            {backendTech.map((tech, index) => (
              <VintageCard
                key={tech.name}
                index={index}
                constraintsRef={backendRef}
                {...tech}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tools section */}
      <div className="w-full flex justify-center mb-5">
        <div className="flex flex-col items-start">
          <h2 className="flex items-center gap-4 text-4xl lg:text-6xl text-(--color-text-tertiary) big-outline mb-1 font-bold">
            {t("sections.technologies.tools", "Tools")}
            <img
              src={theme === "dark" ? ToolsDark : ToolsLight}
              alt={t(
                "sections.technologies.toolsAlt",
                "Tools technologies icon"
              )}
              className="w-26 h-30 lg:w-36 lg:h-40 ml-8 lg:ml-15 scale-interactive"
            />
          </h2>
          <div
            ref={toolsRef}
            className="flex flex-wrap gap-8 justify-start tech-tools"
          >
            {toolsTech.map((tech, index) => (
              <VintageCard
                key={tech.name}
                index={index}
                constraintsRef={toolsRef}
                {...tech}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider*/}
      <div className="w-full">
        <SectionDivider
          className="justify-start gap-10 md:gap-20"
          primaryClass="w-[500px] md:w-[600px] lg:w-[800px]"
          altClass="w-[300px] md:w-[340px] lg:w-[375px]"
        />
      </div>
    </section>
  );
}
