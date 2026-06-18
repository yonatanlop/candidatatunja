import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { TestigoForm } from './TestigoForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Testigo electoral' }

export default function TestigoPage() {
  return (
    <>
      <PageHeader
        titulo="¿Quieres ser testigo electoral?"
        descripcion="Ayúdanos a cuidar los votos el día de las elecciones. Déjanos tus datos y te contactaremos."
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <TestigoForm />
      </div>
    </>
  )
}
