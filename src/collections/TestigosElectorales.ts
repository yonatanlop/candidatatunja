import type { CollectionConfig } from 'payload'

export const TestigosElectorales: CollectionConfig = {
  slug: 'testigos-electorales',
  labels: { singular: 'Testigo electoral', plural: 'Testigos electorales' },
  admin: {
    useAsTitle: 'nombreCompleto',
    defaultColumns: ['nombreCompleto', 'tipoDocumento', 'numeroDocumento', 'celular', 'atendido'],
    group: 'Campaña',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'nombreCompleto',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'tipoDocumento',
      type: 'select',
      label: 'Tipo de documento',
      required: true,
      defaultValue: 'CC',
      options: [
        { label: 'Cédula de ciudadanía (CC)', value: 'CC' },
        { label: 'Cédula de extranjería (CE)', value: 'CE' },
        { label: 'Tarjeta de identidad (TI)', value: 'TI' },
        { label: 'Pasaporte', value: 'PA' },
      ],
    },
    {
      name: 'numeroDocumento',
      type: 'text',
      label: 'Número de documento',
      required: true,
    },
    {
      name: 'celular',
      type: 'text',
      label: 'Número de celular',
      required: true,
    },
    {
      name: 'atendido',
      type: 'checkbox',
      label: 'Contactado por el equipo',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
