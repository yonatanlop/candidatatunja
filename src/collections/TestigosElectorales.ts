import type { CollectionConfig } from 'payload'
import { PUESTOS_VOTACION } from '../lib/puestosVotacion'

export const TestigosElectorales: CollectionConfig = {
  slug: 'testigos-electorales',
  labels: { singular: 'Testigo electoral', plural: 'Testigos electorales' },
  admin: {
    useAsTitle: 'nombreCompleto',
    defaultColumns: [
      'nombreCompleto',
      'numeroDocumento',
      'celular',
      'puestoVotacion',
      'contactado',
    ],
    group: 'Campaña',
    components: {
      // Botón para descargar el reporte en Excel (CSV) encima de la lista.
      beforeListTable: ['/components/admin/ExportarTestigos#ExportarTestigos'],
    },
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
      label: 'Nombres y apellidos completos',
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
      name: 'puestoVotacion',
      type: 'select',
      label: 'Puesto de votación',
      required: true,
      options: PUESTOS_VOTACION,
    },
    {
      name: 'contactado',
      type: 'select',
      label: 'Contactado por el equipo',
      defaultValue: 'no',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Sí', value: 'si' },
        { label: 'No', value: 'no' },
      ],
    },
  ],
}
