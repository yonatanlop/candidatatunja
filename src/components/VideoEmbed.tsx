import { videoEmbedUrl, fetchTikTokThumbnail } from '@/lib/format'

interface Props {
  url?: string | null
  plataforma?: string | null
  titulo?: string
}

const ICONO_INSTAGRAM = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const ICONO_TIKTOK = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
)

const ICONO_PLAY = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-16 w-16 drop-shadow-lg">
    <path d="M8 5v14l11-7z" />
  </svg>
)

/** Incrusta un video (16:9) o muestra tarjeta con miniatura según la plataforma. */
export async function VideoEmbed({ url, plataforma, titulo }: Props) {
  if (!url) return null

  if (plataforma === 'instagram') {
    return (
      <TarjetaExterna url={url} titulo={titulo} icono={ICONO_INSTAGRAM} etiqueta="Ver en Instagram" />
    )
  }

  if (plataforma === 'tiktok') {
    const thumbnail = await fetchTikTokThumbnail(url)
    if (thumbnail) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: '16 / 9' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={titulo ?? 'Video de TikTok'}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-black/40 p-2">
              {ICONO_PLAY}
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-white">
              {ICONO_TIKTOK} Ver en TikTok
            </span>
          </div>
        </a>
      )
    }
    return (
      <TarjetaExterna url={url} titulo={titulo} icono={ICONO_TIKTOK} etiqueta="Ver en TikTok" />
    )
  }

  const embedUrl = videoEmbedUrl(url, plataforma)
  if (!embedUrl) return null

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-black"
      style={{ aspectRatio: '16 / 9' }}
    >
      <iframe
        src={embedUrl}
        title={titulo ?? 'Video'}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

function TarjetaExterna({
  url,
  titulo,
  icono,
  etiqueta,
}: {
  url: string
  titulo?: string
  icono: React.ReactNode
  etiqueta: string
}) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-lg bg-[var(--color-marca-claro)]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-3 px-4 text-center text-[var(--color-marca)] font-semibold hover:opacity-80 transition-opacity"
      >
        {icono}
        <span>{etiqueta} →</span>
        {titulo && <span className="text-sm font-normal text-gray-600">{titulo}</span>}
      </a>
    </div>
  )
}
