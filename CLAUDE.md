# CLAUDE.md

## Proyecto

Tienda en línea de hongos medicinales, con identidad de marca **Mr Fungi** (estética urbana/streetwear neón). Frontend SPA — el backend corre separado en `http://localhost:8080/api`.

## Comandos

```bash
pnpm dev        # servidor de desarrollo (puerto 5173)
pnpm build      # compilación de producción
pnpm lint       # ESLint
```

## Convenciones

- **Idioma de commits**: español, corto y conciso, sin co-autoría
- **Alias de rutas**: usar siempre `@/` en vez de rutas relativas (`@/components/ui/button`)
- **Componentes shadcn**: instalar con `pnpm dlx shadcn@latest add <componente>` — van a `src/components/ui/`
- **Gestión de paquetes**: solo `pnpm`, nunca `npm` ni `yarn`
- **Estilos**: Tailwind CSS v4, sin CSS-in-JS ni módulos CSS

## Identidad visual (Mr Fungi)

Definida en `src/index.css` (`@theme`). El logo está en `public/mr-fungi-logo.png` (fondo transparente, uso general) y `public/mr-fungi-logo-dark.png`.

- **Paleta**: `--color-ink` `#0b0b0f` · `--color-magenta` `#f82888` · `--color-mint` `#02e4b7` · paper `#f7f6f8`. En shadcn, `--primary` = magenta, `--secondary` = mint.
- **Tokens `brand-*`**: remapeados a la nueva paleta (no eliminar) para que las páginas recoloreen solas — nunca reintroducir verde.
- **Tipografía**: Syne (display, `--font-heading`) + Space Grotesk (cuerpo, `--font-sans`), vía `@import` de Google Fonts.
- **Utilidades de marca** (en `index.css`): `.fungi-sticker` (borde ink + sombra dura desplazada), `.fungi-neon`, `.fungi-marquee`, `.fungi-dots`, `.fungi-kicker`, `.fungi-gradient-text`.
- Un `border`/`border-2` sin color es gris por defecto (base layer); usar `border-ink` explícito para el look sticker.
- Marcos oscuros (nav/hero/footer) enmarcan contenido claro y legible.

## Arquitectura

```
src/services/   # clientes HTTP con Axios — un archivo por dominio
src/context/    # estado global con React Context (Auth, Cart)
src/types/      # todos los tipos e interfaces en index.ts
src/schemas/    # validaciones Zod, usadas con react-hook-form
src/pages/      # una página por ruta; admin bajo AdminPages/
```

## Autenticación

- JWT almacenado en `localStorage`
- El token se inyecta automáticamente en cada request via interceptor en `src/services/api.ts`
- El usuario se decodifica del JWT con `jwt-decode` al hacer login — no viene de un endpoint separado
- Roles: `ADMIN` | `CLIENT` (definidos en `src/types/UserRole.ts`)

## Tipos importantes

- `Order.status`: `PENDING` | `PAID` | `CANCELLED`
- `AuthContextType.login` recibe solo el token (`string`) — el `User` se construye internamente desde el JWT

## Herramientas de calidad

- **ESLint**: Airbnb style guide (flat config) + typescript-eslint + react + jsx-a11y
- **Prettier**: single quotes, sin semicolons, trailing commas ES5, ancho 100
- **Format on save**: configurado en `.vscode/settings.json`
