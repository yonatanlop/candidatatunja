/** Formatea una fecha ISO a texto en español. */
export const formatearFecha = (
  iso: string | null | undefined,
  opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
): string => {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('es-CO', opciones).format(new Date(iso))
  } catch {
    return ''
  }
}

/** Formatea fecha y hora (para entrevistas próximas). */
export const formatearFechaHora = (iso: string | null | undefined): string =>
  formatearFecha(iso, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

/**
 * Extrae el ID de un video de YouTube desde distintas formas de URL
 * (watch?v=, youtu.be/, embed/, shorts/) y devuelve la URL para incrustar.
 */
export const youtubeEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null
  const patrones = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ]
  for (const patron of patrones) {
    const m = url.match(patron)
    if (m) return `https://www.youtube.com/embed/${m[1]}`
  }
  return null
}

/** Devuelve la URL de embed según la plataforma, o null si no se puede incrustar. */
export const videoEmbedUrl = (
  url: string | null | undefined,
  plataforma: string | null | undefined,
): string | null => {
  if (!url) return null
  switch (plataforma) {
    case 'youtube':
      return youtubeEmbedUrl(url)
    case 'facebook':
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`
    default:
      return null
  }
}

/** Consulta la API pública de oEmbed de TikTok y devuelve la URL de la miniatura. */
export const fetchTikTokThumbnail = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    return (data.thumbnail_url as string) ?? null
  } catch {
    return null
  }
}
