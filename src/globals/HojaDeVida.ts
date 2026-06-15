import type { GlobalConfig } from 'payload'

export const HojaDeVida: GlobalConfig = {
  slug: 'hoja-de-vida',
  label: 'Hoja de vida',
  admin: { group: 'Contenido' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombreCompleto',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'cargoAspirado',
      type: 'text',
      label: 'Cargo al que aspira',
      defaultValue: 'Candidata a la Alcaldía',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de perfil',
    },
    {
      name: 'biografia',
      type: 'richText',
      label: 'Biografía / presentación',
    },
    {
      name: 'formacion',
      type: 'array',
      label: 'Formación académica',
      labels: { singular: 'Estudio', plural: 'Estudios' },
      fields: [
        { name: 'titulo', type: 'text', label: 'Título obtenido', required: true },
        { name: 'institucion', type: 'text', label: 'Institución' },
        { name: 'anio', type: 'text', label: 'Año' },
      ],
    },
    {
      name: 'experiencia',
      type: 'array',
      label: 'Experiencia / trayectoria',
      labels: { singular: 'Experiencia', plural: 'Experiencias' },
      fields: [
        { name: 'cargo', type: 'text', label: 'Cargo / rol', required: true },
        { name: 'organizacion', type: 'text', label: 'Organización' },
        { name: 'periodo', type: 'text', label: 'Periodo (ej. 2018 - 2022)' },
        { name: 'descripcion', type: 'textarea', label: 'Descripción' },
      ],
    },
    {
      name: 'logros',
      type: 'array',
      label: 'Logros destacados',
      labels: { singular: 'Logro', plural: 'Logros' },
      fields: [{ name: 'texto', type: 'text', label: 'Logro', required: true }],
    },
  ],
}
