import { youtubeEmbedUrl } from '@/lib/format'

/** Incrusta un video de YouTube de forma responsiva (16:9). */
export function YouTubeEmbed({ url, titulo }: { url?: string | null; titulo?: string }) {
  const embed = youtubeEmbedUrl(url)
  if (!embed) return null
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '16 / 9' }}>
      <iframe
        src={embed}
        title={titulo ?? 'Video de YouTube'}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
