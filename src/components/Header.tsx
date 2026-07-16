'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SocialLinks, type Redes } from './SocialLinks'

const enlaces = [
  { href: '/', texto: 'Inicio' },
  { href: '/tarjeton', texto: '¡Aprende a votar!', destacado: true },
  { href: 'https://partidomira.com/tunja/', texto: 'Simulador de voto', externo: true },
  { href: '/hoja-de-vida', texto: 'Hoja de vida' },
  { href: '/plan-de-gobierno', texto: 'Plan de Gobierno' },
  { href: '/propuestas', texto: 'Propuestas' },
  { href: '/noticias', texto: 'Noticias' },
  { href: '/entrevistas', texto: 'Entrevistas' },
  { href: '/participa', texto: 'Participa' },
]

export function Header({
  nombreSitio,
  logoUrl,
  redes,
}: {
  nombreSitio: string
  logoUrl?: string | null
  redes?: Redes | null
}) {
  const [abierto, setAbierto] = useState(false)
  const pathname = usePathname()

  const esActivo = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setAbierto(false)}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={nombreSitio} className="h-10 w-auto" />
          ) : (
            <span className="text-lg font-extrabold text-[var(--color-marca)]">
              {nombreSitio}
            </span>
          )}
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-6 md:flex">
          {enlaces.map((e) =>
            e.externo ? (
              <a
                key={e.href}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[var(--color-acento)] px-4 py-1 text-sm font-bold text-[var(--color-acento)] transition-colors hover:bg-[var(--color-acento)] hover:text-white"
              >
                {e.texto}
              </a>
            ) : (
              <Link
                key={e.href}
                href={e.href}
                className={`text-sm font-medium transition-colors ${
                  e.destacado
                    ? 'rounded-full bg-[var(--color-acento)] px-4 py-1.5 font-bold text-white shadow-sm hover:brightness-110'
                    : esActivo(e.href)
                    ? 'text-[var(--color-marca)]'
                    : 'text-gray-700 hover:text-[var(--color-marca)]'
                }`}
              >
                {e.texto}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <SocialLinks redes={redes} className="text-[var(--color-marca)]" />
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          className="md:hidden"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {abierto ? (
              <path strokeWidth={2} strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeWidth={2} strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {abierto && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {enlaces.map((e) => (
              <li key={e.href}>
                {e.externo ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setAbierto(false)}
                    className="block rounded-full border-2 border-[var(--color-acento)] px-4 py-2 text-center text-base font-bold text-[var(--color-acento)]"
                  >
                    {e.texto}
                  </a>
                ) : (
                  <Link
                    href={e.href}
                    onClick={() => setAbierto(false)}
                    className={`block rounded px-2 py-2 text-base font-medium ${
                      e.destacado
                        ? 'rounded-full bg-[var(--color-acento)] px-4 font-bold text-white text-center'
                        : esActivo(e.href)
                        ? 'bg-[var(--color-marca-claro)] text-[var(--color-marca)]'
                        : 'text-gray-700'
                    }`}
                  >
                    {e.texto}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <SocialLinks redes={redes} className="mt-3 text-[var(--color-marca)]" />
        </nav>
      )}
    </header>
  )
}
