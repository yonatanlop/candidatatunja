# Imagen de PRODUCCIÓN para Next.js + Payload CMS.
# Build multi-stage: instala dependencias, compila y ejecuta con `next start`.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 1) Dependencias
FROM base AS deps
# Se copia .npmrc para que npm ci use la misma configuración (legacy-peer-deps)
# con la que se generó el package-lock.json y no falle por "desincronización".
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# 2) Compilación
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# PAYLOAD_SECRET y DATABASE_URL se necesitan en build sólo de forma nominal;
# valores reales se inyectan en tiempo de ejecución.
ENV PAYLOAD_SECRET=build-time-placeholder
# Las variables NEXT_PUBLIC_* se incrustan al compilar, así que la URL del sitio
# debe llegar como build-arg (el .env de runtime no basta para estas).
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# 3) Ejecución
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copiamos la app compilada y las dependencias completas (Payload las necesita en runtime).
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Carpeta de subidas (media). Se monta como volumen en compose.
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
