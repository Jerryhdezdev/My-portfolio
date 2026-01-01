export type Tech =
  | "React"
  | "Tailwind"
  | "TypeScript"
  | "JavaScript";


export const techColorMap: Record<Tech, string> = {
  React: "tech-projects-primary",
  Tailwind: "tech-projects-secondary",
  TypeScript: "tech-projects-tertiary",
  JavaScript:"tech-projects-quaternary"
};