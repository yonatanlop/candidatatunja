import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario del panel', plural: 'Usuarios del panel' },
  admin: {
    useAsTitle: 'email',
    group: 'Campaña',
  },
  auth: {
    // Bloqueo tras 5 intentos fallidos durante 10 minutos (anti fuerza bruta).
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
    },
  ],
}
