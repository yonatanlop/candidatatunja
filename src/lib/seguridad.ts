import { headers } from 'next/headers'

// Registro en memoria de las marcas de tiempo de cada clave (IP + acción).
// Es por proceso (un solo contenedor) y se reinicia en cada despliegue: suficiente
// para frenar flooding automatizado sin infraestructura adicional.
const hits = new Map<string, number[]>()

/** IP del visitante a partir de las cabeceras del reverse proxy (Caddy). */
export async function obtenerIp(): Promise<string> {
  const h = await headers()
  const fwd = h.get('x-forwarded-for') ?? ''
  return fwd.split(',')[0].trim() || h.get('x-real-ip') || 'desconocida'
}

/**
 * Límite por clave con ventana deslizante. Devuelve `true` si se PERMITE la acción.
 * Por defecto: 5 acciones por minuto.
 */
export function permitir(clave: string, max = 5, ventanaMs = 60_000): boolean {
  const ahora = Date.now()
  const previos = (hits.get(clave) ?? []).filter((t) => ahora - t < ventanaMs)
  if (previos.length >= max) {
    hits.set(clave, previos)
    return false
  }
  previos.push(ahora)
  hits.set(clave, previos)

  // Limpieza defensiva para que el Map no crezca sin control.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => ahora - t >= ventanaMs)) hits.delete(k)
    }
  }
  return true
}

/**
 * Honeypot anti-bot: el formulario incluye un campo oculto (`_gotcha`) que una
 * persona nunca rellena pero los bots sí. Si viene con contenido, es un bot.
 */
export function esBot(formData: FormData): boolean {
  return String(formData.get('_gotcha') ?? '').trim().length > 0
}
