import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function SEO() {
  const { t, i18n } = useTranslation();

  const siteUrl = "https://jerryhdez.com";
  const ogImage = `${siteUrl}/logo/og-banner.webp`;

  const localeMap: Record<"en" | "es" | "fr", string> = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
  };

  const lang = i18n.language.split("-")[0] as keyof typeof localeMap;

  return (
    <Helmet>
      {/* HTML */}
      <html lang={lang} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Title & Description */}
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta name="robots" content="index, follow" />

      {/* Canonical & Languages */}
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/`} />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Jerryhdez Portfolio" />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:url" content={siteUrl} />

      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta
        property="og:locale"
        content={localeMap[lang] ?? "en_US"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("meta.title")} />
      <meta name="twitter:description" content={t("meta.description")} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data: Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Jerry Hernandez",
          alternateName: "Jerryhdez",
          url: siteUrl,
          image: ogImage,
          jobTitle: "Java Backend Developer",
          description:
            "Java Backend Developer focused on clean architecture, APIs, and scalable systems.",
          worksFor: {
            "@type": "Organization",
            name: "Jerryhdez",
          },
          knowsAbout: [
            "Java",
            "Spring Boot",
            "REST APIs",
            "Backend Development",
            "Frontend Development",
            "Full-stack Development",
          ],
          sameAs: [
            "https://www.linkedin.com/in/jerryhdez",
            "https://github.com/Jerryhdezdev",
          ],
        })}
      </script>
    </Helmet>
  );
}
