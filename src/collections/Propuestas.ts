import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Propuestas: CollectionConfig = {
  slug: 'propuestas',
  labels: { singular: 'Propuesta', plural: 'Propuestas' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'eje', 'orden'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'orden',
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    slugField('titulo'),
    {
      name: 'eje',
      type: 'select',
      label: 'Eje / categoría',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Educación', value: 'educacion' },
        { label: 'Seguridad', value: 'seguridad' },
        { label: 'Salud', value: 'salud' },
        { label: 'Empleo y economía', value: 'empleo' },
        { label: 'Movilidad e infraestructura', value: 'movilidad' },
        { label: 'Medio ambiente', value: 'ambiente' },
        { label: 'Cultura y deporte', value: 'cultura' },
        { label: 'Gobierno y transparencia', value: 'gobierno' },
        { label: 'Otro', value: 'otro' },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Las propuestas se muestran de menor a mayor número.',
      },
    },
    {
      name: 'icono',
      type: 'text',
      label: 'Emoji o ícono (opcional)',
      admin: { position: 'sidebar', description: 'Ej.: 📚, 🚓, 🌳' },
    },
    {
      name: 'resumen',
      type: 'textarea',
      label: 'Resumen corto',
      required: true,
      admin: { description: 'Una o dos frases que se muestran en el listado.' },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen (opcional)',
    },
    {
      name: 'contenido',
      type: 'richText',
      label: 'Desarrollo de la propuesta',
    },
  ],
}
