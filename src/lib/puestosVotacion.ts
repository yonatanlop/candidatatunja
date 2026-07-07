/**
 * Puestos de votación de Tunja.
 * Fuente única de verdad: se reutiliza en la colección `TestigosElectorales`,
 * en el Server Action de validación y en el formulario del frontend.
 */
export type OpcionPuesto = { label: string; value: string }

export const PUESTOS_VOTACION: OpcionPuesto[] = [
  { value: 'casd-barrio-san-antonio', label: 'C.A.S.D. Barrio San Antonio' },
  { value: 'carcel', label: 'Cárcel' },
  { value: 'col-boyaca-jose-ignacio-marquez', label: 'Col. de Boyacá SD José Ignacio de Márquez' },
  { value: 'col-boyaca-fco-paula-santander', label: 'Col. Boyacá Fco. de Paula Santander' },
  { value: 'colegio-salesiano-maldonado', label: 'Colegio Salesiano Maldonado' },
  { value: 'coliseo-cubierto-municipal', label: 'Coliseo Cubierto Municipal' },
  { value: 'coliseo-irdet', label: 'Coliseo I.R.D.ET' },
  { value: 'coliseo-municipal-comfaboy', label: 'Coliseo Municipal Comfaboy' },
  { value: 'coliseo-san-antonio', label: 'Coliseo San Antonio' },
  { value: 'coliseo-uniboyaca', label: 'Coliseo Uniboyacá' },
  { value: 'crib', label: 'Ctro. de Rehab. Integ. de Boyacá - CRIB' },
  { value: 'ie-gustavo-rojas-pinilla-central', label: 'I.E. Gustavo Rojas Pinilla SD Central' },
  { value: 'ie-antonio-jose-sandoval-gomez', label: 'I.E. Antonio José Sandoval Gómez' },
  { value: 'ie-libertador-simon-bolivar-central', label: 'I.E. Libertador Simón Bolívar Sede Central' },
  { value: 'puente-de-boyaca', label: 'Puente de Boyacá' },
  { value: 'puesto-censo-san-agustin', label: 'Puesto Censo (Col. Boy. San Agustín)' },
  { value: 'universidad-santo-tomas', label: 'Universidad Santo Tomás' },
  { value: 'auditorio-gustavo-castellanos-comfaboy', label: 'Auditorio Gustavo M. Castellanos Comfaboy' },
  { value: 'ie-silvino-rodriguez-manzanares', label: 'I.E. Silvino Rodríguez SD Manzanares' },
  { value: 'it-gonzalo-suarez-rendon-central', label: 'I.T. Gonzalo Suárez Rendón Sede Central' },
  { value: 'ie-libertador-simon-bolivar-san-francisco', label: 'I.E. Libertador Simón Bolívar SN Francisco' },
  { value: 'ie-normal-superior-jardin-nacional', label: 'I.E. Normal Superior SD Jardín Nacional' },
  { value: 'ies-juan-castellanos-crisanto-luque', label: 'IES Juan Castellanos SD Crisanto Luque' },
  { value: 'inem-carlos-arturo-torres-central', label: 'INEM Carlos Arturo Torres SD Central' },
  { value: 'ns-leonor-alvarez-pinzon-primaria', label: 'N.S. Leonor Álvarez Pinzón Primaria' },
  { value: 'universidad-juan-de-castellanos', label: 'Universidad Juan de Castellanos' },
]

/** Valores válidos (para validar en el Server Action). */
export const VALORES_PUESTOS = PUESTOS_VOTACION.map((p) => p.value)
