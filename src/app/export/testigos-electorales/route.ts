import { headers as nextHeaders } from 'next/headers'
import { getClient } from '@/lib/payload'
import { PUESTOS_VOTACION } from '@/lib/puestosVotacion'

export const dynamic = 'force-dynamic'

// Etiquetas legibles para los valores almacenados.
const PUESTO_LABEL = new Map(PUESTOS_VOTACION.map((p) => [p.value, p.label]))
const TIPO_DOC_LABEL: Record<string, string> = {
  CC: 'Cédula de ciudadanía',
  CE: 'Cédula de extranjería',
  TI: 'Tarjeta de identidad',
  PA: 'Pasaporte',
}

/** Escapa un valor para CSV (separador ;). */
function csv(valor: unknown): string {
  const s = valor == null ? '' : String(valor)
  return `"${s.replace(/"/g, '""')}"`
}

function formatFecha(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`
}

/**
 * Exporta los testigos electorales a un archivo CSV (se abre en Excel).
 * Solo accesible para usuarios autenticados del panel de administración.
 */
export async function GET() {
  const payload = await getClient()

  // Verificar que haya una sesión válida del panel.
  const { user } = await payload.auth({ headers: await nextHeaders() })
  if (!user) {
    return new Response('No autorizado. Inicia sesión en el panel.', { status: 401 })
  }

  const { docs } = await payload.find({
    collection: 'testigos-electorales',
    limit: 100000,
    sort: '-createdAt',
    depth: 0,
  })

  const encabezados = [
    'Nombres y apellidos completos',
    'Tipo de documento',
    'Número de documento',
    'Número de celular',
    'Puesto de votación',
    'Contactado por el equipo',
    'Fecha de registro',
  ]

  const filas = docs.map((t) =>
    [
      csv(t.nombreCompleto),
      csv(TIPO_DOC_LABEL[t.tipoDocumento as string] ?? t.tipoDocumento),
      csv(t.numeroDocumento),
      csv(t.celular),
      csv(PUESTO_LABEL.get(t.puestoVotacion as string) ?? t.puestoVotacion),
      csv(t.contactado === 'si' ? 'Sí' : 'No'),
      csv(formatFecha(t.createdAt)),
    ].join(';'),
  )

  // "sep=;" ayuda a que Excel use ; como separador sin importar el idioma del sistema.
  // El BOM (﻿) hace que Excel reconozca UTF-8 y muestre bien las tildes.
  const contenido =
    '﻿' + 'sep=;\n' + [encabezados.map(csv).join(';'), ...filas].join('\r\n')

  const fecha = new Date().toISOString().slice(0, 10)
  return new Response(contenido, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="testigos-electorales-${fecha}.csv"`,
    },
  })
}
