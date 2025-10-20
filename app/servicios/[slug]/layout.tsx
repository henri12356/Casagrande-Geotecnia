import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

interface ServiceLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Configuración SEO específica por servicio para Casagrande Geotecnia
const serviciosMetadata = {
  'geotecnia': {
    title: 'Estudios Geotécnicos ',
    description: 'Servicios completos de geotecnia. Estudios de mecánica de suelos, capacidad portante, cimentaciones y estabilidad de taludes. Certificaciones ISO.',
    keywords: 'geotecnia, estudios geotécnicos, mecánica de suelos, capacidad portante, cimentaciones, estabilidad taludes, estudios geotécnicos edificios',
    image: "/hero06.jpg"
  },
  'laboratorio-de-suelo': {
    title: 'Laboratorio de suelo',
    description: 'Ensayos especializados en suelos, rocas, concreto, asfalto y agua, aplicando normas nacionales e internacionales para garantizar la calidad de materiales.',
    keywords: 'laboratorio geotécnico, ensayos suelos, ensayos rocas, ensayos concreto, ensayos asfalto, control de calidad, pruebas materiales construcción',
    image: "/laboratorio-de-ensayos.png"
  },
  'geologia': {
    title: 'Servicios de Geología Aplicada ',
    description: 'Geología aplicada a la construcción. Cartografía geológica, evaluación de riesgos naturales, estudios de canteras y exploración geotécnica. Especialistas certificados.',
    keywords: 'geología aplicada, cartografía geológica, riesgos naturales, exploración geotécnica, estudios canteras, geología construcción',
    image: "/hero01.jpg"
  },
  'geofisica': {
    title: 'Estudios Geofísicos  ',
    description: 'Geofísica aplicada a la ingeniería civil. Métodos sísmicos, eléctricos y electromagnéticos para investigación del subsuelo. Tecnología no invasiva.',
    keywords: 'estudios geofísicos, métodos sísmicos, tomografía eléctrica, geofísica aplicada, investigación subsuelo, métodos no invasivos geotecnia',
    image: "/hero03.jpg"
  },
  'geomecanica': {
    title: 'Geomecánica',
    description: 'Servicios de geomecánica para túneles, taludes rocosos y minería. Clasificación RMR, Q, GSI. Análisis de estabilidad y diseño de sostenimiento.',
    keywords: 'geomecánica, estabilidad taludes rocosos, túneles, clasificación RMR, sistemas sostenimiento, mecánica rocas, minería geotecnia',
    image: "/hero04.jpg"
  },
  'hidrogeologia': {
    title: 'Estudio hidrogeologico  ',
    description: 'Estudios hidrogeológicos para proyectos civiles y mineros. Investigación de aguas subterráneas, permeabilidad, drenaje y control de filtraciones.',
    keywords: 'hidrogeología, estudios aguas subterráneas, permeabilidad suelos, drenaje proyectos, control filtraciones, hidrogeología construcción',
    image: "/hero05.jpg"
  },
  'control-de-calidad': {
    title: 'Control de Calidad',
    description: 'Servicios de control de calidad para obras civiles. Supervisión de materiales, procesos constructivos y cumplimiento de especificaciones técnicas.',
    keywords: 'control de calidad construcción, supervisión obras civiles, calidad materiales construcción, especificaciones técnicas, auditoría calidad proyectos',
    image: "/hero06.jpg"
  },
  
  'ensayo-de-campo': {
    title: 'Estudio de Campo',
    description: 'Pruebas geotécnicas y geofísicas en terreno como SPT, CPT, densidades y permeabilidad, obteniendo información directa y confiable del subsuelo',
    keywords: 'estudios especiales ingeniería, capacidad carga suelos, asentamientos, licuación suelos, dinámica suelos, análisis sísmicos, estudios especializados',
    image: "/hero08.jpg"
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