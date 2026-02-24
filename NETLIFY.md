# Despliegue en Netlify

El proyecto está preparado para desplegarse en Netlify con el plugin oficial de Next.js.

## 1. Conectar el repositorio

- Entra en [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**.
- Conecta tu cuenta de GitHub/GitLab y selecciona el repositorio del proyecto.
- Netlify detectará Next.js y usará el `netlify.toml` del repositorio.

## 2. Variables de entorno

En **Site settings** → **Environment variables** añade:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `CALENDARI_ADMIN_PASSWORD` | Contraseña admin del calendario | CAU |
| `CALENDARI_ADMIN_SECRET` | Secret para auth del calendario | cau-agrupament-escolta-secret-2024 |
| `RESEND_API_KEY` | API key de Resend (formularios) | re_xxxxx |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto Sanity | v15dwrrq |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset de Sanity | production |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versión API Sanity | 2024-01-01 |

Las que empiezan por `NEXT_PUBLIC_` deben estar definidas también en **Build** para que el build las tenga.

## 3. Sanity CORS

En [sanity.io/manage](https://www.sanity.io/manage) → tu proyecto → **API** → **CORS origins**:

- Añade la URL de tu sitio en Netlify, por ejemplo: `https://tu-sitio.netlify.app`
- Para desarrollo local: `http://localhost:3000`

## 4. Build

- **Build command:** `npm run build` (ya viene en `netlify.toml`).
- **Node version:** 20 (definido en `netlify.toml` y `.nvmrc`).
- El plugin `@netlify/plugin-nextjs` se instala automáticamente; no hace falta añadirlo a `package.json`.

## 5. Después del deploy

- Web: `https://tu-sitio.netlify.app`
- Panel de contenidos (Sanity Studio): `https://tu-sitio.netlify.app/studio`

Si el build falla por dependencias, Netlify ya usa `NPM_FLAGS = "--legacy-peer-deps"` definido en `netlify.toml`.
