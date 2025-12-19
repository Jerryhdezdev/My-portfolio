import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionDivider } from "../components/SectionDivider";
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

/** Theme-related props used to switch between light and dark mode */
interface ExperienceProps {
  theme: "light" | "dark";
}

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

/* COMPONENTS */

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
    transition={{
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      },
      rotate: {
        type: "spring",
        stiffness: 180,
        damping: 18,
      },
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
export function Technologies({ theme }: ExperienceProps) {
  const { t } = useTranslation();
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
          w-full text-center mb-16
          font-extrabold
          text-[45px] md:text-5xl lg:text-8xl
          text-(--color-text-primary)
        "
      >
        {t("sections.technologies.title", "Technologies")}
      </h1>

      {/* Frontend section*/}
      <div className="w-full flex flex-col items-start mb-5">
        <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-10 font-bold starburst-pop">
          {t("sections.technologies.frontend", "Frontend")}
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

      {/* Backend section*/}
      <div className="w-full flex justify-end mb-5">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-10 font-bold starburst-pop">
            {t("sections.technologies.backend", "Backend")}
          </h2>

          <div
            ref={backendRef}
            className="flex flex-wrap gap-8 justify-end tech-backend"
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
      <div className="w-full flex flex-col items-start">
        <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-10 font-bold starburst-pop">
          {t("sections.technologies.tools", "Tools")}
        </h2>

        <div
          ref={toolsRef}
          className="flex flex-wrap gap-8 justify-start tech-tools mb-15"
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
