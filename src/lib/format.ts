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
