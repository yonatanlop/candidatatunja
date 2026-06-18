import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { ReunionForm } from './ReunionForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Reunión con la candidata' }

export default function ReunionPage() {
  return (
    <>
      <PageHeader
        titulo="¿Deseas una reunión con la candidata?"
        descripcion="Solicita un encuentro con Nohora Cano. Indícanos el lugar, la fecha y la hora; el equipo confirmará contigo."
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <ReunionForm />
      </div>
    </>
  )
}
