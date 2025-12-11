import cartoonImage1Light from "../assets/images/cartoonImage1Light.webp";
import cartoonImage1Dark from "../assets/images/cartoonImage1Dark.webp";
import cartoonImage2Light from "../assets/images/cartoonImage2Light.webp";
import cartoonImage2Dark from "../assets/images/cartoonImage2Dark.webp";

export const experienceData = [
  {
    year: "2025",
    titleKey: "sections.experience.items.0.title",
    descriptionKey: "sections.experience.items.0.description",
    images: {
      light: cartoonImage1Light,
      dark: cartoonImage1Dark,
    },
    bgClass: "card-primary"
  },
  {
    year: "2025",
    titleKey: "sections.experience.items.1.title",
    descriptionKey: "sections.experience.items.1.description",
    images: {
      light: cartoonImage2Light,
      dark: cartoonImage2Dark,
    },
    bgClass: "card-secondary"
  },
];