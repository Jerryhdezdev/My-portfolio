// Retro-inspired animations with a subtle cartoon feel
import type { Variants } from "framer-motion";

export const sectionVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotate: -1.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.8,
    },
  },
};

export const titleVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    scale: [1.05, 1],
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const heroVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const timelineItemVariant: Variants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -80 : 80,
    rotate: isLeft ? -2 : 2,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
};
/* Section wrapper */
export const techSectionVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

/* Titles */
export const techTitleVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

/* Category blocks (Frontend / Backend / Tools) */
export const techGroupVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};
/* Projects section wrapper */
export const projectsSectionVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

/* Title */
export const projectsTitleVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

/* Left panel (review) */
export const projectLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

/* Right panel (projector) */
export const projectRightVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

/* Film tape */
export const projectTapeVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
/* Contact section wrapper */
export const contactSectionVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

/* Contact title */
export const contactTitleVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

/* Left column (text + form) */
export const contactLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

/* Right image */
export const contactImageVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    rotate: 2,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
