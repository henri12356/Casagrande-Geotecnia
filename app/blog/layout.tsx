import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "Casagrande Geotecnia | Consultora Especializada en Ingeniería Civil",
    template: "%s | Casagrande Geotecnia",
  },
  description:
    "Consultora peruana líder en estudios geotécnicos, geológicos y control de calidad para construcción. Certificaciones ISO 9001, 37001, 14001. Servicios de laboratorio y supervisión de obras.",
  keywords: [
    "geotecnia Perú",
    "laboratorio de suelos",
    "estabilidad de taludes",
    "supervisión de obras",
    "Casagrande ingeniería",
    "estudios de cimentación",
    "análisis de suelos y rocas",
    "ingeniería civil",
    "construcción segura",
    "certificaciones ISO",
    "consultora ingeniería civil Perú",
    "estudios geotécnicos Lima",
    "laboratorio suelos y concreto",
    "control de calidad obras civiles",
    "geología aplicada construcción",
    "estudios de cimentación",
    "estabilidad de taludes",
    "supervisión técnica obras",
  ].join(", "),
  openGraph: {
    title: "Blog Técnico de Geotecnia e Ingeniería Civil | Casagrande",
    description:
      "Artículos especializados en estudios geotécnicos, control de calidad y normativas para profesionales de la construcción",
    type: "website",
    url: "https://www.casagrande.pe/blog",
    images: [
      {
        url: "https://www.casagrande.pe/og-blog-geotecnia.jpg",
        width: 1200,
        height: 630,
        alt: "Blog de geotecnia e ingeniería civil - Casagrande",
      },
    ],
    siteName: "Casagrande",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Ingeniería | Casagrande",
    description:
      "Contenido técnico especializado en geotecnia y construcción civil en Perú",
    images: ["https://www.casagrande.pe/og-blog-geotecnia.jpg"],
    site: "@CasagrandePE",
    creator: "@CasagrandePE",
  },
  alternates: {
    canonical: "https://www.casagrande.pe/blog",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "TU_GOOGLE_VERIFICATION_CODE", // ⚠️ Reemplazar con código real
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-EK501511RW" />

      {/* Schema Markup completo para Blog + SEO Local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog de Ingeniería - Casagrande Geotecnia",
            url: "https://www.casagrande.pe/blog",
            description:
              "Artículos técnicos especializados en ingeniería civil, geotecnia y construcción",
            inLanguage: "es-PE",
            publisher: {
              "@type": "Organization",
              name: "Casagrande",
              url: "https://www.casagrande.pe",
              logo: {
                "@type": "ImageObject",
                url: "https://www.casagrande.pe/logo.png",
                width: 200,
                height: 60,
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=100077864046528",
                "https://www.linkedin.com/company/casagrande",
                "https://www.instagram.com/casagrandegeotecnia/",
                "https://www.tiktok.com/@casagrandegeotecnia?lang=es-419",
                "https://www.youtube.com/@Casagrandegeotecnia",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jirón Quinua 570, Ayacucho 05003",
                addressLocality: "Ayacucho",
                addressRegion: "PE",
                postalCode: "05001",
                addressCountry: "PE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -13.1558219,
                longitude: -74.2236104,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.casagrande.pe/blog",
            },
          }),
        }}
      />
    </>
  );
}
