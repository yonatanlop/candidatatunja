import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Cómo marcar en el tarjetón' }

export default function TarjetonPage() {
  return (
    <>
      <PageHeader
        titulo="Cómo marcar en el tarjetón"
        descripcion="Aprende a marcar correctamente tu voto por Nohora Cano el 26 de julio."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">

        {/* Video */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-marca)]">
            Video instructivo
          </h2>
          <div className="overflow-hidden rounded-2xl shadow-lg bg-black">
            <video
              controls
              className="w-full"
              preload="metadata"
            >
              <source src="/tarjeton/tarjeton.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </section>

        {/* Imagen */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-marca)]">
            Así se ve el tarjetón
          </h2>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tarjeton/tarjeton.jpeg"
              alt="Imagen del tarjetón electoral con indicación de cómo votar por Nohora Cano"
              className="w-full h-auto"
            />
          </div>
        </section>

      </div>
    </>
  )
}
