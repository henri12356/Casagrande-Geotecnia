import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import FloatingButtons from './floating-buttons';
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: "Casagrande Geotecnia | Consultores en Ingeniería Civil y Estudios Geotécnicos",
    template: "%s | Casagrande Geotecnia",
  },
  description: "Empresa consultora especializada en estudios geotécnicos, geología, laboratorio de suelos y control de calidad. Certificaciones ISO 9001, 14001, 37001. Servicios para construcción segura.",
  keywords: [
    "Geotecnia",
    "geología",
    "control de calidad construcción",
    "laboratorio de suelos",
    "estudios geotécnicos",
    "ingeniería civil Perú",
    "laboratorio de suelos",
    "estudios de cimentación",
    "geología aplicada",
    "control de calidad construcción",
    "estabilidad de taludes",
    "estudios geofísicos",
    "consultoría geotécnica",
    "análisis de suelos",
    "mecánica de rocas",
    "hidrogeología",
    "ensayos de concreto",
    "estudios de pavimentos",
    "certificaciones ISO",
    "Casagrande Geotecnia"
  ].join(", "),
  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://www.casagrandegeotecnia.com.pe/'),
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://www.casagrandegeotecnia.com.pe/',
    siteName: 'Casagrande Geotecnia',
    title: 'Casagrande Geotecnia | Consultores en Ingeniería Civil y estudios Geotécnicos',
    description: 'Especialistas en estudios geotécnicos, geología, laboratorio y control de calidad para construcción segura.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Casagrande Geotecnia - Consultoría en Ingeniería Civil y estudios Geotécnicos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casagrande Geotecnia | Consultores Especializados',
    description: 'Estudios geotécnicos, laboratorio de suelos y control de calidad para proyectos de construcción.',
    creator: '@CasagrandeGeo',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.casagrandegeotecnia.com.pe/',
    languages: {
      'es-PE': 'https://www.casagrandegeotecnia.com.pe/',
    },
  },
  category: 'engineering',
  classification: 'Consultoría en Ingeniería Civil y Geotecnia'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={font.variable}>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons />
        <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      </body>
    </html>
  );
}