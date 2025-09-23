// app/sitemap.ts
const serviciosSlugs = [
  'geotecnia',
  'geologia', 
  'estudio-de-suelos',
  'laboratorio-geotecnico',
  'servicios-pavimento'
]
const proyectosSlugs = [
    'Aeropuerto',
]

export default function sitemap() {
  const baseUrl = 'https://casagrande-geotecnia.vercel.app/'
  
  // URLs de servicios individuales
  const servicioUrls = serviciosSlugs.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  const proyectosUrl = proyectosSlugs.map((slug) => ({
    url: `${baseUrl}/proyectos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...servicioUrls,
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
        ...proyectosUrl,
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  ]
}