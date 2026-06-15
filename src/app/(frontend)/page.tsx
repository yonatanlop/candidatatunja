import Link from 'next/link'
import { getClient } from '@/lib/payload'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { NoticiaCard, PropuestaCard, EntrevistaCard } from '@/components/cards'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getClient()

  const [hoja, ajustes, propuestas, noticias, proximas] = await Promise.all([
    payload.findGlobal({ slug: 'hoja-de-vida' }),
    payload.findGlobal({ slug: 'ajustes-sitio' }),
    payload.find({ collection: 'propuestas', limit: 3, sort: 'orden' }),
    payload.find({ collection: 'noticias', limit: 3, sort: '-fecha' }),
    payload.find({
      collection: 'entrevistas',
      limit: 3,
      where: { estado: { equals: 'proxima' } },
      sort: 'fecha',
    }),
  ])

  const foto = mediaUrl(hoja?.foto)
  const lema = ajustes?.lema

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-marca-claro)]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-marca)]">
              {hoja?.cargoAspirado || 'Candidata a la Alcaldía'}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-[var(--color-tinta)] md:text-5xl">
              {hoja?.nombreCompleto || ajustes?.nombreSitio || 'Nuestra candidata'}
            </h1>
            {lema && <p className="mt-4 text-lg text-gray-700">{lema}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/propuestas"
                className="rounded-full bg-[var(--color-marca)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-marca-oscuro)]"
              >
                Ver propuestas
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border-2 border-[var(--color-marca)] px-6 py-3 font-semibold text-[var(--color-marca)] transition-colors hover:bg-white"
              >
                Súmate a la campaña
              </Link>
            </div>
          </div>
          {foto && (
            <div className="justify-self-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={foto}
                alt={mediaAlt(hoja?.foto) || hoja?.nombreCompleto || 'Candidata'}
                className="w-full max-w-sm rounded-2xl shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Propuestas destacadas */}
      {propuestas.docs.length > 0 && (
        <Seccion titulo="Propuestas" enlace={{ href: '/propuestas', texto: 'Ver todas' }}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {propuestas.docs.map((p) => (
              <PropuestaCard key={p.id} propuesta={p} />
            ))}
          </div>
        </Seccion>
      )}

      {/* Últimas noticias */}
      {noticias.docs.length > 0 && (
        <Seccion titulo="Últimas noticias" enlace={{ href: '/noticias', texto: 'Ver todas' }} gris>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.docs.map((n) => (
              <NoticiaCard key={n.id} noticia={n} />
            ))}
          </div>
        </Seccion>
      )}

      {/* Próximas entrevistas */}
      {proximas.docs.length > 0 && (
        <Seccion
          titulo="Próximas entrevistas"
          enlace={{ href: '/entrevistas', texto: 'Ver agenda' }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proximas.docs.map((e) => (
              <EntrevistaCard key={e.id} entrevista={e} />
            ))}
          </div>
        </Seccion>
      )}

      {/* CTA final */}
      <section className="bg-[var(--color-marca)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-bold">Construyamos juntos el cambio</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Tu apoyo hace la diferencia. Conoce las propuestas y súmate como voluntario/a.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-full bg-[var(--color-acento)] px-8 py-3 font-semibold text-[var(--color-marca-oscuro)] transition-transform hover:scale-105 hover:bg-[var(--color-acento-oscuro)]"
          >
            Quiero participar
          </Link>
        </div>
      </section>
    </>
  )
}

function Seccion({
  titulo,
  enlace,
  gris,
  children,
}: {
  titulo: string
  enlace?: { href: string; texto: string }
  gris?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={gris ? 'bg-gray-50' : ''}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">{titulo}</h2>
          {enlace && (
            <Link
              href={enlace.href}
              className="text-sm font-semibold text-[var(--color-marca)] hover:underline"
            >
              {enlace.texto} →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
