import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient } from '@/lib/payload'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { ShareButtons } from '@/components/ShareButtons'
import { etiquetaEje } from '@/components/cards'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function obtener(slug: string) {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'propuestas',
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
  const p = await obtener(slug)
  if (!p) return { title: 'Propuesta no encontrada' }
  return { title: p.titulo, description: p.resumen }
}

export default async function PropuestaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const propuesta = await obtener(slug)
  if (!propuesta) notFound()

  const img = mediaUrl(propuesta.imagen, 'hero')

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/propuestas" className="text-sm text-[var(--color-marca)] hover:underline">
        ← Volver a propuestas
      </Link>
      <span className="mt-4 inline-block rounded-full bg-[var(--color-marca-claro)] px-3 py-1 text-xs font-semibold text-[var(--color-marca-oscuro)]">
        {etiquetaEje(propuesta.eje)}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{propuesta.titulo}</h1>
      <p className="mt-3 text-lg text-gray-600">{propuesta.resumen}</p>

      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={mediaAlt(propuesta.imagen) || propuesta.titulo}
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      {propuesta.contenido && <RichText data={propuesta.contenido} className="mt-6" />}

      <div className="mt-10 border-t border-gray-100 pt-6">
        <ShareButtons url={`${siteUrl}/propuestas/${propuesta.slug}`} titulo={propuesta.titulo} />
      </div>
    </article>
  )
}
