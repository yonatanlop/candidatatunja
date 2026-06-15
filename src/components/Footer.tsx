import Link from 'next/link'
import { SocialLinks, type Redes } from './SocialLinks'

export function Footer({
  nombreSitio,
  textoPie,
  redes,
  contacto,
}: {
  nombreSitio: string
  textoPie?: string | null
  redes?: Redes | null
  contacto?: { email?: string | null; telefono?: string | null; direccion?: string | null } | null
}) {
  const anio = new Date().getFullYear()
  return (
    <footer className="mt-16 bg-[var(--color-marca-oscuro)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{nombreSitio}</h3>
          {textoPie && <p className="mt-2 text-sm text-white/70">{textoPie}</p>}
          <SocialLinks redes={redes} className="mt-4" />
        </div>

        <nav className="text-sm">
          <h4 className="mb-3 font-semibold uppercase tracking-wide text-white/80">Secciones</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/hoja-de-vida" className="hover:text-white">Hoja de vida</Link></li>
            <li><Link href="/propuestas" className="hover:text-white">Propuestas</Link></li>
            <li><Link href="/noticias" className="hover:text-white">Noticias</Link></li>
            <li><Link href="/entrevistas" className="hover:text-white">Entrevistas</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </nav>

        {contacto && (contacto.email || contacto.telefono || contacto.direccion) && (
          <div className="text-sm text-white/70">
            <h4 className="mb-3 font-semibold uppercase tracking-wide text-white/80">Contacto</h4>
            {contacto.email && (
              <p>
                <a href={`mailto:${contacto.email}`} className="hover:text-white">
                  {contacto.email}
                </a>
              </p>
            )}
            {contacto.telefono && <p className="mt-1">{contacto.telefono}</p>}
            {contacto.direccion && <p className="mt-1">{contacto.direccion}</p>}
          </div>
        )}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {anio} {nombreSitio}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
