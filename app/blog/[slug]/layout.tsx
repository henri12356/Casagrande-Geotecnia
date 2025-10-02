import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import blogs from "@/app/data/blogs.json"; // Ruta corregida según tu estructura

interface BlogPostLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

// Interfaz basada en tu estructura JSON
interface ContenidoArticulo {
  titulo: string;
  texto: string;
  imagen: string;
  imagenAlt: string;
}

interface Autor {
  nombre: string;
  cargo: string;
  avatar: string;
}

interface ArticuloBlog {
  slug: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  fecha: string;
  imagen: string;
  extracto: string;
  autor: Autor;
  contenido: ContenidoArticulo[];
  relacionados: string[];
  tags: string[];
  esPopular: boolean;
  cta: string;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params
  
  // Buscar el artículo en tu JSON de blogs
  const articulo = (blogs as ArticuloBlog[]).find((a: ArticuloBlog) => a.slug === slug)
  
  if (!articulo) {
    return {
      title: 'Artículo no encontrado | Casagrande Geotecnia',
      description: 'El artículo que buscas no está disponible en nuestro blog.'
    }
  }

  // Generar keywords combinando tags y términos generales
  const keywords = [
    ...articulo.tags,
    "blog geotecnia",
    "Casagrande Geotecnia",
    "ingeniería civil Perú",
    "estudios de suelos"
  ].join(", ")

  return {
    title: `${articulo.titulo} | Blog Casagrande Geotecnia`,
    description: articulo.extracto,
    keywords: keywords,
    authors: [{ name: articulo.autor.nombre }],
    openGraph: {
      title: articulo.titulo,
      description: articulo.extracto,
      url: `https://www.casagrandegeotecnia.com.pe/blog/${slug}`,
      type: 'article',
      publishedTime: articulo.fecha,
      authors: [articulo.autor.nombre],
      section: articulo.categoria,
      tags: articulo.tags,
      images: [
        {
          url: `https://www.casagrandegeotecnia.com.pe${articulo.imagen}`,
          width: 1200,
          height: 630,
          alt: articulo.titulo,
        },
      ],
      siteName: 'Casagrande Geotecnia',
      locale: 'es_PE',
    },
    twitter: {
      card: 'summary_large_image',
      title: articulo.titulo,
      description: articulo.extracto,
      images: [`https://www.casagrandegeotecnia.com.pe${articulo.imagen}`],
      site: '@CasagrandeGeo',
      creator: '@CasagrandeGeo',
    },
    alternates: {
      canonical: `https://www.casagrandegeotecnia.com.pe/blog/${slug}`,
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
    other: {
      'article:published_time': articulo.fecha,
      'article:section': articulo.categoria,
      'article:tag': articulo.tags.join(', '),
    }
  }
}

export async function generateStaticParams() {
  // Mapear todos los slugs de tus artículos para generación estática
  return (blogs as ArticuloBlog[]).map((articulo: ArticuloBlog) => ({
    slug: articulo.slug,
  }))
}

export default async function BlogPostLayout({ children, params }: BlogPostLayoutProps) {
  const { slug } = await params
  const articulo = (blogs as ArticuloBlog[]).find((a: ArticuloBlog) => a.slug === slug)
  
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-HSYFNDRHDW" />
      
      {/* Schema Markup específico para artículo del blog */}
      {articulo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": articulo.titulo,
              "description": articulo.extracto,
              "datePublished": articulo.fecha,
              "dateModified": articulo.fecha,
              "author": {
                "@type": "Person",
                "name": articulo.autor.nombre,
                "jobTitle": articulo.autor.cargo,
                "image": `https://www.casagrandegeotecnia.com.pe${articulo.autor.avatar}`
              },
              "publisher": {
                "@type": "EngineeringFirm",
                "name": "Casagrande Geotecnia",
                "url": "https://www.casagrandegeotecnia.com.pe",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.casagrandegeotecnia.com.pe/logo.png",
                  "width": 200,
                  "height": 60
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.casagrandegeotecnia.com.pe/blog/${slug}`
              },
              "articleSection": articulo.categoria,
              "keywords": articulo.tags,
              "url": `https://www.casagrandegeotecnia.com.pe/blog/${slug}`,
              "image": {
                "@type": "ImageObject",
                "url": `https://www.casagrandegeotecnia.com.pe${articulo.imagen}`,
                "width": 1200,
                "height": 630
              },
              "thumbnailUrl": `https://www.casagrandegeotecnia.com.pe${articulo.imagen}`,
              "articleBody": articulo.contenido.map((seccion: ContenidoArticulo) => seccion.texto).join(' ')
            })
          }}
        />
      )}
    </>
  )
}