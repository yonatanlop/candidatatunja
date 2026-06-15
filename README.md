# Sitio web de campaña — Candidata a la Alcaldía

Sitio oficial construido con **Next.js 16 + Payload CMS 3 + PostgreSQL**, pensado para
que el equipo de campaña administre el contenido desde un panel en español, y preparado
para desplegarse en contenedores (Docker) en **Oracle Cloud Infrastructure (OCI)**.

## Secciones

- **Inicio** — presentación, propuestas destacadas, últimas noticias y próximas entrevistas.
- **Hoja de vida** — biografía, formación, experiencia y logros.
- **Propuestas** — listado por ejes y página de detalle.
- **Noticias** — listado paginado y artículo (con borrador/publicado).
- **Entrevistas** — realizadas (video de YouTube incrustado) y próximas (agenda).
- **Contacto** — formulario de contacto/voluntariado que guarda los registros en el panel.
- **Panel de administración** — en `/admin`.

## Stack

| Capa | Tecnología |
|------|-----------|
| Web + API | Next.js 16 (App Router), React 19, TypeScript |
| CMS / panel | Payload CMS 3 (embebido en Next.js) |
| Base de datos | PostgreSQL 16 |
| Estilos | Tailwind CSS 4 |
| Contenedores | Docker / Docker Compose |

---

## Desarrollo local

### Requisitos
- Node.js 20+ y npm
- Docker Desktop

### Puesta en marcha

```bash
# 1. Variables de entorno
cp .env.example .env        # ajusta PAYLOAD_SECRET si quieres

# 2. Base de datos (PostgreSQL en Docker, publicada en el puerto 5434 del host)
docker compose up -d db

# 3. Dependencias
npm install

# 4. Datos de ejemplo (crea el usuario admin y contenido de muestra)
npm run seed

# 5. Servidor de desarrollo (http://localhost:3001)
npm run dev
```

> El puerto del host de PostgreSQL es **5434** (configurado en `docker-compose.yml`) para
> no chocar con otros PostgreSQL instalados en la máquina. El puerto web de desarrollo es
> **3001** (`npm run dev`).

- Sitio: <http://localhost:3001>
- Panel: <http://localhost:3001/admin>
- Usuario de ejemplo (creado por `npm run seed`): `admin@campana.local` / `Campana2027!`
  **Cámbialo antes de publicar.**

### Opción todo-en-Docker (app + db)

```bash
docker compose up        # levanta la app y la base de datos juntas
```

### Comandos útiles

```bash
npm run dev               # desarrollo (puerto 3001)
npm run build             # compilación de producción
npm run start             # ejecutar la build
npm run lint              # ESLint
npm run seed              # cargar datos de ejemplo
npm run generate:types    # regenerar tipos de Payload tras cambiar colecciones
npm run generate:importmap # regenerar el import map del panel
```

---

## Modelo de contenido (panel)

- **Propuestas**, **Noticias**, **Entrevistas**, **Mensajes/Voluntarios** (colecciones).
- **Hoja de vida** y **Ajustes del sitio** (globales: nombre, lema, logo, redes, contacto).

El slug de propuestas y noticias se genera automáticamente desde el título.

---

## Despliegue en Oracle Cloud Infrastructure (OCI)

Pensado para una VM (p. ej. la capa **Always Free** con Ampere ARM) con Docker.

1. **Crear la instancia** (VM) en OCI con Ubuntu, abrir los puertos 80/443 en la
   *security list* / *NSG*, e instalar Docker y el plugin Compose.

2. **Clonar el proyecto** en la VM y crear un archivo `.env` con valores de producción:

   ```env
   PAYLOAD_SECRET=<cadena-larga-aleatoria>
   DB_PASSWORD=<contraseña-fuerte>
   NEXT_PUBLIC_SITE_URL=https://tudominio.co
   # Solo en el PRIMER despliegue, para crear el esquema sin migraciones:
   PAYLOAD_DB_PUSH=true
   ```

3. **Levantar en producción** (build de imagen + PostgreSQL):

   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

   La app queda en el puerto `3000` del contenedor. Tras el primer arranque exitoso,
   pon `PAYLOAD_DB_PUSH=false` y reinicia.

4. **Crear el primer usuario administrador**: entra a `https://tudominio.co/admin`
   (la primera visita permite registrar el usuario inicial).

5. **HTTPS y dominio**: coloca un proxy inverso (Caddy o Nginx) delante del contenedor
   para terminar TLS y servir en 80/443. Caddy obtiene certificados automáticamente.

6. **Persistencia**: las imágenes subidas viven en el volumen `media` y la base de datos
   en el volumen `pgdata` (ver `docker-compose.prod.yml`). Inclúyelos en tus respaldos.

> **Migraciones (recomendado para producción):** en lugar de `PAYLOAD_DB_PUSH`, genera
> migraciones con `npm run payload migrate:create` durante el desarrollo y aplícalas con
> `npm run payload migrate` en el arranque de producción.

### Evolución sugerida
- Mover el almacenamiento de imágenes a **OCI Object Storage** (compatible con S3).
- Configurar un adaptador de email (SMTP) para notificar los envíos del formulario.

---

## Estructura del proyecto

```
src/
├── app/(frontend)/      # páginas públicas del sitio
├── app/(payload)/       # panel de administración y API (generado por Payload)
├── collections/         # Propuestas, Noticias, Entrevistas, Contactos, Media, Users
├── globals/             # HojaDeVida, AjustesSitio
├── components/          # Header, Footer, tarjetas, YouTubeEmbed, etc.
├── lib/                 # utilidades (cliente Payload, formato, media)
├── fields/              # campo slug reutilizable
├── seed.ts              # datos de ejemplo
└── payload.config.ts    # configuración central de Payload
```
