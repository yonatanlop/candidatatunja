import type { CollectionConfig } from 'payload'

export const Sugerencias: CollectionConfig = {
  slug: 'sugerencias',
  labels: { singular: 'Sugerencia', plural: 'Buzón de sugerencias' },
  admin: {
    useAsTitle: 'sugerencia',
    defaultColumns: ['sugerencia', 'nombre', 'atendido', 'createdAt'],
    group: 'Campaña',
  },
  access: {
    // Cualquiera puede enviar; solo el equipo (autenticado) puede leer/editar.
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'sugerencia',
      type: 'textarea',
      label: 'Sugerencia',
      required: true,
    },
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre (opcional)',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo electrónico (opcional)',
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Teléfono (opcional)',
    },
    {
      name: 'atendido',
      type: 'checkbox',
      label: 'Atendida por el equipo',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
