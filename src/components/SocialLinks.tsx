import { IconFacebook, IconInstagram, IconX, IconTikTok } from './iconos'

export type Redes = {
  facebook?: string | null
  instagram?: string | null
  x?: string | null
  tiktok?: string | null
}

export function SocialLinks({
  redes,
  className = '',
}: {
  redes?: Redes | null
  className?: string
}) {
  if (!redes) return null

  const items = [
    { url: redes.facebook, Icon: IconFacebook, nombre: 'Facebook' },
    { url: redes.instagram, Icon: IconInstagram, nombre: 'Instagram' },
    { url: redes.x, Icon: IconX, nombre: 'X' },
    { url: redes.tiktok, Icon: IconTikTok, nombre: 'TikTok' },
  ].filter((i) => i.url)

  if (items.length === 0) return null

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ url, Icon, nombre }) => (
        <a
          key={nombre}
          href={url as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={nombre}
          className="transition-opacity hover:opacity-70"
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
