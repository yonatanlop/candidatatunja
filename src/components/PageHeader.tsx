export function PageHeader({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
  return (
    <div className="bg-[var(--color-marca-claro)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold md:text-4xl">{titulo}</h1>
        {descripcion && <p className="mt-3 max-w-2xl text-gray-700">{descripcion}</p>}
      </div>
    </div>
  )
}
