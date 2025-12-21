import { useTranslation } from "react-i18next";
//import { useTheme } from "../components/ThemeContext";



export function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-6 py-16 min-h-screen flex flex-col justify-center items-center"
    >
      {/* Section title */}
      <h1
        id="contact-heading"
        tabIndex={-1}
        className="w-full text-center text-(--color-text-primary) mb-8 font-extrabold text-[45px] md:text-5xl lg:text-8xl"
      >
        {t("sections.contact.title", "Contact")}
      </h1>
    </section>
  );
}
