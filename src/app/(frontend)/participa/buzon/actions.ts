'use server'

import { getClient } from '@/lib/payload'

export type EstadoFormulario = {
  ok: boolean
  mensaje: string
}

/** Server Action: guarda una sugerencia en la colección "sugerencias". */
export async function enviarSugerencia(
  _prev: EstadoFormulario | null,
  formData: FormData,
): Promise<EstadoFormulario> {
  const sugerencia = String(formData.get('sugerencia') ?? '').trim()
  const nombre = String(formData.get('nombre') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const telefono = String(formData.get('telefono') ?? '').trim()

  if (sugerencia.length < 5) {
    return { ok: false, mensaje: 'Por favor escribe tu sugerencia.' }
  }

  try {
    const payload = await getClient()
    await payload.create({
      collection: 'sugerencias',
      data: {
        sugerencia,
        nombre: nombre || undefined,
        email: email || undefined,
        telefono: telefono || undefined,
      },
    })
    return { ok: true, mensaje: '¡Gracias! Tu sugerencia fue recibida.' }
  } catch (error) {
    console.error('Error al guardar sugerencia:', error)
    return { ok: false, mensaje: 'Ocurrió un error al enviar. Inténtalo de nuevo más tarde.' }
  }
}
