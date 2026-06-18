'use server'

import { getClient } from '@/lib/payload'

export type EstadoFormulario = {
  ok: boolean
  mensaje: string
}

const TIPOS_VALIDOS = ['CC', 'CE', 'TI', 'PA']

/** Server Action: registra un testigo electoral en la colección "testigos-electorales". */
export async function registrarTestigo(
  _prev: EstadoFormulario | null,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nombreCompleto = String(formData.get('nombreCompleto') ?? '').trim()
  const tipoDocumento = String(formData.get('tipoDocumento') ?? '').trim()
  const numeroDocumento = String(formData.get('numeroDocumento') ?? '').trim()
  const celular = String(formData.get('celular') ?? '').trim()

  if (nombreCompleto.length < 3) {
    return { ok: false, mensaje: 'Por favor escribe tu nombre completo.' }
  }
  if (!TIPOS_VALIDOS.includes(tipoDocumento)) {
    return { ok: false, mensaje: 'Selecciona un tipo de documento válido.' }
  }
  if (numeroDocumento.length < 4) {
    return { ok: false, mensaje: 'Por favor ingresa tu número de documento.' }
  }
  if (celular.replace(/\D/g, '').length < 7) {
    return { ok: false, mensaje: 'Por favor ingresa un número de celular válido.' }
  }

  try {
    const payload = await getClient()
    await payload.create({
      collection: 'testigos-electorales',
      data: {
        nombreCompleto,
        tipoDocumento: tipoDocumento as 'CC' | 'CE' | 'TI' | 'PA',
        numeroDocumento,
        celular,
      },
    })
    return { ok: true, mensaje: '¡Gracias por sumarte como testigo electoral! Te contactaremos.' }
  } catch (error) {
    console.error('Error al registrar testigo:', error)
    return { ok: false, mensaje: 'Ocurrió un error al enviar. Inténtalo de nuevo más tarde.' }
  }
}
