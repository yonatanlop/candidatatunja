'use client'

import { useActionState } from 'react'
import { enviarContacto, type EstadoFormulario } from './actions'

const estadoInicial: EstadoFormulario | null = null

export function ContactForm() {
  const [estado, accion, pendiente] = useActionState(enviarContacto, estadoInicial)

  if (estado?.ok) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        <p className="font-semibold">{estado.mensaje}</p>
      </div>
    )
  }

  return (
    <form action={accion} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]"
        />
      </div>

      <div>
        <label htmlFor="telefono" className="mb-1 block text-sm font-medium">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]"
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input name="esVoluntario" type="checkbox" className="h-4 w-4" />
        Quiero ser voluntario/a de la campaña
      </label>

      {estado && !estado.ok && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full bg-[var(--color-marca)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-marca-oscuro)] disabled:opacity-60"
      >
        {pendiente ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  )
}
