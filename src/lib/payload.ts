import { getPayload } from 'payload'
import config from '@/payload.config'

/** Devuelve una instancia de Payload lista para consultar (cacheada por proceso). */
export const getClient = async () => getPayload({ config: await config })
