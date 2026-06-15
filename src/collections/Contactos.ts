import type { CollectionConfig } from 'payload'

export const Contactos: CollectionConfig = {
  slug: 'contactos',
  labels: { singular: 'Mensaje / Voluntario', plural: 'Mensajes y voluntarios' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'email', 'esVoluntario', 'createdAt'],
    group: 'Campaña',
  },
  access: {
    // Cualquiera puede enviar el formulario; solo el equipo (autenticado) puede leer/editar.
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo electrónico',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Teléfono',
    },
    {
      name: 'esVoluntario',
      type: 'checkbox',
      label: 'Quiere ser voluntario/a',
      defaultValue: false,
    },
    {
      name: 'mensaje',
      type: 'textarea',
      label: 'Mensaje',
    },
    {
      name: 'atendido',
      type: 'checkbox',
      label: 'Atendido por el equipo',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
