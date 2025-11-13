import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

interface ServiceLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Configuración SEO específica por servicio para Casagrande Geotecnia
const serviciosMetadata = {
  'geologia': {
    title: 'Servicios de Geología Aplicada | Estudios Geológicos  ',
    description: 'Servicios profesionales de geología aplicada en Perú. Cartografía geológica detallada, evaluación de riesgos geológicos, estudios de canteras, exploración geotécnica y mapeo geológico. Geólogos certificados con experiencia en proyectos mineros y civiles.',
    keywords: 'geología aplicada perú, cartografía geológica, mapeo geológico, evaluación riesgos naturales, estudios geológicos construcción, exploración geotécnica, estudios canteras perú, geología minera, geólogos certificados lima, investigación geológica, servicios geológicos perú, geología ingeniería civil',
    image: "/geologia/geologia05.webp"
  },
  'geotecnia': {
    title: 'Estudios Geotécnicos  | Mecánica de Suelos',
    description: 'Estudios geotécnicos completos en Perú certificados ISO 9001. Mecánica de suelos, capacidad portante, diseño de cimentaciones, estabilidad de taludes, análisis de asentamientos. Más de 15 años de experiencia en proyectos de construcción.',
    keywords: 'estudios geotécnicos perú, geotecnia lima, mecánica de suelos, estudio de suelos construcción, capacidad portante suelo, diseño cimentaciones, estabilidad taludes, estudio geotécnico edificios, análisis geotécnico, ingeniería geotécnica perú, estudios ems perú, geotecnia certificada iso',
    image: "/geotecnia/geotecnia08.webp"
  },
  'laboratorio-de-suelo': {
    title: 'Laboratorio de suelos | Ensayos de Suelos ',
    description: 'Laboratorio geotécnico acreditado en Lima, Perú. Ensayos especializados de suelos, rocas, concreto, asfalto y aguas según normas ASTM, NTP y AASHTO. Control de calidad certificado para materiales de construcción. Resultados confiables y rápidos.',
    keywords: 'laboratorio geotécnico perú, ensayos de suelos lima, laboratorio mecánica suelos, ensayos concreto, pruebas asfalto, análisis agua construcción, laboratorio certificado astm, ensayos granulometría, límites atterberg, proctor modificado, cbr suelos, laboratorio acreditado perú',
    image: "/laboratorio/laboratorio10.webp"
  },
  'geofisica': {
    title: 'Estudios Geofísicos | Prospección Geofísica',
    description: 'Estudios geofísicos avanzados para ingeniería en Perú. Sísmica de refracción, tomografía eléctrica, georradar GPR, métodos electromagnéticos. Investigación no invasiva del subsuelo para proyectos civiles y mineros. Equipos de última tecnología.',
    keywords: 'estudios geofísicos perú, geofísica aplicada ingeniería, sísmica refracción, tomografía eléctrica, georradar gpr perú, prospección geofísica, métodos geofísicos subsuelo, geofísica no invasiva, sondeos geofísicos, estudios sísmicos construcción, geofísica lima perú',
    image: "/geofisica/geofisica02.webp"
  },
  'hidrogeologia': {
    title: 'Estudios Hidrogeológicos Aguas Subterráneas',
    description: 'Estudios hidrogeológicos especializados en Perú. Exploración de acuíferos, análisis de aguas subterráneas, pruebas de permeabilidad, diseño de sistemas de drenaje, control de filtraciones. Servicios para proyectos civiles, mineros e industriales.',
    keywords: 'hidrogeología perú, estudios hidrogeológicos, aguas subterráneas perú, exploración acuíferos, permeabilidad suelos, pruebas bombeo pozos, sistemas drenaje, control filtraciones, hidrogeología minera, estudios hidrológicos construcción, napa freática, pozos agua perú',
    image: "/hidrologia/hidrologia02.webp"
  },
  'geomecanica': {
    title: 'Geomecánica de Rocas | Estabilidad de Taludes',
    description: 'Servicios especializados de geomecánica en Perú. Clasificación geomecánica RMR, Q-Barton, GSI. Análisis de estabilidad de taludes rocosos, diseño de túneles, sostenimiento de excavaciones. Expertise en minería subterránea y proyectos civiles.',
    keywords: 'geomecánica perú, mecánica de rocas, clasificación rmr, índice q barton, gsi rocas, estabilidad taludes rocosos, diseño túneles, sostenimiento excavaciones, geomecánica minera perú, análisis discontinuidades, ensayos mecánica rocas, ingeniería túneles perú',
    image: "/laboratorio/laboratorio08.webp"
  },
  'control-de-calidad': {
    title: 'Control de Calidad en Construcción | Supervisión de Obra',
    description: 'Servicios integrales de control de calidad para obras civiles en Perú. Supervisión técnica especializada, control de materiales de construcción, verificación de procesos constructivos, cumplimiento de especificaciones técnicas. Certificación ISO 9001.',
    keywords: 'control calidad construcción perú, supervisión obras civiles, control materiales construcción, inspección técnica obra, auditoría calidad proyectos, control concreto obra, ensayos campo construcción, verificación especificaciones técnicas, qaqc construcción perú, supervisor calidad certificado',
    image: "/control/control03.webp"
  },
  'ensayo-de-campo': {
    title: 'Ensayos de Campo Geotécnicos | Pruebas In Situ Perú',
    description: 'Ensayos geotécnicos de campo en Perú. Pruebas SPT, CPT, ensayos de penetración dinámica, densidad de campo, permeabilidad in situ, veleta corte, placa de carga. Equipos calibrados y personal certificado para obtener datos confiables del subsuelo.',
    keywords: 'ensayos campo geotécnicos, pruebas spt perú, cpt penetrómetro, densidad campo, permeabilidad in situ, veleta corte, placa carga, pruebas penetración suelo, ensayos geofísicos campo, dpsh ensayo, presiómetro, estudios campo construcción perú',
    image: "/campo/campo02.webp"
  },
  'mecanica-de-suelos': {
    title: 'Estudio de Mecánica de Suelos | EMS Certificado',
    description: 'Estudios completos de mecánica de suelos (EMS) en todo Perú. Investigación del subsuelo, capacidad portante, análisis de cimentaciones, potencial de licuefacción, expansividad de suelos. Informes técnicos detallados según normativa peruana y estándares internacionales.',
    keywords: 'estudio mecánica suelos perú, ems perú, estudio suelos edificación, capacidad portante terreno, licuefacción suelos, suelos expansivos, investigación subsuelo, clasificación sucs, límites consistencia, compresibilidad suelos, estudio ems lima, geotecnia edificaciones',
    image: "/mecanica/mecanica01.webp"
  },
  'evaluacion-estructural': {
    title: 'Evaluación Estructural de Edificaciones | Inspección Técnica Perú',
    description: 'Evaluaciones estructurales especializadas en Perú. Inspección técnica de edificaciones, diagnóstico patológico, evaluación sísmica, reforzamiento estructural, estudios de vulnerabilidad. Ingenieros estructurales certificados con experiencia en rehabilitación de estructuras.',
    keywords: 'evaluación estructural perú, inspección técnica edificaciones, diagnóstico estructural, evaluación sísmica edificios, reforzamiento estructural, vulnerabilidad sísmica, patología construcción, dictamen estructural, peritaje estructural perú, estudio estructuras existentes, evaluación post sismo',
    image: "/laboratorio/laboratorio10.webp"
  }
} as const

export async function generateMetadata({ params }: ServiceLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const metadata = serviciosMetadata[slug as keyof typeof serviciosMetadata]
  
  if (!metadata) {
    return {
      title: 'Servicio no encontrado | Casagrande Geotecnia',
      description: 'El servicio que buscas no está disponible en Casagrande Geotecnia'
    }
  }

  const imageUrl = `https://www.casagrandegeotecnia.com.pe${metadata.image}`

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: "Casagrande Geotecnia" }],
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://www.casagrandegeotecnia.com.pe/servicios/${slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      siteName: 'Casagrande Geotecnia',
      locale: 'es_PE',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [imageUrl],
      site: '@CasagrandeGeo',
    },
    alternates: {
      canonical: `https://www.casagrandegeotecnia.com.pe/servicios/${slug}`,
    },
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
  }
}

export async function generateStaticParams() {
  return Object.keys(serviciosMetadata).map((slug) => ({
    slug: slug,
  }))
}

export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {
  const { slug } = await params
  
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup específico por servicio */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviciosMetadata[slug as keyof typeof serviciosMetadata]?.title || "Servicio Geotécnico",
            "provider": {
              "@type": "EngineeringFirm",
              "name": "Casagrande Geotecnia",
              "url": "https://www.casagrandegeotecnia.com.pe",
              "telephone": "+51 945 513 323",
              "email": "comercial@casagrandegeotecnia.com.pe",
              "hasCertification": [
                "ISO 9001:2015",
                "ISO 14001:2015", 
                "ISO 37001:2016"
              ]
            },
            "description": serviciosMetadata[slug as keyof typeof serviciosMetadata]?.description,
            "serviceType": "Geotechnical Engineering"
          })
        }}
      />
    </>
  )
}