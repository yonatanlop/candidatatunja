import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Medios' },
  admin: { group: 'Campaña' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      admin: { description: 'Describe la imagen (accesibilidad y SEO).' },
    },
  ],
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    focalPoint: true,
  },
}
