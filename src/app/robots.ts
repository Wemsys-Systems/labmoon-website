import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login', '/academia/*/'],
    },
    sitemap: 'https://labmoon.eu/sitemap.xml',
  }
}
