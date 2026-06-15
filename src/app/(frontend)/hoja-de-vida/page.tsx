import type { Metadata } from 'next'
import { getClient } from '@/lib/payload'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { PageHeader } from '@/components/PageHeader'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Hoja de vida' }

export default async function HojaDeVidaPage() {
  const payload = await getClient()
  const hoja = await payload.findGlobal({ slug: 'hoja-de-vida' })
  const foto = mediaUrl(hoja?.foto)

  return (
    <>
      <PageHeader titulo="Hoja de vida" descripcion={hoja?.cargoAspirado ?? undefined} />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Columna lateral */}
          <aside className="md:col-span-1">
            {foto && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={foto}
                alt={mediaAlt(hoja?.foto) || hoja?.nombreCompleto || ''}
                className="w-full rounded-2xl shadow-md"
              />
            )}
            <h2 className="mt-4 text-2xl font-bold">{hoja?.nombreCompleto}</h2>
            {hoja?.cargoAspirado && <p className="text-[var(--color-marca)]">{hoja.cargoAspirado}</p>}

            {hoja?.logros && hoja.logros.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold">Logros destacados</h3>
                <ul className="mt-2 space-y-2">
                  {hoja.logros.map((l, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-[var(--color-marca)]">✓</span>
                      <span>{l.texto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Contenido principal */}
          <div className="md:col-span-2">
            {hoja?.biografia && (
              <section className="mb-10">
                <h2 className="mb-3 text-xl font-bold">Presentación</h2>
                <RichText data={hoja.biografia} />
              </section>
            )}

            {hoja?.experiencia && hoja.experiencia.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-4 text-xl font-bold">Experiencia y trayectoria</h2>
                <ol className="space-y-5 border-l-2 border-[var(--color-marca-claro)] pl-5">
                  {hoja.experiencia.map((e, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-[var(--color-marca)]" />
                      <h3 className="font-bold">{e.cargo}</h3>
                      <p className="text-sm text-gray-600">
                        {[e.organizacion, e.periodo].filter(Boolean).join(' · ')}
                      </p>
                      {e.descripcion && <p className="mt-1 text-sm text-gray-700">{e.descripcion}</p>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {hoja?.formacion && hoja.formacion.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-bold">Formación académica</h2>
                <ul className="space-y-3">
                  {hoja.formacion.map((f, i) => (
                    <li key={i}>
                      <h3 className="font-semibold">{f.titulo}</h3>
                      <p className="text-sm text-gray-600">
                        {[f.institucion, f.anio].filter(Boolean).join(' · ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
