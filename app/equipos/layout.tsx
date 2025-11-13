// app/equipos/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

// —— CONSTANTES —— //
const SITE_NAME = "Casagrande Geotecnia – Geofísica | Laboratorio de Suelos";
const BASE_URL = "https://www.casagrandegeotecnia.com.pe";
const PAGE_PATH = "/equipos";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${BASE_URL}/equipos/triaxial.webp`; // 1200x630 real
const LOGO_URL = `${BASE_URL}/logocasagrande.svg`;

// —— METADATA SEO —— //
export const metadata: Metadata = {
  title: {
    default: "Equipos Geotécnicos Calibrados (INACAL) — Pizuar",
    template: "%s | " + SITE_NAME,
  },
  description:
    "Parque de equipos geotécnicos y de laboratorio de suelos (triaxial, consolidómetro, corte directo, compresión, horno de secado, Los Ángeles), con calibración/verificación por Pizuar (INACAL). Resultados precisos y trazables.",
  keywords: [
    "equipos geotécnicos",
    "laboratorio de suelos",
    "equipo triaxial",
    "consolidómetro",
    "corte directo",
    "compresión simple",
    "horno de secado",
    "Los Ángeles",
    "calibración INACAL",
    "Pizuar",
    "ensayos geotécnicos",
    "Casagrande",
    "geotecnia",
    "Perú",
  ].join(", "),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Equipos Geotécnicos Calibrados (INACAL) — Pizuar",
    description:
      "Equipos geotécnicos con trazabilidad metrológica y certificados Pizuar (INACAL) para ensayos confiables de suelos y agregados.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Equipos geotécnicos y de laboratorio de suelos" }],
    siteName: SITE_NAME,
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Equipos Geotécnicos Calibrados (INACAL) — Pizuar",
    description:
      "Triaxial, consolidómetro, corte directo, compresión, horno y Los Ángeles con certificación y verificación Pizuar (INACAL).",
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
  applicationName: SITE_NAME,
  other: {
    rating: "general",
    target: "geotecnia, laboratorio de suelos, Perú",
  },
};

export default function EquiposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ——— CERTIFICADOS (usa fechas/URLs reales) ———
  const certificados = [
    {
      "@type": "DigitalDocument",
      "@id": `${BASE_URL}/certificados#triaxial-2024-08-15`,
      name: "Calibración – Prensa Triaxial / Consolidación",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-08-15",
      identifier: "CZ-TRX-2024-0815",
      url: `${BASE_URL}/certificados/certificado-triaxial-2024.pdf`,
    },
    {
      "@type": "DigitalDocument",
      "@id": `${BASE_URL}/certificados#horno-2024-07-10`,
      name: "Verificación – Horno / Estufa de Secado (Control de Temperatura)",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-07-10",
      identifier: "VR-HORNO-2024-0710",
      url: `${BASE_URL}/certificados/certificado-horno-2024.pdf`,
    },
    {
      "@type": "DigitalDocument",
      "@id": `${BASE_URL}/certificados#balanza-2024-06-20`,
      name: "Calibración – Balanza Analítica (Exactitud y Repetibilidad)",
      issuer: { "@type": "Organization", name: "Pizuar", url: "https://pizuar.com.pe" },
      dateIssued: "2024-06-20",
      identifier: "CL-BAL-2024-0620",
      url: `${BASE_URL}/certificados/certificado-balanza-2024.pdf`,
    },
  ];

  // ——— PRODUCTOS/EQUIPOS (enlazados a certificados por @id) ———
  const equipos = [
    {
      "@type": "Product",
      name: "Equipo Triaxial",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Ensayos triaxiales UU, CU y CD para determinar resistencia al corte bajo esfuerzos y drenaje controlados.",
      image: `${BASE_URL}/equipos/triaxial.webp`,
      url: `${BASE_URL}/equipos#equipo-triaxial`,
      hasCertification: { "@id": `${BASE_URL}/certificados#triaxial-2024-08-15` },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Capacidad", value: "50 kN" },
        { "@type": "PropertyValue", name: "Normas", value: "ASTM / AASHTO / E.050" },
      ],
    },
    {
      "@type": "Product",
      name: "Horno de Secado",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Determinación de humedad y secado de muestras a temperatura controlada.",
      image: `${BASE_URL}/equipos/horno-secado.webp`,
      url: `${BASE_URL}/equipos#horno-secado`,
      hasCertification: { "@id": `${BASE_URL}/certificados#horno-2024-07-10` },
    },
    {
      "@type": "Product",
      name: "Consolidómetro",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Consolidación unidimensional para compresibilidad y velocidad de consolidación de suelos saturados.",
      image: `${BASE_URL}/equipos/consolidometro.webp`,
      url: `${BASE_URL}/equipos#consolidometro`,
    },
    {
      "@type": "Product",
      name: "Equipo de Corte Directo",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Determinación de ángulo de fricción interna y cohesión mediante esfuerzos normal y tangencial.",
      image: `${BASE_URL}/equipos/corte-directo.webp`,
      url: `${BASE_URL}/equipos#corte-directo`,
    },
    {
      "@type": "Product",
      name: "Equipo de Compresión",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Prensa para resistencia a la compresión simple en suelos cohesivos y cilindros de concreto.",
      image: `${BASE_URL}/equipos/compresion.webp`,
      url: `${BASE_URL}/equipos#equipo-compresion`,
    },
    {
      "@type": "Product",
      name: "Máquina de Abrasión Los Ángeles",
      brand: { "@type": "Brand", name: "Casagrande" },
      category: "Laboratorio de Suelos",
      description:
        "Ensayo de abrasión Los Ángeles para evaluar resistencia al desgaste de agregados.",
      image: `${BASE_URL}/equipos/los-angeles.webp`,
      url: `${BASE_URL}/equipos#los-angeles`,
    },
  ];

  const breadcrumb = [
    { name: "Inicio", item: BASE_URL },
    { name: "Laboratorio", item: `${BASE_URL}/laboratorio` },
    { name: "Equipos Geotécnicos", item: PAGE_URL },
  ];

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

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Equipos Geotécnicos Calibrados (INACAL) — Pizuar",
    url: PAGE_URL,
    description:
      "Listado de equipos geotécnicos con calibración/verificación por Pizuar (INACAL) y trazabilidad metrológica.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
    hasPart: equipos,
    about: [
      { "@type": "Thing", name: "equipos geotécnicos" },
      { "@type": "Thing", name: "laboratorio de suelos" },
      { "@type": "Thing", name: "calibración INACAL" },
      { "@type": "Thing", name: "Pizuar" },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Listado de Equipos Geotécnicos",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    itemListElement: equipos.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Los equipos están calibrados y con trazabilidad INACAL (Pinzuar)?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sí. Los equipos se calibran y/o verifican con certificados emitidos por Pizuar, laboratorio acreditado ante INACAL. Los documentos están disponibles en nuestra página de certificados.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué normas técnicas aplican a sus ensayos?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Aplicamos normas ASTM, AASHTO y la Norma Técnica E.050, garantizando resultados válidos y comparables.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo solicitar una cotización técnica?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Claro. Brindamos asesoría técnica y cotización personalizada. Contáctanos por WhatsApp o al correo comercial@casagrandegeotecnia.com.pe.",
        },
      },
    ],
  };

  return (
    <>
      {/** Contenido de la página */}
      {children}

      {/* GA4: permitido en Server Component */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-EK501511RW"} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certificados) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
