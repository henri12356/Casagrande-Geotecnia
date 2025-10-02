import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Proyectos de Ingeniería Geotécnica | Casagrande Geotecnia",
    template: "%s | Casagrande Geotecnia"
  },
  description: "Portafolio de proyectos de ingeniería geotécnica: estudios de suelos, laboratorio, geofísica y consultoría para construcción e infraestructura en Perú.",
  keywords: [
    "proyectos geotécnicos",
    "proyectos de ingeniería geotécnica",
    "proyectos geología",
    "proyectos estudios de suelos",
    "proyectos laboratorio de suelos",
    "proyectos geofísica",
    "tesis geotécnica",
    "proyectos construcción Perú",
    "ingeniería geotécnica proyectos",
    "proyectos en ayacucho",
    "consultoría geotécnica proyectos",
    "estudios de suelos realizados",
    "proyectos ingeniería civil",
    "casos de éxito geotecnia",
    "obras civiles Perú",
    "proyectos construcción",
    "infraestructura geotécnica",
    "estudios geofísicos proyectos",
    "laboratorio suelos proyectos",
    "consultoría ingeniería proyectos",
    "Casagrande Geotecnia proyectos"
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  openGraph: {
    title: "Proyectos de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Portafolio de proyectos especializados en estudios geotécnicos, laboratorio y consultoría para construcción e infraestructura.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/proyectos",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/fondoproyectos.webp",
        width: 1200,
        height: 630,
        alt: "Proyectos de Ingeniería Geotécnica - Casagrande Geotecnia",
      },
    ],
    siteName: "Casagrande Geotecnia",
    locale: "es_PE",
    emails: ["comercial@casagrandegeotecnia.com.pe"],
    phoneNumbers: ["+51 962 835 652"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Portafolio de proyectos especializados en estudios geotécnicos y consultoría para construcción.",
    images: ["https://www.casagrandegeotecnia.com.pe/fondoproyectos.webp"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/proyectos",
    languages: {
      'es-PE': 'https://www.casagrandegeotecnia.com.pe/proyectos',
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'engineering',
  classification: 'Proyectos de Ingeniería Geotécnica'
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup para página de proyectos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Proyectos de Ingeniería Geotécnica",
            "description": "Portafolio de proyectos especializados en estudios geotécnicos, laboratorio y consultoría para construcción e infraestructura",
            "url": "https://www.casagrandegeotecnia.com.pe/proyectos",
            "mainEntity": {
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
            }
          })
        }}
      />
    </>
  );
}