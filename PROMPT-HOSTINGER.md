# Prompt para Hostinger: Reproducir web AEIG Nostra Dona de la Salut

Copia y pega todo el contenido siguiente en la herramienta de Hostinger (o en cualquier asistente que deba entender y desplegar esta web) para que entienda el proyecto y pueda reproducirlo o desplegarlo correctamente.

---

## DESCRIPCIÓN DEL PROYECTO

Sitio web del **AEIG Nostra Dona de la Salut** (Agrupament Escolta). Web institucional en **catalán** con panel de administración de contenidos (Sanity CMS) para eventos y galería de fotos.

- **Nombre del proyecto:** agrupament-escolta-cau  
- **Idioma principal:** Catalán (ca)  
- **Repositorio de referencia:** https://github.com/bubujordi-crypto/AEIGNOSTRADONA  

---

## STACK TÉCNICO

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Fuente:** Google Font "Outfit"
- **CMS:** Sanity (headless) con Studio embebido en `/studio`
- **Email (formularios):** Resend API
- **Otras dependencias:** embla-carousel-react, lucide-react, react-countup, styled-components

---

## ESTRUCTURA DE RUTAS (App Router)

- **Layout raíz:** `app/layout.tsx` — solo `<html>`, `<body>`, fuente Outfit y `globals.css`. Sin navbar ni footer.
- **Route group (website):** `app/(website)/layout.tsx` — incluye Navbar, `<main>` y Footer. Todas las páginas públicas viven aquí.
- **Route group (studio):** `app/(studio)/layout.tsx` — layout mínimo a pantalla completa para Sanity Studio.

**Páginas públicas (bajo `(website)`):**

| Ruta | Descripción |
|------|-------------|
| `/` | Portada: carrusel hero, contadores, tarjetas de navegación |
| `/agrupament` | Sección Agrupament (subpáginas: historia, proposta-educativa, pea, simbologia, mes-info) |
| `/unitats` | Sección Unitats (subpáginas: info-pedagogica, edat, campaments, info, lema, caps) |
| `/consell` | Sección Consell (subpáginas: organitzacio, caps-i-queles, equips-i-carrecs) |
| `/esdeveniments` | Listado de eventos desde Sanity CMS (tarjetas con imagen, fecha, título, descripción) |
| `/galeria` | Galería de fotos desde Sanity (grid responsive, categorías: Campaments, Rutes, Cau, Altres) |
| `/calendari` | Calendario editable (auth con contraseña, actividades en API) |
| `/lloguer` | Formulario de solicitud de alquiler (envío por Resend) |
| `/contacte` | Página de contacto |

**Panel de administración:**

| Ruta | Descripción |
|------|-------------|
| `/studio` | Sanity Studio embebido (gestión de Esdeveniments y Fotos Galeria). Ruta catch-all: `(studio)/studio/[[...index]]/page.tsx` |

**APIs (app/api):**

- `POST /api/lloguer/contact` — Recibe formulario de lloguer y envía email con Resend.
- `POST /api/calendari/auth` — Autenticación del calendario (contraseña admin).
- `GET/POST /api/calendari/activities` — CRUD de actividades del calendario.

---

## CONFIGURACIÓN DE BUILD Y SERVIDOR

- **Instalación:** `npm install` (si hay conflictos de peer deps: `npm install --legacy-peer-deps`)
- **Desarrollo:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`
- **Producción:** `npm start`

**Next.js (next.config.js):**  
Habilitar imágenes remotas para: `images.unsplash.com`, `picsum.photos`, `cdn.sanity.io`.

---

## VARIABLES DE ENTORNO (.env.local o panel de Hostinger)

Configurar estas variables en el hosting:

```
# Calendario (admin)
CALENDARI_ADMIN_PASSWORD=CAU
CALENDARI_ADMIN_SECRET=cau-agrupament-escolta-secret-2024

# Resend (formulario lloguer/contacto)
RESEND_API_KEY=tu_clave_resend

# Sanity CMS (obligatorio para contenido y /studio)
NEXT_PUBLIC_SANITY_PROJECT_ID=v15dwrrq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

- Las que empiezan por `NEXT_PUBLIC_` deben estar disponibles en build y en el cliente.
- En Sanity.io (sanity.io/manage) hay que añadir el dominio de producción en **CORS origins** para que el Studio y las peticiones a la API funcionen.

---

## SANITY CMS

- **Config:** `sanity.config.ts` en raíz (reexporta `sanity/config.ts`).
- **Carpeta:** `sanity/` en la raíz del proyecto: `env.ts`, `config.ts`, `lib/client.ts`, `lib/image.ts`, `lib/queries.ts`, `schemas/`.
- **Schemas (catalán):**
  - **esdeveniment:** title, slug, date, mainImage (con alt), description.
  - **fotoGaleria:** title, image, category (Campaments | Rutes | Cau | Altres), date.
- **Consultas GROQ:** En `sanity/lib/queries.ts` (esdeveniments ordenados por fecha; fotos galeria ordenadas por fecha).
- **Imágenes:** Usar `urlFor()` de `sanity/lib/image.ts` y el componente `next/image` con dominios que incluyan `cdn.sanity.io`.

---

## COMPONENTES PRINCIPALES

- **Navbar:** Navegación con dropdowns y menú hamburguesa (responsive).
- **Footer:** Texto "AEIG Nostra Dona de la Salut", enlaces, etc.
- **HeroCarousel:** Carrusel (embla-carousel) en la portada.
- **CounterSection:** Contadores animados (react-countup).
- **NavCards:** Tarjetas de acceso a secciones.

---

## ESTILOS Y TEMA

- **Tailwind:** Colores personalizados en `tailwind.config`: `scout-green`, `scout-green-dark`, `scout-green-light`, `scout-gold`, `scout-gold-light`.
- **Fuente:** `--font-outfit` (variable CSS desde Next.js con Google Font Outfit).

---

## CÓMO REPRODUCIR O DESPLEGAR

1. Clonar o disponer del código del repositorio (o del proyecto Next.js descrito).
2. Instalar dependencias: `npm install --legacy-peer-deps` si es necesario.
3. Configurar todas las variables de entorno anteriores en el panel de Hostinger (o en `.env.local` en local).
4. En Sanity: crear proyecto con `projectId` y `dataset` indicados (o los que se usen) y añadir el dominio de producción en CORS.
5. Ejecutar `npm run build` y, en producción, `npm start` (o el comando que use Hostinger para Node/Next.js).
6. La web pública está en la raíz; el panel de contenidos en **https://tudominio.com/studio**.

Si Hostinger usa un flujo específico (por ejemplo solo estático o solo Node), adaptar: este proyecto necesita **Node.js** y **build de Next.js** (no es solo estático por el uso de API routes, Sanity y formularios).

---

*Fin del prompt. Con esta información se puede entender la estructura, stack, rutas, variables de entorno y requisitos para reproducir o desplegar la web en Hostinger.*
