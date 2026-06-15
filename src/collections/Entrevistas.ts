import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Entrevistas: CollectionConfig = {
  slug: 'entrevistas',
  labels: { singular: 'Entrevista', plural: 'Entrevistas' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'medio', 'fecha', 'estado'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-fecha',
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    slugField('titulo'),
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'realizada',
      admin: {
        position: 'sidebar',
        description: '"Realizada" muestra el video; "Próxima" se muestra en la agenda.',
      },
      options: [
        { label: 'Realizada', value: 'realizada' },
        { label: 'Próxima', value: 'proxima' },
      ],
    },
    {
      name: 'medio',
      type: 'text',
      label: 'Medio / programa',
      required: true,
      admin: { description: 'Ej.: Caracol Radio, Noticias RCN, Canal local...' },
    },
    {
      name: 'fecha',
      type: 'date',
      label: 'Fecha y hora',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' },
      },
    },
    {
      name: 'urlVideo',
      type: 'text',
      label: 'URL del video (YouTube)',
      admin: {
        description:
          'Pega el enlace de YouTube de la entrevista realizada. Se incrusta automáticamente.',
        condition: (data) => data?.estado === 'realizada',
      },
    },
    {
      name: 'enlaceTransmision',
      type: 'text',
      label: 'Enlace de la transmisión (opcional)',
      admin: {
        description: 'Para entrevistas próximas: dónde se podrá ver en vivo.',
        condition: (data) => data?.estado === 'proxima',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
    },
  ],
}
