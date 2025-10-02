import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'],
    },
    sitemap: 'https://www.casagrandegeotecnia.com.pe/sitemap.xml',
    host: 'https://www.casagrandegeotecnia.com.pe',
  }
}
