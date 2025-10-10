import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Servicios de Geotécnica | Casagrande Geotecnia",
    template: "%s | Casagrande Geotecnia"
  },
  description: "Servicios de geotecnia, geofísica, laboratorio de materiales y estudios especializados",
  keywords: [
    "servicios geotécnicos",
    "geotecnia",
    "laboratorio de materiales construcción",
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
    "geomecánica rocas",
    "hidrogeología",
    "Casagrande Geotecnia servicios"
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  openGraph: {
    title: "Servicios de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Servicios integrales en geotecnia, geofísica, laboratorio y estudios especializados para proyectos de construcción.",
    type: "website",
    url: "https://www.casagrandegeotecnia.com.pe/servicios",
    images: [
      {
        url: "https://www.casagrandegeotecnia.com.pe/fondoservicio.webp",
        width: 1200,
        height: 630,
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
    title: "Servicios de Ingeniería Geotécnica | Casagrande Geotecnia",
    description: "Especialistas en geotecnia, geofísica y laboratorio para proyectos de construcción.",
    images: ["https://www.casagrandegeotecnia.com.pe/fondoservicio.webp"],
    site: "@CasagrandeGeo",
    creator: "@CasagrandeGeo",
  },
  alternates: {
    canonical: "https://www.casagrandegeotecnia.com.pe/servicios",
    languages: {
      'es-PE': 'https://www.casagrandegeotecnia.com.pe/servicios',
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
  classification: 'Servicios de Ingeniería Geotécnica'
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup para página de servicios */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Servicios de Ingeniería Geotécnica",
            "provider": {
              "@type": "EngineeringFirm",
              "name": "Casagrande Geotecnia",
              "url": "https://www.casagrandegeotecnia.com.pe",
              "telephone": "+51 123 456 789",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Tu Dirección 123",
                "addressLocality": "Lima",
                "addressRegion": "Lima",
                "addressCountry": "Perú"
              }
            },
            "description": "Servicios especializados en estudios geotécnicos, geofísica, laboratorio de materiales y consultoría en ingeniería civil",
            "serviceType": "Geotechnical Engineering",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios de Ingeniería Geotécnica",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Estudios Geotécnicos"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Geofísica Aplicada"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Laboratorio de Materiales"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Estudios Especializados"
                  }
                }
              ]
            }
          })
        }}
      />
    </>
  );
}