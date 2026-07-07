import React from 'react'

/**
 * Botón que aparece encima de la lista de "Testigos electorales" en el panel.
 * Descarga el reporte en Excel (CSV) llamando a la ruta protegida /export/testigos-electorales.
 */
export function ExportarTestigos() {
  return (
    <div style={{ margin: '0 0 1rem' }}>
      <a
        href="/export/testigos-electorales"
        className="btn btn--style-primary btn--size-medium"
        style={{ textDecoration: 'none' }}
      >
        ⬇️  Descargar Excel (testigos)
      </a>
    </div>
  )
}
