import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Certificados Profesionales | Club de Ingenieros",
    template: "%s | Club de Ingenieros"
  },
  description: "Certificados avalados y con validez profesional para ingenieros civiles, mecánicos, eléctricos e industriales. Mejora tu currículum con nuestras certificaciones reconocidas.",
  keywords: [
    "certificado de ingeniería",
    "certificación profesional ingenieros",
    "certificados con aval de la camara de comercio de lima",
    "aval de ingeniería",
    "certificado válido ingeniería civil",
    "documentación técnica certificada",
    "reconocimiento profesional ingenieros",
    "club de ingenieros certificados",
    "sello profesional ingeniería",
    "constancia de estudios ingeniería",
    "diploma ingeniería válido"
  ].join(", "),
  openGraph: {
    title: "Certificados Profesionales de Ingeniería ",
    description: "Obtén tu certificación con validez profesional para procesos laborales y de ascenso en el sector de ingeniería",
    type: "website",
    url: "https://www.clubdeingeniero.com/projects",
    images: [
      {
        url: "https://www.clubdeingeniero.com/certificadodelante.webp",
        width: 1200,
        height: 630,
        alt: "Certificados Profesionales Club de Ingenieros",
      },
    ],
    siteName: "Club de Ingenieros",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificados Profesionales | Club de Ingenieros",
    description: "Certificaciones válidas para ingenieros con reconocimiento en el sector industrial",
    images: ["https://www.clubdeingeniero.com/certificadodelante.webp"],
    site: "@ClubIngenieros",
    creator: "@ClubIngenieros",
  },
  alternates: {
    canonical: "https://www.clubdeingeniero.com/projects",
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
  verification: {
    google: 'TU_GOOGLE_VERIFICATION_CODE',
    yandex: 'TU_YANDEX_VERIFICATION_CODE',
  },
};

export default function CertificadosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
          <GoogleAnalytics gaId="G-EK501511RW" /> 
      
      {/* Schema Markup para la organización */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Club de Ingenieros",
            "url": "https://www.clubdeingenieros.com",
            "logo": "https://www.clubdeingenieros.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/clubdeingenieros",
              "https://www.linkedin.com/company/clubdeingenieros",
              "https://twitter.com/clubdeingenieros"
            ]
          })
        }}
      />
    </>
  );
}