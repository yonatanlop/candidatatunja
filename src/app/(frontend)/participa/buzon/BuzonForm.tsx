'use client'

import { useActionState } from 'react'
import { enviarSugerencia, type EstadoFormulario } from './actions'
import { HoneypotField } from '@/components/HoneypotField'

const estadoInicial: EstadoFormulario | null = null
const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]'

export function BuzonForm() {
  const [estado, accion, pendiente] = useActionState(enviarSugerencia, estadoInicial)

  if (estado?.ok) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        <p className="font-semibold">{estado.mensaje}</p>
      </div>
    )
  }

  return (
    <form action={accion} className="space-y-4">
      <HoneypotField />
      <div>
        <label htmlFor="sugerencia" className="mb-1 block text-sm font-medium">
          Tu sugerencia <span className="text-red-500">*</span>
        </label>
        <textarea id="sugerencia" name="sugerencia" rows={5} required className={inputClass} />
      </div>

      <p className="text-sm text-gray-500">Los siguientes datos son opcionales (por si deseas respuesta):</p>

      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium">Nombre</label>
        <input id="nombre" name="nombre" className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Correo electrónico</label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="telefono" className="mb-1 block text-sm font-medium">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" className={inputClass} />
        </div>
      </div>

      {estado && !estado.ok && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full bg-[var(--color-marca)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-marca-oscuro)] disabled:opacity-60"
      >
        {pendiente ? 'Enviando…' : 'Enviar sugerencia'}
      </button>
    </form>
  )
}
