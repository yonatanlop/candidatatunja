import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Participa' }

const opciones = [
  {
    href: '/contacto',
    icono: '✉️',
    titulo: 'Contacto y voluntariado',
    texto: 'Escríbenos o súmate como voluntario/a de la campaña.',
  },
  {
    href: '/participa/buzon',
    icono: '💡',
    titulo: 'Buzón de sugerencias',
    texto: 'Comparte tus ideas y propuestas para Tunja.',
  },
  {
    href: '/participa/testigo-electoral',
    icono: '🗳️',
    titulo: '¿Quieres ser testigo electoral?',
    texto: 'Ayúdanos a cuidar los votos el día de las elecciones.',
  },
  {
    href: '/participa/reunion',
    icono: '🤝',
    titulo: '¿Deseas una reunión con la candidata?',
    texto: 'Solicita un encuentro con Nohora Cano.',
  },
]

export default function ParticipaPage() {
  return (
    <>
      <PageHeader
        titulo="Participa"
        descripcion="Tu voz construye ciudad. Elige cómo quieres sumarte a la campaña."
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {opciones.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="group flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{o.icono}</span>
              <h2 className="mt-3 text-lg font-bold group-hover:text-[var(--color-marca)]">
                {o.titulo}
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-600">{o.texto}</p>
              <span className="mt-4 text-sm font-semibold text-[var(--color-marca)]">
                Ir →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
