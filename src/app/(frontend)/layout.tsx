import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { getClient } from '@/lib/payload'
import { mediaUrl } from '@/lib/media'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getClient()
  const ajustes = await payload.findGlobal({ slug: 'ajustes-sitio' })
  const nombre = ajustes?.nombreSitio || 'Campaña'
  return {
    metadataBase: new URL(siteUrl),
    title: { default: nombre, template: `%s | ${nombre}` },
    description: ajustes?.lema || 'Sitio oficial de campaña',
    openGraph: { siteName: nombre, locale: 'es_CO', type: 'website' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getClient()
  const ajustes = await payload.findGlobal({ slug: 'ajustes-sitio' })

  const nombreSitio = ajustes?.nombreSitio || 'Campaña'
  const logoUrl = mediaUrl(ajustes?.logo)
  const redes = ajustes?.redes ?? null

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col antialiased">
        <Header nombreSitio={nombreSitio} logoUrl={logoUrl} redes={redes} />
        <main className="flex-1">{children}</main>
        <Footer
          nombreSitio={nombreSitio}
          textoPie={ajustes?.textoPie}
          redes={redes}
          contacto={ajustes?.contacto ?? null}
        />
      </body>
    </html>
  )
}
