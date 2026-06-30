import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/PageHeader'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Plan de Gobierno' }

export default function PlanDeGobiernoPage() {
  return (
    <>
      <PageHeader
        titulo="Plan de Gobierno"
        descripcion="Gobernanza Responsable — Tunja 2026-2027"
      />

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">

        {/* Infografía */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-marca)]">
            Resumen del Plan
          </h2>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
            <Image
              src="/docs/infografia.png"
              alt="Infografía del Plan de Gobierno de Nohora Cano"
              width={1200}
              height={1600}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Botón Plan de Gobierno completo */}
        <section className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-marca)]">
            ¿Quieres conocer todos los detalles?
          </h2>
          <p className="text-gray-600 max-w-xl">
            Descarga o consulta el Plan de Gobierno completo de Nohora Cano y conoce cada
            propuesta para transformar Tunja.
          </p>
          <a
            href="/docs/plan-de-gobierno.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[var(--color-marca)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[var(--color-marca-oscuro)] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Ver Plan de Gobierno completo de Nohora Cano
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <p className="text-sm text-gray-400">Se abre en una nueva pestaña</p>
        </section>

      </div>
    </>
  )
}
