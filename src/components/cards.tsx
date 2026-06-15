import Link from 'next/link'
import type { Noticia, Propuesta, Entrevista } from '@/payload-types'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { formatearFecha, formatearFechaHora } from '@/lib/format'

const EJES: Record<string, string> = {
  educacion: 'Educación',
  seguridad: 'Seguridad',
  salud: 'Salud',
  empleo: 'Empleo y economía',
  movilidad: 'Movilidad e infraestructura',
  ambiente: 'Medio ambiente',
  cultura: 'Cultura y deporte',
  gobierno: 'Gobierno y transparencia',
  otro: 'Otro',
}

export const etiquetaEje = (eje?: string | null) => (eje ? EJES[eje] ?? eje : '')

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const img = mediaUrl(noticia.portada, 'card')
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/noticias/${noticia.slug}`} className="block">
        <div className="aspect-[3/2] overflow-hidden bg-gray-100">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={mediaAlt(noticia.portada) || noticia.titulo}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">Sin imagen</div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-medium uppercase tracking-wide text-[var(--color-marca)]">
          {formatearFecha(noticia.fecha)}
        </time>
        <h3 className="mt-2 text-lg font-bold leading-snug">
          <Link href={`/noticias/${noticia.slug}`} className="hover:text-[var(--color-marca)]">
            {noticia.titulo}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{noticia.resumen}</p>
        <Link
          href={`/noticias/${noticia.slug}`}
          className="mt-4 text-sm font-semibold text-[var(--color-marca)] hover:underline"
        >
          Leer más →
        </Link>
      </div>
    </article>
  )
}

export function PropuestaCard({ propuesta }: { propuesta: Propuesta }) {
  return (
    <article className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        {propuesta.icono && <span className="text-2xl">{propuesta.icono}</span>}
        <span className="rounded-full bg-[var(--color-marca-claro)] px-3 py-1 text-xs font-semibold text-[var(--color-marca-oscuro)]">
          {etiquetaEje(propuesta.eje)}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-bold">
        <Link href={`/propuestas/${propuesta.slug}`} className="hover:text-[var(--color-marca)]">
          {propuesta.titulo}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">{propuesta.resumen}</p>
      <Link
        href={`/propuestas/${propuesta.slug}`}
        className="mt-4 text-sm font-semibold text-[var(--color-marca)] hover:underline"
      >
        Ver propuesta →
      </Link>
    </article>
  )
}

export function EntrevistaCard({ entrevista }: { entrevista: Entrevista }) {
  const proxima = entrevista.estado === 'proxima'
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--color-marca)]">{entrevista.medio}</span>
        {proxima && (
          <span className="rounded-full bg-[var(--color-acento)]/20 px-2 py-0.5 text-xs font-semibold text-[var(--color-marca-oscuro)]">
            Próxima
          </span>
        )}
      </div>
      <h3 className="mt-1 font-bold">{entrevista.titulo}</h3>
      <time className="text-sm text-gray-500">
        {proxima ? formatearFechaHora(entrevista.fecha) : formatearFecha(entrevista.fecha)}
      </time>
      {entrevista.descripcion && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{entrevista.descripcion}</p>
      )}
    </article>
  )
}
