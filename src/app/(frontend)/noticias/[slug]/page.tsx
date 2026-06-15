import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/payload'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { formatearFecha } from '@/lib/format'
import { RichText } from '@/components/RichText'
import { ShareButtons } from '@/components/ShareButtons'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function obtener(slug: string) {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'noticias',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const n = await obtener(slug)
  if (!n) return { title: 'Noticia no encontrada' }
  const img = mediaUrl(n.portada, 'card')
  return {
    title: n.titulo,
    description: n.resumen,
    openGraph: {
      title: n.titulo,
      description: n.resumen,
      type: 'article',
      images: img ? [img] : undefined,
    },
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const noticia = await obtener(slug)
  if (!noticia) notFound()

  const img = mediaUrl(noticia.portada, 'hero')

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/noticias" className="text-sm text-[var(--color-marca)] hover:underline">
        ← Volver a noticias
      </Link>
      <time className="mt-4 block text-sm font-medium uppercase tracking-wide text-[var(--color-marca)]">
        {formatearFecha(noticia.fecha)}
      </time>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{noticia.titulo}</h1>
      <p className="mt-3 text-lg text-gray-600">{noticia.resumen}</p>

      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={mediaAlt(noticia.portada) || noticia.titulo}
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      <RichText data={noticia.contenido} className="mt-6" />

      <div className="mt-10 border-t border-gray-100 pt-6">
        <ShareButtons url={`${siteUrl}/noticias/${noticia.slug}`} titulo={noticia.titulo} />
      </div>
    </article>
  )
}
