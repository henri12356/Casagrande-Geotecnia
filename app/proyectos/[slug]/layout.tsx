import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import proyectos from "@/app/data/proyectos.json";

interface ProjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Definir interfaz para los proyectos
interface Proyecto {
  slug: string;
  titulo: string;
  cliente: string;
  obra: string;
  trabajo: string;
  categoria: string;
  imagen: string;
  descripcion: string;
  detalles: {
    objetivo: string;
    metodologia: string;
    resultados: string[];
  };
  numerosClave: Array<{
    numero: string;
    descripcion: string;
  }>;
  fases: Array<{
    titulo: string;
    descripcion: string;
  }>;
  galeria: string[];
  fecha?: string; // Propiedad opcional
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const proyecto = proyectos.find((p) => p.slug === slug) as Proyecto | undefined
  
  if (!proyecto) {
    return {
      title: 'Proyecto no encontrado | Casagrande Geotecnia',
      description: 'El proyecto que buscas no está disponible en nuestro portafolio'
    }
  }

  // Generar título SEO optimizado por categoría
  const getTituloSEO = (proyecto: Proyecto) => {
    const categoria = proyecto.categoria.toLowerCase()
    const baseTitle = `${proyecto.titulo} - Proyecto de ${proyecto.categoria}`
    
    if (categoria.includes('geotecnia') || categoria.includes('geotécnico')) {
      return `${proyecto.titulo} | Proyecto Geotécnico - Casagrande Geotecnia`
    }
    if (categoria.includes('laboratorio') || categoria.includes('ensayo')) {
      return `${proyecto.titulo} | Ensayos de Laboratorio - Casagrande Geotecnia`
    }
    if (categoria.includes('pavimento')) {
      return `${proyecto.titulo} | Proyecto de Pavimentos - Casagrande Geotecnia`
    }
    if (categoria.includes('suelos')) {
      return `${proyecto.titulo} | Estudio de Suelos - Casagrande Geotecnia`
    }
    if (categoria.includes('geofísica') || categoria.includes('geofisica')) {
      return `${proyecto.titulo} | Estudio Geofísico - Casagrande Geotecnia`
    }
    return baseTitle
  }

  const getDescripcionSEO = (proyecto: Proyecto) => {
    return `${proyecto.descripcion} Proyecto realizado para ${proyecto.cliente}. ${proyecto.detalles?.objetivo || 'Ingeniería especializada con resultados certificados y cumplimiento de normas técnicas.'}`
  }

  const getKeywordsSEO = (proyecto: Proyecto) => {
    const categoria = proyecto.categoria.toLowerCase()
    const baseKeywords = `${proyecto.titulo}, ${proyecto.cliente}, ${proyecto.categoria}, Casagrande Geotecnia, ingeniería geotécnica`
    
    if (categoria.includes('geotecnia')) {
      return `${baseKeywords}, geotecnia Lima, estudio geotécnico, mecánica de suelos, cimentaciones, estabilidad taludes`
    }
    if (categoria.includes('laboratorio')) {
      return `${baseKeywords}, laboratorio geotécnico, ensayos de suelos, INACAL, granulometría, límites Atterberg, CBR, Proctor`
    }
    if (categoria.includes('pavimento')) {
      return `${baseKeywords}, diseño pavimentos, evaluación estructural, deflectometría, índice PCI, rehabilitación pavimentos`
    }
    if (categoria.includes('suelos')) {
      return `${baseKeywords}, estudio de suelos, SPT, capacidad portante, normas ASTM, NTP`
    }
    if (categoria.includes('geofísica') || categoria.includes('geofisica')) {
      return `${baseKeywords}, estudios geofísicos, métodos sísmicos, tomografía eléctrica, investigación subsuelo`
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
    authors: [{ name: "Casagrande Geotecnia" }],
    openGraph: {
      title: titulo,
      description: descripcion,
      url: `https://www.casagrandegeotecnia.com.pe/proyectos/${slug}`,
      type: 'article',
      images: [
        {
          url: proyecto.imagen,
          width: 1200,
          height: 630,
          alt: titulo,
        },
      ],
      siteName: 'Casagrande Geotecnia',
      locale: 'es_PE',
      emails: ["comercial@casagrandegeotecnia.com.pe"],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
      images: [proyecto.imagen],
      site: '@CasagrandeGeo',
      creator: '@CasagrandeGeo',
    },
    alternates: {
      canonical: `https://www.casagrandegeotecnia.com.pe/proyectos/${slug}`,
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

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { slug } = await params
  const proyecto = proyectos.find((p) => p.slug === slug) as Proyecto | undefined
  
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup específico por proyecto */}
      {proyecto && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": proyecto.titulo,
              "description": proyecto.descripcion,
              "url": `https://www.casagrandegeotecnia.com.pe/proyectos/${slug}`,
              "author": {
                "@type": "EngineeringFirm",
                "name": "Casagrande Geotecnia",
                "url": "https://www.casagrandegeotecnia.com.pe",
                "email": "comercial@casagrandegeotecnia.com.pe",
                "telephone": "+51 962 835 652",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Jirón Quinua 570, Ayacucho 05003",
                  "addressLocality": "Lima",
                  "addressRegion": "Lima",
                  "addressCountry": "Perú"
                }
              },
              "datePublished": proyecto.fecha || new Date().toISOString().split('T')[0],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.casagrandegeotecnia.com.pe/proyectos/${slug}`
              },
              "workFeatured": {
                "@type": "Project",
                "name": proyecto.titulo,
                "description": proyecto.descripcion,
                "url": `https://www.casagrandegeotecnia.com.pe/proyectos/${slug}`
              }
            })
          }}
        />
      )}
    </>
  )
}