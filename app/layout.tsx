import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google"; // ⬅️ Importamos Poppins
import FloatingButtons from "./floating-buttons";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // nombre CSS variable
  weight: ["300", "400", "500", "600", "700", "800"], // pesos comunes
});

// Datos de la empresa
const companyInfo = {
  name: "CASAGRANDE GEOTECNIA - GEOFISICA | LABORATORIO DE SUELOS",
  description:
    "Consultora líder en ingeniería civil y estudios geotécnicos en Perú. Especialistas en mecánica de suelos, laboratorio certificado, estudios de cimentación y control de calidad. Certificaciones ISO 9001, 14001 y 37001. Más de 20 años de experiencia.",
  url: "https://www.casagrandegeotecnia.com.pe",
  logo: "https://www.casagrandegeotecnia.com.pe/logocasagrande.svg",
  phone: "+51962835652",
  email: "comercial@casagrandegeotecnia.com.pe",
  address: {
    street: "Jirón Quinua 570",
    city: "Ayacucho",
    region: "Ayacucho",
    postalCode: "05003",
    country: "PE",
  },
  coordinates: {
    latitude: -13.155749,
    longitude: -74.220991,
  },
  socialMedia: {
    linkedin: "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
    facebook: "https://www.facebook.com/profile.php?id=100077864046528",
    instagram: "https://www.instagram.com/casagrandegeotecnia/",
    youtube: "https://www.youtube.com/@CasagrandeGeotecnia-s5m",
    tiktok: "https://www.tiktok.com/@casagrandegeotecnia",
  },
};

// ---------- Schema.org (JSON-LD) ----------
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${companyInfo.url}#organization`,
  name: companyInfo.name,
  alternateName: "Casagrande Geotecnia y Concreto",
  description: companyInfo.description,
  url: companyInfo.url,
  logo: {
    "@type": "ImageObject",
    url: companyInfo.logo,
    width: "512",
    height: "512",
  },
  image: [companyInfo.logo, `${companyInfo.url}/geologia/geologia04.webp`],
  telephone: companyInfo.phone,
  email: companyInfo.email,
  priceRange: "$$",
  address: [
  {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.region,
    postalCode: companyInfo.address.postalCode,
    addressCountry: companyInfo.address.country,
  },
  {
    "@type": "PostalAddress",
    streetAddress: "Av. Los Ingenieros 235",
    addressLocality: "Lima",
    addressRegion: "Lima",
    postalCode: "15024",
    addressCountry: "PE",
  }
],
  geo: {
    "@type": "GeoCoordinates",
    latitude: companyInfo.coordinates.latitude,
    longitude: companyInfo.coordinates.longitude,
  },
  sameAs: Object.values(companyInfo.socialMedia),
  areaServed: [
    { "@type": "Country", name: "Perú" },
    { "@type": "City", name: "Lima" },
    { "@type": "City", name: "Arequipa" },
    { "@type": "City", name: "Cusco" },
    { "@type": "City", name: "Ayacucho" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Geotecnia e Ingeniería Civil",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estudios Geotécnicos",
          description:
            "Estudios de mecánica de suelos, análisis geotécnico completo para proyectos de construcción, evaluación de capacidad portante y estudios de cimentación.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Laboratorio de Suelos",
          description:
            "Ensayos de laboratorio certificados: granulometría, límites de Atterberg, proctor, CBR, corte directo y más. Laboratorio certificado ISO 9001.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estudios de Cimentación",
          description:
            "Análisis de capacidad portante, diseño de fundaciones, estudios de suelos para edificios y estructuras.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Control de Calidad en Construcción",
          description:
            "Supervisión técnica, control de compactación, ensayos de concreto, verificación de especificaciones técnicas.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estudios Geofísicos",
          description:
            "Prospección geofísica, refracción sísmica, estudios de resistividad eléctrica.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Estabilidad de Taludes",
          description:
            "Análisis de estabilidad, diseño de sistemas de contención, estudios de riesgo geotécnico.",
          provider: { "@type": "Organization", name: companyInfo.name },
        },
      },
    ],
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ISO 9001:2015 - Sistemas de Gestión de Calidad",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ISO 14001:2015 - Sistemas de Gestión Ambiental",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "ISO 37001:2016 - Sistemas de Gestión Antisoborno",
    },
  ],
  // Importante: NO incluir aggregateRating si no hay reseñas visibles en la página
  foundingDate: "2005",
  knowsAbout: [
    "Geotecnia",
    "Mecánica de Suelos",
    "Ingeniería Civil",
    "Estudios Geotécnicos",
    "Laboratorio de Suelos",
    "Control de Calidad",
    "Estudios de Cimentación",
    "Estabilidad de Taludes",
    "Geofísica",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      areaServed: "PE",
      availableLanguage: ["es"],
    },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${companyInfo.url}#website`,
  url: companyInfo.url,
  name: companyInfo.name,
  potentialAction: {
    "@type": "SearchAction",
    target: `${companyInfo.url}/buscar?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Componente para inyectar JSON-LD
function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationLd, websiteLd]),
      }}
    />
  );
}

// ---------- Next.js Metadata ----------
export const metadata: Metadata = {
  title: {
    default:
      "CASAGRANDE GEOTECNIA - GEOFISICA | LABORATORIO DE SUELOS",
    template: "%s | Casagrande Geotecnia",
  },
  description: companyInfo.description,

  authors: [{ name: "Casagrande Geotecnia" }],
  creator: "Casagrande Geotecnia",
  publisher: "Casagrande Geotecnia",
  category: "Engineering Services",
  classification: "Consultoría en Ingeniería Civil y Geotecnia",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },


  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: companyInfo.url,
    siteName: companyInfo.name,
    title: "CASAGRANDE GEOTECNIA - GEOFISICA | LABORATORIO DE SUELOS",
    description:
      "Consultora especializada en estudios geotécnicos, mecánica de suelos y control de calidad en Perú. Laboratorio certificado ISO 9001. Más de 20 años de experiencia.",
    images: [
      {
        url: `${companyInfo.url}/geologia/geologia04.webp`,
        width: 1200,
        height: 630,
        alt: "CASAGRANDE GEOTECNIA - GEOFISICA | LABORATORIO DE SUELOS",
        type: "image/png", // coherente con .png
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CASAGRANDE GEOTECNIA - GEOFISICA | LABORATORIO DE SUELOS",
    description:
      "Especialistas en estudios geotécnicos, laboratorio de suelos certificado y control de calidad en construcción. ISO 9001, 14001, 37001.",
    images: [`${companyInfo.url}/geologia/geologia04.webp`],
    creator: "@CasagrandeGeo",
    site: "@CasagrandeGeo",
  },

  alternates: {
    canonical: companyInfo.url,
    languages: {
      "es-PE": companyInfo.url,
      "x-default": companyInfo.url,
    },
  },

  metadataBase: new URL(companyInfo.url),

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Casagrande Geotecnia",
  },

  other: {
    "msapplication-TileColor": "#2d89ef",
    "theme-color": "#ffffff",
  },
};

// Viewport recomendado para móviles
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={font.variable}>
      <head>
        <StructuredData />
        {/* Preconnects para performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons />
        {/* Mantén GA4 aquí: */}
        <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      </body>
    </html>
  );
}
