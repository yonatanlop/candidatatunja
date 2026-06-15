import type { Media } from '@/payload-types'

type MediaRef = number | Media | null | undefined
type Tamano = 'thumbnail' | 'card' | 'hero'

/** Devuelve la URL de una imagen (opcionalmente de un tamaño concreto). */
export const mediaUrl = (media: MediaRef, tamano?: Tamano): string | null => {
  if (!media || typeof media === 'number') return null
  if (tamano && media.sizes?.[tamano]?.url) return media.sizes[tamano]!.url ?? null
  return media.url ?? null
}

/** Devuelve el texto alternativo de una imagen. */
export const mediaAlt = (media: MediaRef): string => {
  if (!media || typeof media === 'number') return ''
  return media.alt ?? ''
}
