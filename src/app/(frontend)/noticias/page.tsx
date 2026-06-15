import type { Metadata } from 'next'
import Link from 'next/link'
import { getClient } from '@/lib/payload'
import { PageHeader } from '@/components/PageHeader'
import { NoticiaCard } from '@/components/cards'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Noticias' }

const PorPagina = 9

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>
}) {
  const { pagina } = await searchParams
  const paginaActual = Math.max(1, Number(pagina) || 1)

  const payload = await getClient()
  const { docs, totalPages, hasNextPage, hasPrevPage } = await payload.find({
    collection: 'noticias',
    limit: PorPagina,
    page: paginaActual,
    sort: '-fecha',
  })

  return (
    <>
      <PageHeader
        titulo="Noticias"
        descripcion="Las novedades, actividades y comunicados de la campaña."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        {docs.length === 0 ? (
          <p className="text-gray-500">Aún no hay noticias publicadas.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-4">
                {hasPrevPage && (
                  <Link
                    href={`/noticias?pagina=${paginaActual - 1}`}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-[var(--color-marca)]"
                  >
                    ← Anteriores
                  </Link>
                )}
                <span className="text-sm text-gray-500">
                  Página {paginaActual} de {totalPages}
                </span>
                {hasNextPage && (
                  <Link
                    href={`/noticias?pagina=${paginaActual + 1}`}
                    className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-[var(--color-marca)]"
                  >
                    Siguientes →
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </>
  )
}
