import 'dotenv/config'
import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'

/** Crea contenido enriquecido (Lexical) a partir de uno o varios párrafos de texto. */
const richText = (parrafos: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: parrafos.map((texto) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        { type: 'text', text: texto, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
      ],
    })),
  },
})
const parrafo = (texto: string) => richText([texto])

async function seed() {
  const payload = await getPayload({ config: await config })

  // Usuario administrador del panel
  const email = 'admin@campana.local'
  const existentes = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existentes.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password: 'Campana2027!', nombre: 'Administrador' },
    })
    payload.logger.info(`Usuario admin creado: ${email} / Campana2027!`)
  }

  // Ajustes del sitio
  await payload.updateGlobal({
    slug: 'ajustes-sitio',
    data: {
      nombreSitio: 'Nohora Cano',
      lema: 'Gobernanza responsable: un plan técnico, auditable y transparente para Tunja.',
      redes: {
        facebook: 'https://www.facebook.com/share/1FYXXSvK5r/',
        instagram: 'https://www.instagram.com/nohorakano',
        tiktok: 'https://www.tiktok.com/@nohoracano',
      },
      contacto: {
        email: 'contacto@nohoracano.co',
        telefono: '333 6491044',
        direccion: 'Calle 24 # 10a-21, Tunja, Boyacá',
      },
      textoPie: 'Comité de campaña — Nohora Cano, Tunja 2027',
    },
  })

  // Foto de la candidata (se sube a Media una sola vez)
  const altFoto = 'Nohora Milena Cano Fonseca'
  let fotoId: number | undefined
  const fotoExistente = await payload.find({
    collection: 'media',
    where: { alt: { equals: altFoto } },
    limit: 1,
  })
  if (fotoExistente.docs.length > 0) {
    fotoId = fotoExistente.docs[0].id
  } else {
    try {
      const creada = await payload.create({
        collection: 'media',
        data: { alt: altFoto },
        filePath: path.resolve('FotoCandidata.jpeg'),
      })
      fotoId = creada.id
      payload.logger.info('Foto de la candidata subida a Media.')
    } catch (e) {
      payload.logger.warn(`No se pudo subir la foto (FotoCandidata.jpeg): ${(e as Error).message}`)
    }
  }

  // Hoja de vida (datos reales de la candidata)
  await payload.updateGlobal({
    slug: 'hoja-de-vida',
    data: {
      nombreCompleto: 'Nohora Milena Cano Fonseca',
      cargoAspirado: 'Candidata a la Alcaldía de Tunja',
      ...(fotoId ? { foto: fotoId } : {}),
      biografia: richText([
        'Nacida en la ciudad de Tunja, hija de padres tunjanos comerciantes. Abogada de la Universidad Santo Tomás de Tunja, especialista en Derecho Administrativo y en Derecho Penal y Procesal Penal, y Doctora en Derecho de la Universidad Sergio Arboleda (summa cum laude).',
        'Su tesis doctoral, “Alcance de la supervisión de los servicios de inteligencia y contrainteligencia del Estado Constitucional Colombiano”, refleja su compromiso con la institucionalidad y el Estado de derecho.',
        'Cuenta con amplia experiencia en lo público: fue Secretaria de Gobierno de Tunja, apoyó la Secretaría de Educación, Cultura y Turismo y la Lotería de Boyacá, y ha sido docente universitaria por más de 10 años. Es fundadora del Laboratorio de Política Pública de Tunja.',
      ]),
      formacion: [
        { titulo: 'Doctora en Derecho (summa cum laude)', institucion: 'Universidad Sergio Arboleda' },
        { titulo: 'Especialista en Derecho Penal y Procesal Penal', institucion: 'Universidad Santo Tomás' },
        { titulo: 'Especialista en Derecho Administrativo', institucion: 'Universidad Santo Tomás' },
        { titulo: 'Abogada', institucion: 'Universidad Santo Tomás de Tunja' },
      ],
      experiencia: [
        {
          cargo: 'Secretaria de Gobierno de Tunja',
          organizacion: 'Alcaldía de Tunja',
          descripcion: 'Gestión gubernamental y articulación institucional del municipio.',
        },
        {
          cargo: 'Apoyo a la Secretaría de Educación, Cultura y Turismo',
          organizacion: 'Lotería de Boyacá',
        },
        {
          cargo: 'Asesora del programa anticontrabando',
          organizacion: 'Federación Nacional de Departamentos (FND)',
        },
        {
          cargo: 'Defensora Pública en materia penal',
          organizacion: 'Defensoría del Pueblo',
          periodo: '3 años',
        },
        { cargo: 'Asesora del Concejo Municipal', organizacion: 'Concejo de Tunja' },
        {
          cargo: 'Docente universitaria (más de 10 años)',
          organizacion: 'U. Juan de Castellanos, U. Santo Tomás, UPTC y Escuelas de Carabineros ESVEL y ESREY',
        },
        {
          cargo: 'Fundadora',
          organizacion: 'Laboratorio de Política Pública de Tunja',
        },
      ],
      logros: [
        { texto: 'Autora del libro “Ética de lo público”.' },
        { texto: 'Autora de artículos académicos sobre derecho comparado y derecho público.' },
        { texto: 'Investigadora en seguridad humana y securitización.' },
        { texto: 'Autora de “Derecho Canónico y Estado: convergencias estructurales y protección de los derechos fundamentales”.' },
      ],
    },
  })

  // Propuestas — Plan de Gobierno "Gobernanza Responsable 2026-2027"
  const propuestas = [
    {
      titulo: 'Desarrollo Social y Educativo',
      eje: 'educacion',
      icono: '🎓',
      orden: 1,
      resumen:
        'Salud, atención a la población vulnerable y consolidación de Tunja como capital estudiantil del país (45% de la inversión).',
      contenido: richText([
        'El eje central del plan: invertir en la gente. Consolidamos a Tunja como capital estudiantil articulando universidad, empresa y Estado para erradicar el desempleo juvenil.',
        'Empleo joven: Mesa de Articulación Universitaria, laboratorios de innovación social, microcréditos y beneficios tributarios para empresas que contraten egresados locales. Meta 2027: 1.000 nuevos empleos formales y apoyo a 200 emprendimientos.',
        'Rescate sanitario: gestión para la reapertura de mínimo 2 servicios de salud especializados, reducción del 20% en quejas por suministro de medicamentos y creación del Programa Municipal de Atención Geriátrica “Edad de Oro”.',
      ]),
    },
    {
      titulo: 'Movilidad y Transporte',
      eje: 'movilidad',
      icono: '🚦',
      orden: 2,
      resumen:
        'Recuperación de la malla vial abandonada y reordenamiento del tránsito para una ciudad conectada (20% de la inversión).',
      contenido: richText([
        'Orden urbano e infraestructura para una movilidad segura y eficiente.',
        'Plan de Choque Inmediato: intervención y pavimentación prioritaria de 20 km en vías críticas y accesos de las 8 comunas, además de la modernización de la señalización.',
        'Soberanía del Tránsito: restitución de la competencia de tránsito al Municipio de Tunja. Implementación de “La Ruta Rosa”, un sistema de transporte público pensado para la seguridad integral de las mujeres, y revisión técnica de rutas.',
      ]),
    },
    {
      titulo: 'Seguridad y Convivencia',
      eje: 'seguridad',
      icono: '🚓',
      orden: 3,
      resumen:
        'Recuperación del orden público con presencia institucional, tecnología y prevención del delito.',
      contenido: richText([
        'El 88,4% de los ciudadanos percibe el hurto como el delito principal: la respuesta requiere institucionalidad, no improvisación.',
        'Respuesta operativa: Consejos de Seguridad semanales y operativos interinstitucionales de dispersión del crimen. Metas: reducir 15% el hurto a personas y 10% el hurto de celulares.',
        'Recuperación del espacio público mediante la activación cultural y deportiva del Centro Histórico y los parques, y planes de estímulo a la fuerza pública con convenios con universidades.',
      ]),
    },
    {
      titulo: 'Sostenibilidad y Economía Verde',
      eje: 'ambiente',
      icono: '🌳',
      orden: 4,
      resumen:
        'Reducción de la pobreza, turismo patrimonial, economía creativa y modernización ambiental (20% de la inversión).',
      contenido: richText([
        'Identidad y economía verde: aprovechar el patrimonio de Tunja como motor de desarrollo sostenible.',
        'Desarrollo de senderos ecológico-culturales que conecten el patrimonio urbano con la sostenibilidad ambiental, y fomento de la economía creativa (artistas, maestros y galerías de arte).',
        'Creación del rol de “Gestores Culturales e Históricos” y articulación con el POT para proteger el suelo, modernizar la gestión del relleno de Pirgua y fomentar emprendimientos verdes.',
      ]),
    },
    {
      titulo: 'Gobernanza Transparente',
      eje: 'gobierno',
      icono: '🏛️',
      orden: 5,
      resumen:
        'Cuentas claras y eficiencia: digitalización, anticorrupción y saneamiento financiero del municipio (10% de la inversión).',
      contenido: richText([
        'Una administración basada en datos, con cero improvisación, liderada por la experiencia y la ética.',
        'Digitalización y control: creación de un Portal Digital de Acceso Ciudadano con la meta del 100% de contratos publicados y una Línea Anónima Anticorrupción.',
        'Saneamiento financiero: organización de la contabilidad municipal, inclusión del superávit real y optimización de trámites para reducir los tiempos de respuesta en un 30%.',
      ]),
    },
  ]
  for (const p of propuestas) {
    const yaExiste = await payload.find({
      collection: 'propuestas',
      where: { titulo: { equals: p.titulo } },
      limit: 1,
    })
    if (yaExiste.docs.length === 0) {
      await payload.create({ collection: 'propuestas', data: p })
    } else {
      await payload.update({ collection: 'propuestas', id: yaExiste.docs[0].id, data: p })
    }
  }

  // Noticias de ejemplo (se editan/eliminan desde el panel)
  const noticias = [
    {
      titulo: 'Lanzamiento del plan “Gobernanza Responsable 2026-2027”',
      resumen: 'Presentamos un plan técnico, auditable y transparente para la recuperación de Tunja.',
    },
    {
      titulo: 'Encuentro con la comunidad educativa',
      resumen: 'Dialogamos con docentes y estudiantes sobre Tunja como capital estudiantil.',
    },
  ]
  for (const n of noticias) {
    const yaExiste = await payload.find({
      collection: 'noticias',
      where: { titulo: { equals: n.titulo } },
      limit: 1,
    })
    if (yaExiste.docs.length === 0) {
      await payload.create({
        collection: 'noticias',
        data: {
          ...n,
          fecha: new Date().toISOString(),
          _status: 'published',
          contenido: parrafo('Cuerpo de la noticia. Edita este contenido desde el panel de administración.'),
        },
      })
    }
  }

  // Entrevistas de ejemplo
  const entrevistas = [
    {
      titulo: 'Entrevista sobre el plan de seguridad',
      medio: 'Caracol Radio',
      estado: 'realizada' as const,
      fecha: new Date(Date.now() - 7 * 864e5).toISOString(),
      urlVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      descripcion: 'Hablamos sobre la recuperación del orden público en Tunja.',
    },
    {
      titulo: 'Debate de candidatos',
      medio: 'Canal Regional',
      estado: 'proxima' as const,
      fecha: new Date(Date.now() + 5 * 864e5).toISOString(),
      enlaceTransmision: 'https://www.youtube.com/',
      descripcion: 'Debate abierto sobre las propuestas para Tunja.',
    },
  ]
  for (const e of entrevistas) {
    const yaExiste = await payload.find({
      collection: 'entrevistas',
      where: { titulo: { equals: e.titulo } },
      limit: 1,
    })
    if (yaExiste.docs.length === 0) {
      await payload.create({ collection: 'entrevistas', data: e })
    }
  }

  payload.logger.info('✅ Datos cargados correctamente.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
