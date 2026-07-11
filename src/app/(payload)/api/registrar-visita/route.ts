import { NextResponse } from 'next/server'
import { getClient } from '@/lib/payload'
import { obtenerIp, permitir } from '@/lib/seguridad'

export async function POST() {
  // Evita que un bot infle el contador: máximo 10 visitas por minuto por IP.
  if (!permitir(`visita:${await obtenerIp()}`, 10, 60_000)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }
  try {
    const payload = await getClient()
    const actual = await payload.findGlobal({ slug: 'estadisticas', overrideAccess: true })
    const nuevoTotal = (actual.totalVisitas ?? 0) + 1
    await payload.updateGlobal({
      slug: 'estadisticas',
      data: { totalVisitas: nuevoTotal },
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, total: nuevoTotal })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
