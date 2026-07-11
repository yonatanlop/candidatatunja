import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Propuestas } from './collections/Propuestas'
import { Noticias } from './collections/Noticias'
import { Entrevistas } from './collections/Entrevistas'
import { Contactos } from './collections/Contactos'
import { Sugerencias } from './collections/Sugerencias'
import { TestigosElectorales } from './collections/TestigosElectorales'
import { Reuniones } from './collections/Reuniones'
import { HojaDeVida } from './globals/HojaDeVida'
import { AjustesSitio } from './globals/AjustesSitio'
import { Estadisticas } from './globals/Estadisticas'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
// Orígenes permitidos para CORS/CSRF: el dominio y su variante con www.
const origenesPermitidos = Array.from(
  new Set([siteUrl, siteUrl.replace('://', '://www.')]),
)

export default buildConfig({
  serverURL: siteUrl,
  // Restringe qué orígenes pueden llamar a la API y hacer peticiones autenticadas.
  cors: origenesPermitidos,
  csrf: origenesPermitidos,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Campaña',
    },
  },
  collections: [
    Propuestas,
    Noticias,
    Entrevistas,
    Contactos,
    Sugerencias,
    TestigosElectorales,
    Reuniones,
    Media,
    Users,
  ],
  globals: [HojaDeVida, AjustesSitio, Estadisticas],
  editor: lexicalEditor(),
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // En desarrollo Payload sincroniza el esquema automáticamente (push).
    // En producción se usan migraciones; para el primer despliegue se puede
    // forzar el push con PAYLOAD_DB_PUSH=true.
    push: process.env.PAYLOAD_DB_PUSH === 'true' ? true : undefined,
  }),
  sharp,
  plugins: [],
})
