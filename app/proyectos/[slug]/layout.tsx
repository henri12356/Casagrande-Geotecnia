/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import proyectos from "@/app/data/proyectos.json";

interface ProjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const proyecto = proyectos.find((p) => p.slug === slug)
  
  if (!proyecto) {
    return {
      title: 'Proyecto no encontrado | Club de Ingenieros',
      description: 'El proyecto que buscas no está disponible'
    }
  }

  // Generar título SEO optimizado por categoría
  const getTituloSEO = (proyecto: any) => {
    const categoria = proyecto.categoria.toLowerCase()
    const baseTitle = `${proyecto.titulo} - Proyecto de ${proyecto.categoria}`
    
    if (categoria.includes('geotecnia') || categoria.includes('geotécnico')) {
      return `${proyecto.titulo} | Proyecto Geotécnico Lima - ${proyecto.cliente}`
    }
    if (categoria.includes('laboratorio') || categoria.includes('ensayo')) {
      return `${proyecto.titulo} | Ensayos de Laboratorio - ${proyecto.cliente}`
    }
    if (categoria.includes('pavimento')) {
      return `${proyecto.titulo} | Proyecto de Pavimentos - ${proyecto.cliente}`
    }
    if (categoria.includes('suelos')) {
      return `${proyecto.titulo} | Estudio de Suelos - ${proyecto.cliente}`
    }
    return baseTitle
  }

  const getDescripcionSEO = (proyecto: any) => {
    return `${proyecto.descripcion} Proyecto realizado para ${proyecto.cliente}. ${proyecto.detalles?.objetivo || 'Ingeniería especializada con resultados certificados.'}`
  }

  const getKeywordsSEO = (proyecto: any) => {
    const categoria = proyecto.categoria.toLowerCase()
    const baseKeywords = `${proyecto.titulo}, ${proyecto.cliente}, ${proyecto.categoria}, ingeniería`
    
    if (categoria.includes('geotecnia')) {
      return `${baseKeywords}, geotecnia Lima, estudio geotécnico, mecánica de suelos`
    }
    if (categoria.includes('laboratorio')) {
      return `${baseKeywords}, laboratorio geotécnico, ensayos de suelos, INACAL`
    }
    if (categoria.includes('pavimento')) {
      return `${baseKeywords}, diseño pavimentos, evaluación estructural, deflectometría`
    }
    if (categoria.includes('suelos')) {
      return `${baseKeywords}, estudio de suelos, SPT, capacidad portante`
    }
    return baseKeywords
  }

  const titulo = getTituloSEO(proyecto)
  const descripcion = getDescripcionSEO(proyecto)
  const keywords = getKeywordsSEO(proyecto)

  return {
    title: titulo,
    description: descripcion,
    keywords: keywords,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: `https://www.clubdeingeniero.com/projects/${slug}`,
      type: 'article',
      images: [
        {
          url: proyecto.imagen,
          width: 1200,
          height: 630,
          alt: titulo,
        },
      ],
      siteName: 'Club de Ingenieros',
      locale: 'es_PE',
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
      images: [proyecto.imagen],
      site: '@ClubIngenieros',
      creator: '@ClubIngenieros',
    },
    alternates: {
      canonical: `https://www.clubdeingeniero.com/projects/${slug}`,
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
  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }))
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-EK501511RW" />
    </>
  )
}