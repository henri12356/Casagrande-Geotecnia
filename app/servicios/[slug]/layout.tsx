import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

interface ServiceLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Configuración SEO específica por servicio para Casagrande Geotecnia
const serviciosMetadata = {
  'geotecnia': {
    title: 'Estudios Geotécnicos | Casagrande Geotecnia',
    description: 'Servicios completos de geotecnia. Estudios de mecánica de suelos, capacidad portante, cimentaciones y estabilidad de taludes. Certificaciones ISO.',
    keywords: 'geotecnia, estudios geotécnicos, mecánica de suelos, capacidad portante, cimentaciones, estabilidad taludes, estudios geotécnicos edificios',
  },
  'geologia': {
    title: 'Servicios de Geología Aplicada | Casagrande Geotecnia',
    description: 'Geología aplicada a la construcción. Cartografía geológica, evaluación de riesgos naturales, estudios de canteras y exploración geotécnica. Especialistas certificados.',
    keywords: 'geología aplicada, cartografía geológica, riesgos naturales, exploración geotécnica, estudios canteras, geología construcción',
  },
  'estudio-de-suelos': {
    title: 'Estudio de Suelos Profesional | Casagrande Geotecnia',
    description: 'Estudios completos de mecánica de suelos. Ensayos SPT, análisis de capacidad portante, diseño de cimentaciones. Cumplimiento normas ASTM y NTP.',
    keywords: 'estudio de suelos, mecánica de suelos profesional, ensayos SPT, capacidad portante suelos, diseño cimentaciones, normas ASTM NTP',
  },
  'laboratorio-geotecnico': {
    title: 'Laboratorio Geotécnico Certificado | Casagrande Geotecnia',
    description: 'Laboratorio geotécnico con certificación ISO. Ensayos de suelos, concreto, asfalto y agregados. Granulometría, límites Atterberg, CBR, Proctor, resistencia.',
    keywords: 'laboratorio geotécnico, ensayos de suelos certificados, granulometría suelos, límites Atterberg, CBR, Proctor, ensayos concreto asfalto',
  },
  'servicios-pavimento': {
    title: 'Diseño y Evaluación de Pavimentos | Casagrande Geotecnia',
    description: 'Servicios especializados en pavimentos: diseño estructural, deflectometría, evaluación PCI, rehabilitación y control de calidad. Experiencia en proyectos viales.',
    keywords: 'diseño pavimentos, evaluación pavimentos, deflectometría, índice PCI, rehabilitación pavimentos, control calidad viales, proyectos carreteras',
  },
  'geofisica': {
    title: 'Estudios Geofísicos Aplicados | Casagrande Geotecnia',
    description: 'Geofísica aplicada a la ingeniería civil. Métodos sísmicos, eléctricos y electromagnéticos para investigación del subsuelo. Tecnología no invasiva.',
    keywords: 'estudios geofísicos, métodos sísmicos, tomografía eléctrica, geofísica aplicada, investigación subsuelo, métodos no invasivos geotecnia',
  },
  'geomecanica': {
    title: 'Geomecánica y Estabilidad de Rocas | Casagrande Geotecnia',
    description: 'Servicios de geomecánica para túneles, taludes rocosos y minería. Clasificación RMR, Q, GSI. Análisis de estabilidad y diseño de sostenimiento.',
    keywords: 'geomecánica, estabilidad taludes rocosos, túneles, clasificación RMR, sistemas sostenimiento, mecánica rocas, minería geotecnia',
  },
  'hidrogeologia': {
    title: 'Hidrogeología Aplicada a Proyectos | Casagrande Geotecnia',
    description: 'Estudios hidrogeológicos para proyectos civiles y mineros. Investigación de aguas subterráneas, permeabilidad, drenaje y control de filtraciones.',
    keywords: 'hidrogeología, estudios aguas subterráneas, permeabilidad suelos, drenaje proyectos, control filtraciones, hidrogeología construcción',
  },
  'control-calidad': {
    title: 'Control de Calidad en Construcción | Casagrande Geotecnia',
    description: 'Servicios de control de calidad para obras civiles. Supervisión de materiales, procesos constructivos y cumplimiento de especificaciones técnicas.',
    keywords: 'control de calidad construcción, supervisión obras civiles, calidad materiales construcción, especificaciones técnicas, auditoría calidad proyectos',
  },
  'materiales-construccion': {
    title: 'Laboratorio de Materiales de Construcción | Casagrande Geotecnia',
    description: 'Ensayos especializados de materiales de construcción. Análisis de concreto, acero, agregados, asfalto y otros materiales. Certificaciones INACAL.',
    keywords: 'laboratorio materiales construcción, ensayos concreto, análisis acero, agregados construcción, ensayos asfalto, certificaciones INACAL',
  },
  'estudios-especiales': {
    title: 'Estudios Especiales de Ingeniería | Casagrande Geotecnia',
    description: 'Estudios especializados: capacidad de carga, asentamientos, licuación de suelos, dinámica de suelos y análisis sísmicos. Soluciones técnicas avanzadas.',
    keywords: 'estudios especiales ingeniería, capacidad carga suelos, asentamientos, licuación suelos, dinámica suelos, análisis sísmicos, estudios especializados',
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
          url: `https://www.casagrandegeotecnia.com.pe/images/servicios/${slug}-og.jpg`,
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
      images: [`https://www.casagrandegeotecnia.com.pe/images/servicios/${slug}-fondoservicio.webp`],
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
              "telephone": "+51 123 456 789",
              "email": "info@casagrandegeotecnia.com.pe",
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