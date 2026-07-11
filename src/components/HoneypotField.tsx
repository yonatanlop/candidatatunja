/**
 * Campo trampa (honeypot) contra bots. Está oculto para las personas (fuera de
 * pantalla y sin foco), pero los bots que rellenan todo lo completan. El Server
 * Action descarta el envío si este campo (`_gotcha`) llega con contenido.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <label>
        No llenar este campo
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
