import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function SEO() {
  const { t, i18n } = useTranslation();

  const siteUrl = "#"; // Replace later with my domain
  const ogImage = `${siteUrl}/logo/og-banner.webp`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link
        rel="icon"
        type="image/x-icon"
        sizes="16x16"
        href="/favicon/favicon-16.ico"
      />
      <link
        rel="icon"
        type="image/x-icon"
        sizes="32x32"
        href="/favicon/favicon-32.ico"
      />
      <link
        rel="icon"
        type="image/x-icon"
        sizes="180x180"
        href="/favicon/favicon-180.ico"
      />
      <link
        rel="icon"
        type="image/x-icon"
        sizes="192x192"
        href="/favicon/favicon-192.ico"
      />
      <link
        rel="icon"
        type="image/x-icon"
        sizes="256x256"
        href="/favicon/favicon-256.ico"
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={i18n.language} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("meta.title")} />
      <meta name="twitter:description" content={t("meta.description")} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Replace with my domain */}
      <script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org", 
      "@type": "Person",
      "name": "Jerry",
      "url": "https://yourdomain.com",
      "image": "https://yourdomain.com/logo/og-banner.webp",
      "jobTitle": "Java Backend Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Jerry.dev"
      },
      "sameAs": [
        "https://www.linkedin.com/in/jerry-hernandez-dev",
        "https://github.com/Ghdez13"
      ]
    }
  `}
</script>

    </Helmet>
  );
}
