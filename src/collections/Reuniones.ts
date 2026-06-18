import type { CollectionConfig } from 'payload'

export const Reuniones: CollectionConfig = {
  slug: 'reuniones',
  labels: { singular: 'Reunión', plural: 'Reuniones solicitadas' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'lugar', 'fechaHora', 'estado'],
    group: 'Campaña',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: 'fechaHora',
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de quien solicita',
      required: true,
    },
    {
      name: 'lugar',
      type: 'text',
      label: 'Lugar donde se realizaría',
      required: true,
    },
    {
      name: 'fechaHora',
      type: 'date',
      label: 'Fecha y hora',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' },
      },
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      defaultValue: 'solicitada',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Solicitada', value: 'solicitada' },
        { label: 'Confirmada', value: 'confirmada' },
        { label: 'Rechazada', value: 'rechazada' },
      ],
    },
    {
      name: 'nota',
      type: 'textarea',
      label: 'Nota / motivo (opcional)',
    },
  ],
}
