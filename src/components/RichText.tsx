import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Renderiza el contenido enriquecido (Lexical) de Payload como HTML. */
export function RichText({
  data,
  className,
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null
  return (
    <div className={`prosa ${className ?? ''}`}>
      <LexicalRichText data={data} />
    </div>
  )
}
