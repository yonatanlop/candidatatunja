import type { Metadata } from 'next'
import { getClient } from '@/lib/payload'
import { PageHeader } from '@/components/PageHeader'
import { PropuestaCard } from '@/components/cards'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Propuestas' }

export default async function PropuestasPage() {
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'propuestas', limit: 100, sort: 'orden' })

  return (
    <>
      <PageHeader
        titulo="Propuestas"
        descripcion="Las ideas y compromisos que guiarán nuestra gestión por la ciudad."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        {docs.length === 0 ? (
          <p className="text-gray-500">Pronto publicaremos nuestras propuestas.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((p) => (
              <PropuestaCard key={p.id} propuesta={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
