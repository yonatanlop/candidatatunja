import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario del panel', plural: 'Usuarios del panel' },
  admin: {
    useAsTitle: 'email',
    group: 'Campaña',
  },
  auth: true,
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
    },
  ],
}
