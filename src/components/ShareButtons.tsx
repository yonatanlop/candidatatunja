'use client'

/** Botones para compartir la página actual en redes sociales. */
export function ShareButtons({ url, titulo }: { url: string; titulo: string }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(titulo)

  const enlaces = [
    { nombre: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { nombre: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { nombre: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Compartir:</span>
      {enlaces.map((e) => (
        <a
          key={e.nombre}
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 transition-colors hover:border-[var(--color-marca)] hover:text-[var(--color-marca)]"
        >
          {e.nombre}
        </a>
      ))}
    </div>
  )
}
