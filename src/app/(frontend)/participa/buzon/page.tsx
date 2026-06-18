import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { BuzonForm } from './BuzonForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Buzón de sugerencias' }

export default function BuzonPage() {
  return (
    <>
      <PageHeader
        titulo="Buzón de sugerencias"
        descripcion="¿Tienes una idea o propuesta para Tunja? Cuéntanos, te leemos."
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <BuzonForm />
      </div>
    </>
  )
}
