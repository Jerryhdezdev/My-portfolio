import { useState } from "react";
import { useTheme } from "../components/ThemeContext";
import { useTranslation } from "react-i18next";
import type { Project } from "../data/projects";
import FilmLight from "../assets/images/filmLight.webp";
import FilmDark from "../assets/images/filmDark.webp";

type FilmTapeProps = {
  projects: Project[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

const TOTAL_SLOTS = 6;

export function FilmTape({ projects, currentIndex, onSelect }: FilmTapeProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [paused, setPaused] = useState(false);

  // Fixed number of slots (projects + empty)
  const slots = Array.from({ length: TOTAL_SLOTS }).map((_, i) => projects[i]);

  // Duplicate for infinite loop illusion
  const loopSlots = [...slots, ...slots];

  return (
    // Main wrapper: capped width +  centered
    <div className="mx-auto max-w-[900px] relative rotate-[-0.4deg] -mt-10 md:-mt-30 lg:-mt-10 xl:-mt-20">
      <img
        src={theme === "dark" ? FilmDark : FilmLight}
        alt={t(
          "sections.projects.imageAlt",
          "Filmtape Projects icon"
        )}
        className="w-26 h-28 lg:w-42 lg:h-46 scale-interactive"
      />
      {/* Film body */}
      <div
        className="relative border-4 border-(--color-filtape) bg-(--color-filtape) py-7 overflow-hidden group px-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Top rail*/}
        <div className="absolute top-0 left-0 w-full h-[22px] border-b-2 border-(--color-filtape) top-rail" />

        {/* Moving film strip */}
<div
  className={`relative flex w-max animate-film will-change-transform ${
    paused ? "animation-paused" : "animation-running"
  }`}
>
          {loopSlots.map((project, index) => {
            const slotIndex = index % TOTAL_SLOTS;
            const isActive = project && slotIndex === currentIndex;

            return (
              <div key={index} className="flex items-stretch">
                {/* Frame */}
                <button
                  type="button"
                  disabled={!project}
                  onClick={() => project && onSelect(slotIndex)}
                  aria-label={
                    project
                      ? `View project ${project.title}`
                      : "Empty film frame"
                  }
                  className={`relative mx-4 w-28 aspect-video border-[3px] border-(--color-filtape) bg-black ${
                    project
                      ? isActive
                        ? "ring-4 ring-(--color-filmrails) shadow-[3px_3px_0_white] opacity-100"
                        : "opacity-80"
                      : "opacity-30 cursor-default"
                  }`}
                >
                  {project && (
                    <img
                      src={
                        theme === "dark"
                          ? project.images.dark
                          : project.images.light
                      }
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {!project && (
                    <div className="absolute inset-2 border-2 border-dashed border-(--color-filmrails) opacity-40" />
                  )}
                </button>

                {/* Vertical divider */}
                <div className="w-2 bg-(--color-filmrails) rounded-lg" />
              </div>
            );
          })}
        </div>

        {/* Bottom rail */}
        <div className="absolute bottom-0 left-0 w-full h-[22px] border-t-2 border-(--color-filtape) bottom-rail" />
      </div>
    </div>
  );
}
