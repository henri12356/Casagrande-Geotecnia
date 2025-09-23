// app/servicios/[slug]/layout.tsx
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

interface ServiceLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Configuración SEO específica por servicio
const serviciosMetadata = {
  'geotecnia': {
    title: 'Servicios de Geotecnia Lima Perú | Estudio Geotécnico Profesional',
    description: 'Servicios geotécnicos especializados en Lima. Estudios de mecánica de suelos, capacidad portante y cimentaciones. ✓ 15 años de experiencia ✓ Certificados',
    keywords: 'geotecnia Lima, servicios geotécnicos Perú, estudio geotécnico, mecánica de suelos, capacidad portante, cimentaciones',
  },
  'geologia': {
    title: 'Servicios de Geología Lima | Estudios Geológicos Profesionales',
    description: 'Servicios geológicos especializados en Lima. Cartografía geológica, estudios de riesgo geológico y exploración. ✓ Geólogos certificados',
    keywords: 'geología Lima, servicios geológicos Perú, cartografía geológica, riesgo geológico, estudios geológicos',
  },
  'estudio-de-suelos': {
    title: 'Estudio de Suelos Lima | Mecánica de Suelos y Cimentaciones',
    description: 'Estudio completo de mecánica de suelos en Lima. Análisis geotécnico, SPT, capacidad portante y diseño de cimentaciones. Normas ASTM y NTP.',
    keywords: 'estudio de suelos Lima, mecánica de suelos, SPT, capacidad portante, cimentaciones, ASTM, NTP',
  },
  'laboratorio-geotecnico': {
    title: 'Laboratorio Geotécnico Lima | Ensayos de Suelos Certificados',
    description: 'Laboratorio geotécnico especializado en ensayos de suelos. Granulometría, límites Atterberg, CBR, Proctor. Certificados con validez oficial.',
    keywords: 'laboratorio geotécnico Lima, ensayos de suelos, granulometría, límites Atterberg, CBR, Proctor, INACAL',
  },
  'servicios-pavimento': {
    title: 'Servicios de Pavimento Lima | Diseño y Evaluación de Pavimentos',
    description: 'Servicios especializados en pavimentos: diseño estructural, deflectometría, evaluación PCI y rehabilitación. Experiencia en proyectos viales.',
    keywords: 'servicios pavimento Lima, diseño pavimentos, deflectometría, evaluación PCI, rehabilitación pavimentos, proyectos viales',
  }
} as const

export async function generateMetadata({ params }: ServiceLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const metadata = serviciosMetadata[slug as keyof typeof serviciosMetadata]
  
  if (!metadata) {
    return {
      title: 'Servicio no encontrado | Club de Ingenieros',
      description: 'El servicio que buscas no está disponible'
    }
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://www.clubdeingeniero.com/servicios/${slug}`,
      type: 'website',
      images: [
        {
          url: `https://www.clubdeingeniero.com/servicios/${slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      siteName: 'Club de Ingenieros',
      locale: 'es_PE',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`https://www.clubdeingeniero.com/servicios/${slug}-og.jpg`],
    },
    alternates: {
      canonical: `https://www.clubdeingeniero.com/servicios/${slug}`,
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

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-EK501511RW" />
    </>
  )
}