'use server'

import { getClient } from '@/lib/payload'
import { esBot, obtenerIp, permitir } from '@/lib/seguridad'

export type EstadoFormulario = {
  ok: boolean
  mensaje: string
}

const UNA_HORA_MS = 60 * 60 * 1000

/**
 * Server Action: solicita una reunión con la candidata.
 * Valida que la nueva reunión no se cruce con otra existente dentro de una
 * ventana de 1 hora (deben estar separadas al menos 1 hora).
 */
export async function solicitarReunion(
  _prev: EstadoFormulario | null,
  formData: FormData,
): Promise<EstadoFormulario> {
  if (esBot(formData)) {
    return { ok: true, mensaje: '¡Solicitud enviada! El equipo confirmará la reunión contigo.' }
  }
  if (!permitir(`reunion:${await obtenerIp()}`)) {
    return { ok: false, mensaje: 'Has enviado demasiadas solicitudes. Espera un momento e inténtalo de nuevo.' }
  }

  const nombre = String(formData.get('nombre') ?? '').trim()
  const lugar = String(formData.get('lugar') ?? '').trim()
  const fechaHoraRaw = String(formData.get('fechaHora') ?? '').trim()

  if (nombre.length < 3) {
    return { ok: false, mensaje: 'Por favor escribe tu nombre.' }
  }
  if (lugar.length < 3) {
    return { ok: false, mensaje: 'Por favor indica el lugar de la reunión.' }
  }
  const fecha = new Date(fechaHoraRaw)
  if (!fechaHoraRaw || isNaN(fecha.getTime())) {
    return { ok: false, mensaje: 'Por favor selecciona una fecha y hora válidas.' }
  }
  if (fecha.getTime() < Date.now()) {
    return { ok: false, mensaje: 'La fecha y hora deben ser futuras.' }
  }

  try {
    const payload = await getClient()

    // Validar cruce: ¿existe otra reunión dentro de ±1 hora?
    const inicio = new Date(fecha.getTime() - UNA_HORA_MS).toISOString()
    const fin = new Date(fecha.getTime() + UNA_HORA_MS).toISOString()
    const choque = await payload.find({
      collection: 'reuniones',
      where: {
        and: [{ fechaHora: { greater_than: inicio } }, { fechaHora: { less_than: fin } }],
      },
      limit: 1,
    })
    if (choque.docs.length > 0) {
      return {
        ok: false,
        mensaje:
          'Ya hay una reunión cerca de ese horario. Elige otra fecha u hora (deja al menos 1 hora de diferencia).',
      }
    }

    await payload.create({
      collection: 'reuniones',
      data: { nombre, lugar, fechaHora: fecha.toISOString(), estado: 'solicitada' },
    })
    return { ok: true, mensaje: '¡Solicitud enviada! El equipo confirmará la reunión contigo.' }
  } catch (error) {
    console.error('Error al solicitar reunión:', error)
    return { ok: false, mensaje: 'Ocurrió un error al enviar. Inténtalo de nuevo más tarde.' }
  }
}
