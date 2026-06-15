import type { Metadata } from 'next'
import { getClient } from '@/lib/payload'
import { PageHeader } from '@/components/PageHeader'
import { ContactForm } from './ContactForm'
import { SocialLinks } from '@/components/SocialLinks'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Contacto' }

export default async function ContactoPage() {
  const payload = await getClient()
  const ajustes = await payload.findGlobal({ slug: 'ajustes-sitio' })
  const contacto = ajustes?.contacto

  return (
    <>
      <PageHeader
        titulo="Contacto"
        descripcion="Escríbenos, comparte tus ideas o súmate como voluntario/a de la campaña."
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Déjanos tus datos</h2>
          <p className="mt-1 text-sm text-gray-600">
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          {contacto && (contacto.email || contacto.telefono || contacto.direccion) && (
            <div className="rounded-xl bg-[var(--color-marca-claro)] p-6">
              <h3 className="font-bold">Datos de contacto</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {contacto.email && (
                  <li>
                    📧{' '}
                    <a href={`mailto:${contacto.email}`} className="hover:underline">
                      {contacto.email}
                    </a>
                  </li>
                )}
                {contacto.telefono && <li>📞 {contacto.telefono}</li>}
                {contacto.direccion && <li>📍 {contacto.direccion}</li>}
              </ul>
            </div>
          )}
          {ajustes?.redes && (
            <div>
              <h3 className="font-bold">Síguenos</h3>
              <SocialLinks redes={ajustes.redes} className="mt-3 text-[var(--color-marca)]" />
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
