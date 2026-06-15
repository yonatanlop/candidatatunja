import type { Field } from 'payload'

/** Convierte un texto en un slug apto para URL (sin tildes, espacios ni símbolos). */
export const slugify = (value: string): string =>
  value
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // quita tildes/diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // todo lo que no sea alfanumérico -> guion
    .replace(/^-+|-+$/g, '') // quita guiones de los extremos

/**
 * Campo "slug" que se autocompleta a partir de otro campo (por defecto "titulo")
 * si el usuario lo deja vacío. Editable manualmente en el panel.
 */
export const slugField = (sourceField = 'titulo'): Field => ({
  name: 'slug',
  type: 'text',
  label: 'Slug (URL)',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Se genera automáticamente desde el título si se deja vacío.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return slugify(value as string)
        const source = data?.[sourceField]
        if (typeof source === 'string' && source.length > 0) return slugify(source)
        return value
      },
    ],
  },
})
