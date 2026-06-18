'use client'

import { useActionState } from 'react'
import { solicitarReunion, type EstadoFormulario } from './actions'

const estadoInicial: EstadoFormulario | null = null
const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]'

export function ReunionForm() {
  const [estado, accion, pendiente] = useActionState(solicitarReunion, estadoInicial)

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
        <input id="nombre" name="nombre" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="lugar" className="mb-1 block text-sm font-medium">
          Lugar donde se realizaría <span className="text-red-500">*</span>
        </label>
        <input id="lugar" name="lugar" required className={inputClass} placeholder="Ej.: Barrio, salón comunal, dirección..." />
      </div>

      <div>
        <label htmlFor="fechaHora" className="mb-1 block text-sm font-medium">
          Fecha y hora <span className="text-red-500">*</span>
        </label>
        <input id="fechaHora" name="fechaHora" type="datetime-local" required className={inputClass} />
        <p className="mt-1 text-xs text-gray-500">
          Deja al menos 1 hora de diferencia con otras reuniones ya agendadas.
        </p>
      </div>

      {estado && !estado.ok && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full bg-[var(--color-marca)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-marca-oscuro)] disabled:opacity-60"
      >
        {pendiente ? 'Enviando…' : 'Solicitar reunión'}
      </button>
    </form>
  )
}
