import type { Metadata } from 'next'
import { getClient } from '@/lib/payload'
import { PageHeader } from '@/components/PageHeader'
import { VideoEmbed } from '@/components/VideoEmbed'
import { formatearFecha, formatearFechaHora } from '@/lib/format'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Entrevistas' }

export default async function EntrevistasPage() {
  const payload = await getClient()

  const [realizadas, proximas] = await Promise.all([
    payload.find({
      collection: 'entrevistas',
      where: { estado: { equals: 'realizada' } },
      sort: '-fecha',
      limit: 100,
    }),
    payload.find({
      collection: 'entrevistas',
      where: { estado: { equals: 'proxima' } },
      sort: 'fecha',
      limit: 100,
    }),
  ])

  return (
    <>
      <PageHeader
        titulo="Entrevistas"
        descripcion="Mira las entrevistas realizadas y conoce la agenda de las próximas apariciones."
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Próximas entrevistas (agenda) */}
        {proximas.docs.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold">Próximas entrevistas</h2>
            <ul className="space-y-4">
              {proximas.docs.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <span className="rounded-full bg-[var(--color-acento)]/20 px-2 py-0.5 text-xs font-semibold text-[var(--color-marca-oscuro)]">
                      Próxima
                    </span>
                    <h3 className="mt-1 font-bold">{e.titulo}</h3>
                    <p className="text-sm text-gray-600">{e.medio}</p>
                    {e.descripcion && <p className="mt-1 text-sm text-gray-600">{e.descripcion}</p>}
                  </div>
                  <div className="text-sm sm:text-right">
                    <p className="font-medium text-[var(--color-marca)]">
                      {formatearFechaHora(e.fecha)}
                    </p>
                    {e.enlaceTransmision && (
                      <a
                        href={e.enlaceTransmision}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[var(--color-marca)] hover:underline"
                      >
                        Ver transmisión →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Entrevistas realizadas (videos) */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Entrevistas realizadas</h2>
          {realizadas.docs.length === 0 ? (
            <p className="text-gray-500">Pronto publicaremos las entrevistas realizadas.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {realizadas.docs.map((e) => (
                <article key={e.id}>
                  {e.urlVideo ? (
                    <VideoEmbed url={e.urlVideo} plataforma={e.plataforma} titulo={e.titulo} />
                  ) : (
                    <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                      Video no disponible
                    </div>
                  )}
                  <h3 className="mt-3 font-bold">{e.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    {e.medio} · {formatearFecha(e.fecha)}
                  </p>
                  {e.descripcion && <p className="mt-1 text-sm text-gray-600">{e.descripcion}</p>}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
