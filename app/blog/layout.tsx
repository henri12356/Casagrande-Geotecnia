import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog de Ingeniería Geotécnica | Casagrande Geotecnia",
    template: "%s | Casagrande Geotecnia",
  },
  description: "Artículos especializados en geotecnia, estudios de suelos, ingeniería civil y construcción. Consejos técnicos, casos de estudio y novedades del sector.",
  keywords: [
    "blog geotecnia",
    "artículos ingeniería civil",
    "estudios de suelos blog",
    "geotecnia Perú",
    "ingeniería geotécnica",
    "consejos construcción",
    "casos de estudio geotecnia",
    "novedades ingeniería civil",
    "tecnología geotécnica",
    "normas construcción",
    "laboratorio suelos blog",
    "geofísica aplicada",
    "cimentaciones blog",
    "estabilidad taludes",
    "Casagrande Geotecnia blog"
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  openGraph: {
    title: "Blog de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Artículos especializados en geotecnia, estudios de suelos y consultoría en ingeniería civil. Expertos en soluciones técnicas.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/blog",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/blog-geotecnia.jpg",
        width: 1200,
        height: 630,
        alt: "Blog de Ingeniería Geotécnica - Casagrande Geotecnia",
      },
    ],
    siteName: "Casagrande Geotecnia",
    locale: "es_PE",
    emails: ["comercial@casagrandegeotecnia.com.pe"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Artículos especializados en geotecnia, estudios de suelos y consultoría en ingeniería civil.",
    images: ["https://www.casagrandegeotecnia.com.pe/blog-geotecnia.jpg"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/blog",
    languages: {
      'es-PE': 'https://www.casagrandegeotecnia.com.pe/blog',
    },
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
  category: 'engineering',
  classification: 'Blog de Ingeniería Geotécnica y Construcción'
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />

      {/* Schema Markup completo para Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog de Ingeniería Geotécnica - Casagrande Geotecnia",
            "description": "Artículos técnicos especializados en ingeniería civil, geotecnia y construcción",
            "url": "https://www.casagrandegeotecnia.com.pe/blog",
            "inLanguage": "es-PE",
            "publisher": {
              "@type": "EngineeringFirm",
              "name": "Casagrande Geotecnia",
              "url": "https://www.casagrandegeotecnia.com.pe",
              "email": "comercial@casagrandegeotecnia.com.pe",
              "telephone": "+51 962 835 652",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jirón Quinua 570, Ayacucho 05003",
                "addressLocality": "Lima",
                "addressRegion": "Lima",
                "addressCountry": "Perú"
              },
              "sameAs": [
                "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
                "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA",
                "https://www.instagram.com/casagrandegeotecnia/",
                "https://www.youtube.com/@CasagrandeGeotecnia-s5m",
                "https://www.tiktok.com/@casagrandegeotecnia"
              ]
            
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.casagrandegeotecnia.com.pe/blog"
            }
          })
        }}
      />
    </>
  );
}