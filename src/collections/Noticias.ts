import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Noticias: CollectionConfig = {
  slug: 'noticias',
  labels: { singular: 'Noticia', plural: 'Noticias' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'fecha', '_status'],
    group: 'Contenido',
  },
  access: {
    // Solo se muestran al público las noticias publicadas.
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: { equals: 'published' },
      }
    },
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
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
      name: 'fecha',
      type: 'date',
      label: 'Fecha de publicación',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'portada',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'resumen',
      type: 'textarea',
      label: 'Resumen / entradilla',
      required: true,
      admin: { description: 'Texto breve que aparece en el listado y al compartir.' },
    },
    {
      name: 'contenido',
      type: 'richText',
      label: 'Cuerpo de la noticia',
      required: true,
    },
  ],
}
