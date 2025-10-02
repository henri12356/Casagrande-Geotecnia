import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Servicios de Ingeniería Geotécnica | Casagrande Geotecnia",
    template: "%s | Casagrande Geotecnia",
  },
  description:
    "Servicios integrales de geotecnia, geofísica, laboratorio de materiales y estudios especializados en todo Perú. Certificaciones ISO 9001, 14001, 37001 para proyectos de construcción, infraestructura y minería.",
  keywords: [
    "servicios geotécnicos Perú",
    "servicios geotécnicos Ayacucho",
    "servicios geotécnicos Huamanga",
    "servicios geotécnicos huancavelica",
    "servicios geotécnicos lima",
    "servicios geotécnicos arequipa",
    "servicios geotécnicos cusco",
    "servicios geotécnicos ica",
    "servicios geotécnicos loreto",
    "geotecnia Perú",
    "laboratorio de materiales lima",
    "laboratorio de materiales huamanga",
    "laboratorio de materiales Ayacucho",
    "estudios geofísicos",
    "geología aplicada",
    "control de calidad construcción",
    "estudios de suelos",
    "consultoría ingeniería civil",
    "ensayos de materiales",
    "estabilidad de taludes",
    "cimentaciones profundas",
    "investigación geotécnica",
    "servicios pavimentos",
    "servicios de geotecnia",
    "ensayos de suelos",
    "investigación de suelos",
    "estudios geotécnicos para construcción",
    "geofísica aplicada a la ingeniería",
    "laboratorio de suelos y materiales",
    "análisis de riesgo geotécnico",
    "geomecánica rocas",
    "hidrogeología",
    "Casagrande Geotecnia servicios",
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  openGraph: {
    title: "Servicios de Ingeniería Geotécnica en Perú | Casagrande Geotecnia",
    description:
      "Servicios integrales en geotecnia, geofísica, laboratorio y estudios especializados para proyectos de construcción, infraestructura y minería en todo Perú.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/servicios",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/fondoservicio.webp",
        width: 1178.19,
        height: 663,
        alt: "Servicios de Ingeniería Geotécnica - Casagrande Geotecnia",
      },
    ],
    siteName: "Casagrande Geotecnia",
    locale: "es_PE",
    emails: ["info@casagrandegeotecnia.com.pe"],
    phoneNumbers: ["+51 123 456 789"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Ingeniería Geotécnica en Perú | Casagrande Geotecnia",
    description:
      "Especialistas en geotecnia, geofísica, laboratorio y estudios geotécnicos para proyectos de construcción, infraestructura y minería en todo Perú.",
    images: ["https://www.casagrandegeotecnia.com.pe/fondoservicio.webp"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/servicios",
    languages: {
      "es-PE": "https://www.casagrandegeotecnia.com.pe/servicios",
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
  category: "engineering",
  classification: "Servicios de Ingeniería Geotécnica",
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />

      {/* Schema Markup optimizado para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicios de Ingeniería Geotécnica",
            provider: {
              "@type": "EngineeringFirm",
              name: "Casagrande Geotecnia",
              url: "https://www.casagrandegeotecnia.com.pe",
              phone: "+51 962 835 652", // Reemplaza con tu teléfono real
              email: "comercial@casagrandegeotecnia.com.pe",
              address: {
                "@type": "PostalAddress",
                street: "Jirón Quinua 570, Ayacucho 05003", // Reemplaza con tu dirección real
                addressLocality: "Lima",
                addressRegion: "Lima",
                addressCountry: "Perú",
              },
              hasCertification: [
                "ISO 9001:2015",
                "ISO 14001:2015",
                "ISO 37001:2016",
              ],
              sameAs: [
                "https://www.facebook.com/profile.php?id=100077864046528",
                "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
                "https://www.tiktok.com/@casagrandegeotecnia",
                "https://www.instagram.com/casagrandegeotecnia/",
                "https://www.youtube.com/@CasagrandeGeotecnia-s5m",
              ],
            },
            description:
              "Servicios especializados en estudios geotécnicos, geofísica, laboratorio de materiales, pavimentos, geomecánica e hidrogeología para proyectos en todo Perú",
            serviceType: "Engineering Service",
            areaServed: "Perú",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Servicios de Ingeniería Geotécnica",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Estudios Geotécnicos",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Geofísica Aplicada",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Laboratorio de Materiales",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Estudios Especializados",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
