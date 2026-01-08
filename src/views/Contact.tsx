import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";
import { ContactForm } from "../contact/ContactForm";
import ContactImageLight from "../assets/images/contactImage1Light.webp";
import ContactImageDark from "../assets/images/contactImage1Dark.webp";

export function Contact() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const contactImage = theme === "dark" ? ContactImageDark : ContactImageLight;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-6 py-[5vh] min-h-[60vh] md:min-h-[70vh] flex flex-col items-center"
    >
      {/* Title */}
      <h1
        id="contact-heading"
        tabIndex={-1}
        className="text-center text-(--color-text-primary) mb-12 font-extrabold text-6xl lg:text-8xl"
      >
        {t("sections.contact.title", "Contact")}
      </h1>

      {/* main content*/}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column — subtitle + form */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl lg:text-6xl text-(--color-text-secondary) big-outline mb-8 font-bold starburst-pop">
            {t("sections.contact.subtitle", "Let’s work together")}
          </h2>

          <ContactForm />
        </div>

        {/* Right column — image */}
        <div className="flex justify-center items-center">
          <img
            src={contactImage}
            alt={t(
              "sections.contact.imageAlt",
              "Illustration representing contact section"
            )}
            className=" w-60 lg:w-110 scale-interactive"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
