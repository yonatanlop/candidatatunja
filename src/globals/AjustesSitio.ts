import type { GlobalConfig } from 'payload'

export const AjustesSitio: GlobalConfig = {
  slug: 'ajustes-sitio',
  label: 'Ajustes del sitio',
  admin: { group: 'Campaña' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombreSitio',
      type: 'text',
      label: 'Nombre del sitio / campaña',
      required: true,
      defaultValue: 'Campaña por Tunja',
    },
    {
      name: 'lema',
      type: 'text',
      label: 'Lema / eslogan',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      type: 'collapsible',
      label: 'Redes sociales',
      fields: [
        {
          name: 'redes',
          type: 'group',
          label: false,
          fields: [
            { name: 'facebook', type: 'text', label: 'Facebook (URL)' },
            { name: 'instagram', type: 'text', label: 'Instagram (URL)' },
            { name: 'x', type: 'text', label: 'X / Twitter (URL)' },
            { name: 'tiktok', type: 'text', label: 'TikTok (URL)' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contacto',
      fields: [
        {
          name: 'contacto',
          type: 'group',
          label: false,
          fields: [
            { name: 'email', type: 'email', label: 'Correo de contacto' },
            { name: 'telefono', type: 'text', label: 'Teléfono' },
            { name: 'direccion', type: 'text', label: 'Dirección sede' },
          ],
        },
      ],
    },
    {
      name: 'textoPie',
      type: 'text',
      label: 'Texto del pie de página',
      admin: { description: 'Ej.: Comité de campaña — Tunja 2027' },
    },
  ],
}
