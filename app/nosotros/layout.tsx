import { GoogleAnalytics } from '@next/third-parties/google'; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Nosotros | Casagrande Geotecnia",
    template: "%s | Casagrande Geotecnia"
  },
  description: "Conoce a Casagrande Geotecnia: nuestro equipo profesional, valores, misión, visión y certificados ISO 9001, 14001 y 37001 en estudios geotécnicos y control de calidad en construcción.",
  keywords: [
    "Casagrande Geotecnia",
    "equipo de ingeniería",
    "certificados ISO",
    "valores de empresa",
    "misión y visión",
    "consultoría geotécnica",
    "laboratorio de suelos",
    "control de calidad construcción",
    "estudios geotécnicos Perú",
    "ingeniería civil Lima"
  ].join(", "),
  openGraph: {
    title: "Nosotros | Casagrande Geotecnia",
    description: "Descubre a nuestro equipo profesional, certificados ISO y valores que nos hacen líderes en estudios geotécnicos y control de calidad.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/nosotros",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/fondo.webp",
        width: 1200,
        height: 630,
        alt: "Equipo y valores de Casagrande Geotecnia",
      },
    ],
    siteName: "Casagrande Geotecnia",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Casagrande Geotecnia",
    description: "Conoce nuestro equipo profesional y certificados ISO que respaldan nuestros servicios de estudios geotécnicos y control de calidad.",
    images: ["https://www.casagrandegeotecnia.com.pe/nosotros-portada.webp"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/nosotros",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TU_GOOGLE_VERIFICATION_CODE', // reemplaza con tu código
  },
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />

      {/* Schema JSON-LD para la empresa */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Casagrande Geotecnia",
            "url": "https://www.casagrandegeotecnia.com.pe",
            "logo": "https://www.casagrandegeotecnia.com.pe/logo.png",
            "sameAs": [
              "https://www.facebook.com/CasagrandeGeotecnia",
              "https://www.linkedin.com/company/casagrande-geotecnia",
              "https://twitter.com/CasagrandeGeo",
              "https://www.instagram.com/casagrande_geotecnia",
              "https://youtube.com/@CasagrandeGeotecnia"
            ],
            "foundingDate": "2010",
            "founder": "Nombre del Fundador",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Tu Dirección 123",
              "addressLocality": "Lima",
              "addressRegion": "Lima",
              "addressCountry": "Perú"
            },
            "employee": [
              {
                "@type": "Person",
                "name": "Nombre del Director",
                "jobTitle": "Director General"
              },
              {
                "@type": "Person",
                "name": "Nombre del Ingeniero Principal",
                "jobTitle": "Ingeniero Geotécnico Senior"
              }
              // agrega más miembros según tu equipo
            ],
            "hasCredential": [
              "ISO 9001:2015 - Quality Management Systems",
              "ISO 14001:2015 - Environmental Management Systems",
              "ISO 37001:2016 - Anti-bribery Management Systems"
            ],
            "memberOf": {
              "@type": "Organization",
              "name": "Colegio de Ingenieros del Perú",
              "url": "https://www.cip.org.pe"
            }
          })
        }}
      />
    </>
  );
}
