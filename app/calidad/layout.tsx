// app/(certificados)/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

// ⚠️ Evita la doble barra: sin "/" al final
const SITE_NAME = "Casagrande Geotecnia – Geofísica | Laboratorio de Suelos";
const BASE_URL = "https://www.casagrandegeotecnia.com.pe";
const PAGE_PATH = "/certificados-equipos";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${BASE_URL}/certificadoinacal.webp`;
const LOGO_URL = `${BASE_URL}/logocasagrande.svg`;

export const metadata: Metadata = {
  title: {
    default:
      "Certificados INACAL (Pizuar) – Calibración y Verificación de Equipos",
    template: "" + SITE_NAME,
  },
  description:
    "Calibración y verificación de equipos con trazabilidad metrológica: certificados emitidos por Pizuar, proveedor acreditado ante INACAL. Evidencia de precisión y confiabilidad de nuestros ensayos.",
  keywords: [
    "calibración de equipos",
    "verificación de equipos",
    "trazabilidad metrológica",
    "INACAL",
    "Pizuar",
    "laboratorio de suelos",
    "geotecnia",
    "geofísica",
    "ensayos de laboratorio",
    "certificados de calibración",
    "Casagrande",
    "Perú",
  ].join(", "),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      "Certificados Pizuar (INACAL) – Calibración y Verificación de Equipos",
    description:
      "Trazabilidad metrológica y evidencias de calibración/verificación de nuestros equipos. Certificados por Pizuar (INACAL).",
    type: "website",
    url: PAGE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Certificado Pizuar (INACAL) – Calibración de Equipos",
      },
    ],
    siteName: SITE_NAME,
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Certificados Pizuar (INACAL) – Calibración y Verificación de Equipos",
    description:
      "Evidencias de trazabilidad metrológica de nuestros equipos de ensayo. Certificados por Pizuar (INACAL).",
    images: [OG_IMAGE],
    site: "@CasagrandePE",
    creator: "@CasagrandePE",
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
};

export default function CertificadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // —— JSON-LD específico de esta página —— //
  // (Mantén sincronizado con tus datos reales)
  const certificados = [
    {
      "@type": "DigitalDocument",
      name: "Calibración – Prensa Triaxial / Consolidación",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-08-15",
      identifier: "CZ-TRX-2024-0815",
      url: `${BASE_URL}/certificados/certificado-triaxial-2024.pdf`,
    },
    {
      "@type": "DigitalDocument",
      name: "Verificación – Horno / Estufa de Secado (Control de Temperatura)",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-07-10",
      identifier: "VR-HORNO-2024-0710",
      url: `${BASE_URL}/certificados/certificado-horno-2024.pdf`,
    },
    {
      "@type": "DigitalDocument",
      name: "Calibración – Balanza Analítica (Exactitud y Repetibilidad)",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-06-20",
      identifier: "CL-BAL-2024-0620",
      url: `${BASE_URL}/certificados/certificado-balanza-2024.pdf`,
    },
    // Puedes añadir aquí tus “Alcance 11-LAC-004”, “LC-079”, ISO, etc.
    // Si son imágenes en lugar de PDF, igual déjalas en `url`.
  ];

  const breadcrumb = [
    { name: "Inicio", item: BASE_URL },
    { name: "Laboratorio", item: `${BASE_URL}/laboratorio` },
    { name: "Certificados de Equipos", item: PAGE_URL },
  ];

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      "Certificados Pizuar (INACAL) – Calibración y Verificación de Equipos",
    url: PAGE_URL,
    description:
      "Relación de certificados de calibración y verificación emitidos por Pizuar (INACAL) que respaldan la precisión de nuestros equipos.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
    hasPart: certificados, // cada DigitalDocument
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      "Listado de Certificados de Calibración y Verificación – Pizuar (INACAL)",
    itemListElement: certificados.map((doc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: doc,
    })),
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    email: "comercial@casagrandegeotecnia.com.pe",
    telephone: "+51 962 835 652",
    address: { "@type": "PostalAddress", addressCountry: "PE" },
    sameAs: [
      "https://www.linkedin.com/company/casagrande-geotecnia-y-concreto/",
      "https://www.facebook.com/profile.php?id=100077864046528",
      "https://www.youtube.com/@CasagrandeGeotecnia-s5m",
      "https://www.instagram.com/casagrandegeotecnia/",
      "https://www.tiktok.com/@casagrandegeotecnia",
    ],
  };

  return (
    <>
      {children}

      {/* Google Analytics (GA4) */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-EK501511RW"} />

      {/* JSON-LD: Organization (ligero) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />

      {/* JSON-LD: CollectionPage con breadcrumb + hasPart */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }}
      />

      {/* JSON-LD: ItemList explícito (opcional pero útil para listados) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
