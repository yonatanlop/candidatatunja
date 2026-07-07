import { NextResponse } from 'next/server'
import { getClient } from '@/lib/payload'

export async function POST() {
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
