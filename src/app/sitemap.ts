import { MetadataRoute } from 'next'

const locales = ['es', 'en'] as const;
const baseUrl = 'https://labmoon.eu';

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1 },
  { path: 'servicios', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'servicios/asesoria-legal', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'servicios/rastreo-criptomonedas', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'servicios/analisis-forense', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'servicios/informes-periciales', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'servicios/compliance', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'academia', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: 'sobre-nosotros', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: 'blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'noticias', changeFrequency: 'weekly' as const, priority: 0.7 },
  { path: 'eventos', changeFrequency: 'weekly' as const, priority: 0.7 },
  { path: 'contacto', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: 'politicas-de-privacidad', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: 'politicas-de-cookies', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: 'condiciones-generales-de-uso', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: 'politica-de-ejercicio-de-derechos', changeFrequency: 'yearly' as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority: locale === 'es' ? priority : priority - 0.1,
      alternates: {
        languages: {
          es: `${baseUrl}/es/${path}`,
          en: `${baseUrl}/en/${path}`,
        },
      },
    }))
  );
}
