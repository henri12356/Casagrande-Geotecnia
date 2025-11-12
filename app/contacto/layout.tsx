import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Contacto | Laboratorio de Suelos",
    template: "",
  },
  description:
    "Casagrande Geotecnia es una empresa peruana especializada en estudios geotécnicos, geológicos, geofísicos y laboratorio de suelos. Contáctanos para cotizar ensayos, estudios de mecánica de suelos, control de calidad de materiales y supervisión de obras en todo el Perú.",
  keywords: [
    "Casagrande Geotecnia",
    "contacto Casagrande",
    "laboratorio de suelos en Perú",
    "ensayos geotécnicos INACAL",
    "geotecnia y geofísica",
    "estudios de mecánica de suelos",
    "control de calidad de materiales",
    "laboratorio acreditado INACAL",
    "ISO 9001 geotecnia",
    "ISO 14001 construcción",
    "ISO 37001 empresa antisoborno",
    "consultoría en ingeniería civil",
    "servicios geotécnicos integrales",
    "estudios técnicos para obras",
    "empresa geotécnica en Lima y Ayacucho",
  ].join(", "),
  openGraph: {
    title: "Contacto | Casagrande Geotecnia – Geofísica | Laboratorio de Suelos",
    description:
      "Solicita una cotización o agenda una reunión con Casagrande Geotecnia. Estudios geotécnicos, geofísicos, laboratorio de suelos y control de calidad para proyectos de infraestructura, edificación y obras públicas en todo el Perú.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com/contacto",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com/hero02.webp", // Ajusta la ruta según tu proyecto
        width: 1200,
        height: 630,
        alt: "Casagrande Geotecnia – Geofísica y Laboratorio de Suelos en Perú",
      },
    ],
    siteName: "Casagrande Geotecnia – Geofísica | Laboratorio de Suelos",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Casagrande Geotecnia – Geofísica | Laboratorio de Suelos",
    description:
      "Empresa peruana especializada en geotecnia, geofísica, laboratorio de suelos y control de calidad de materiales. Escríbenos para coordinar tu próximo proyecto.",
    images: ["https://www.casagrandegeotecnia.com/hero02.webp"],
    site: "@CasagrandeGeotecnia", // reemplaza si tienes usuario real
    creator: "@CasagrandeGeotecnia",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com/contacto",
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
    google: "TU_GOOGLE_VERIFICATION_CODE",
    yandex: "TU_YANDEX_VERIFICATION_CODE",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Reemplaza con tu GA real */}
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />

      {/* Schema Markup para la organización Casagrande Geotecnia */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Casagrande Geotecnia – Geofísica | Laboratorio de Suelos",
            url: "https://www.casagrandegeotecnia.com",
            logo: "https://www.casagrandegeotecnia.com/logocasagrande.svg",
            description:
              "Empresa peruana de ingeniería y construcción especializada en estudios geotécnicos, geofísicos, geológicos y laboratorio de suelos. Más de 6 años de experiencia, más de 130 ensayos y equipos calibrados por proveedores acreditados por INACAL como PIZUAR.",
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "Av. Los Ingenieros 235",
                addressLocality: "Lima",
                addressRegion: "Lima",
                addressCountry: "PE",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "Jr. Quinua 570",
                addressLocality: "Ayacucho",
                addressRegion: "Ayacucho",
                addressCountry: "PE",
              },
            ],
            sameAs: [
              "https://www.facebook.com/casagrandegeotecnia",
              "https://www.linkedin.com/company/casagrande-geotecnia",
              // Agrega más redes cuando las tengas
            ],
            foundingDate: "2020-12-01",
            slogan:
              "Estudios geotécnicos, geofísicos y laboratorio de suelos con equipos calibrados por INACAL.",
            knowsAbout: [
              "Geotecnia",
              "Geofísica",
              "Laboratorio de suelos",
              "Geología",
              "Hidrología",
              "Control de calidad de materiales",
              "Ensayos geotécnicos",
              "Supervisión de obras civiles",
            ],
            // Certificaciones ISO y acreditaciones
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                name: "ISO 9001 – Sistema de Gestión de Calidad",
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "ISO 14001 – Sistema de Gestión Ambiental",
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "ISO 37001 – Sistema de Gestión Antisoborno",
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "Métodos de ensayo acreditados ante INACAL",
              },
            ],
          }),
        }}
      />
    </>
  );
}
