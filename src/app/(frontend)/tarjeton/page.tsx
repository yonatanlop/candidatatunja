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

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">

          {/* Video */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden rounded-2xl shadow-lg bg-black">
              <video controls className="w-full" preload="metadata">
                <source src="/tarjeton/tarjeton.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
            <p className="text-center text-sm text-gray-500">Video instructivo</p>
          </div>

          {/* Imagen */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tarjeton/tarjeton.jpeg"
                alt="Imagen del tarjetón electoral con indicación de cómo votar por Nohora Cano"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-gray-500">Así se ve el tarjetón</p>
          </div>

        </div>
      </div>
    </>
  )
}
