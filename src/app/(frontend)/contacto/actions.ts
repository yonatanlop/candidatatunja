'use server'

import { getClient } from '@/lib/payload'
import { esBot, obtenerIp, permitir } from '@/lib/seguridad'

export type EstadoFormulario = {
  ok: boolean
  mensaje: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Server Action: guarda un mensaje/voluntario en la colección "contactos". */
export async function enviarContacto(
  _prev: EstadoFormulario | null,
  formData: FormData,
): Promise<EstadoFormulario> {
  // Anti-bot: si el honeypot viene lleno, fingimos éxito sin guardar nada.
  if (esBot(formData)) {
    return { ok: true, mensaje: '¡Gracias por escribirnos! Hemos recibido tu mensaje.' }
  }
  // Límite por IP para frenar flooding.
  if (!permitir(`contacto:${await obtenerIp()}`)) {
    return { ok: false, mensaje: 'Has enviado demasiados mensajes. Espera un momento e inténtalo de nuevo.' }
  }

  const nombre = String(formData.get('nombre') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const telefono = String(formData.get('telefono') ?? '').trim()
  const mensaje = String(formData.get('mensaje') ?? '').trim()
  const esVoluntario = formData.get('esVoluntario') === 'on'

  if (nombre.length < 2) {
    return { ok: false, mensaje: 'Por favor escribe tu nombre.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, mensaje: 'Por favor ingresa un correo electrónico válido.' }
  }

  try {
    const payload = await getClient()
    await payload.create({
      collection: 'contactos',
      data: { nombre, email, telefono, mensaje, esVoluntario },
    })
    return {
      ok: true,
      mensaje: esVoluntario
        ? '¡Gracias por sumarte! Te contactaremos pronto.'
        : '¡Gracias por escribirnos! Hemos recibido tu mensaje.',
    }
  } catch (error) {
    console.error('Error al guardar contacto:', error)
    return { ok: false, mensaje: 'Ocurrió un error al enviar. Inténtalo de nuevo más tarde.' }
  }
}
