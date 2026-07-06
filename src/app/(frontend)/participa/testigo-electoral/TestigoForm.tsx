'use client'

import { useActionState } from 'react'
import { registrarTestigo, type EstadoFormulario } from './actions'
import { PUESTOS_VOTACION } from '@/lib/puestosVotacion'

const estadoInicial: EstadoFormulario | null = null
const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[var(--color-marca)] focus:outline-none focus:ring-1 focus:ring-[var(--color-marca)]'

export function TestigoForm() {
  const [estado, accion, pendiente] = useActionState(registrarTestigo, estadoInicial)

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
        <label htmlFor="nombreCompleto" className="mb-1 block text-sm font-medium">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input id="nombreCompleto" name="nombreCompleto" required className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tipoDocumento" className="mb-1 block text-sm font-medium">
            Tipo de documento <span className="text-red-500">*</span>
          </label>
          <select id="tipoDocumento" name="tipoDocumento" required defaultValue="CC" className={inputClass}>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="PA">Pasaporte</option>
          </select>
        </div>
        <div>
          <label htmlFor="numeroDocumento" className="mb-1 block text-sm font-medium">
            Número de documento <span className="text-red-500">*</span>
          </label>
          <input id="numeroDocumento" name="numeroDocumento" required inputMode="numeric" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="celular" className="mb-1 block text-sm font-medium">
          Número de celular <span className="text-red-500">*</span>
        </label>
        <input id="celular" name="celular" type="tel" required inputMode="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="puestoVotacion" className="mb-1 block text-sm font-medium">
          Puesto de votación <span className="text-red-500">*</span>
        </label>
        <select id="puestoVotacion" name="puestoVotacion" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecciona tu puesto de votación…
          </option>
          {PUESTOS_VOTACION.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {estado && !estado.ok && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estado.mensaje}</p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full bg-[var(--color-marca)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-marca-oscuro)] disabled:opacity-60"
      >
        {pendiente ? 'Enviando…' : 'Quiero ser testigo electoral'}
      </button>
    </form>
  )
}
