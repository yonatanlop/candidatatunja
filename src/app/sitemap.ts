import type { MetadataRoute } from 'next'
import { getClient } from '@/lib/payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas: MetadataRoute.Sitemap = [
    '',
    '/hoja-de-vida',
    '/propuestas',
    '/noticias',
    '/entrevistas',
    '/contacto',
  ].map((ruta) => ({ url: `${siteUrl}${ruta}`, changeFrequency: 'weekly', priority: 0.7 }))

  try {
    const payload = await getClient()
    const [noticias, propuestas] = await Promise.all([
      payload.find({ collection: 'noticias', limit: 1000, depth: 0 }),
      payload.find({ collection: 'propuestas', limit: 1000, depth: 0 }),
    ])

    const dinamicas: MetadataRoute.Sitemap = [
      ...noticias.docs.map((n) => ({
        url: `${siteUrl}/noticias/${n.slug}`,
        lastModified: n.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...propuestas.docs.map((p) => ({
        url: `${siteUrl}/propuestas/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ]

    return [...estaticas, ...dinamicas]
  } catch {
    // Si la base de datos no está disponible (p. ej. durante el build), devolvemos solo las rutas fijas.
    return estaticas
  }
}
