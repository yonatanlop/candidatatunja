import type { GlobalConfig } from 'payload'

export const Estadisticas: GlobalConfig = {
  slug: 'estadisticas',
  label: 'Estadísticas de visitas',
  admin: { group: 'Campaña' },
  access: {
    read: ({ req }) => !!req.user,
    update: () => false,
  },
  fields: [
    {
      name: 'totalVisitas',
      type: 'number',
      label: 'Total de visitas',
      defaultValue: 0,
      admin: {
        description: 'Se incrementa automáticamente con cada visita al sitio. No editar manualmente.',
        readOnly: true,
      },
    },
  ],
}
