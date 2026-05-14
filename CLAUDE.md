# CLAUDE.md

## Proyecto

Tienda en línea de hongos medicinales. Frontend SPA — el backend corre separado en `http://localhost:8080/api`.

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
