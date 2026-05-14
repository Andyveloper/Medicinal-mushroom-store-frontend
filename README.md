# Medicinal Mushroom Store — Frontend

Tienda en línea de hongos medicinales. SPA construida con React 19, TypeScript 6 y Vite 8.

## Stack

- **React 19** + React Compiler habilitado
- **TypeScript 6**
- **Vite 8**
- **Tailwind CSS v4**
- **shadcn/ui** (Radix UI)
- **React Router DOM v7**
- **React Hook Form** + **Zod**
- **Axios**
- **Stripe** (pagos)

## Requisitos

- Node.js 18+
- pnpm

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

La app corre en `http://localhost:5173`. El backend debe estar en `http://localhost:8080`.

## Build

```bash
pnpm build
```

## Linting

```bash
pnpm lint
```

## Estructura

```
src/
├── components/ui/     # Componentes shadcn + Navbar
├── context/           # AuthContext, CartContext
├── pages/
│   ├── AdminPages/    # AdminOrdersPage, AdminProductsPage
│   └── ...            # CatalogPage, DetailPage, CartPage, CheckoutPage, OrdersPage, LoginPage, RegisterPage
├── schemas/           # Validaciones Zod (auth, product)
├── services/          # Clientes HTTP: api, auth, order, product, payment
└── types/             # Tipos globales, OrderStatus, UserRole
```

## Rutas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Catálogo de productos |
| `/products/:id` | Público | Detalle de producto |
| `/login` | Público | Inicio de sesión |
| `/register` | Público | Registro |
| `/cart` | Público | Carrito |
| `/orders` | Autenticado | Mis órdenes |
| `/checkout/:orderId` | Autenticado | Pago con Stripe |
| `/admin/products` | Admin | Gestión de productos |
| `/admin/orders` | Admin | Gestión de órdenes |

## Variables de entorno

No se requiere `.env` por defecto. La URL base del API está definida en `src/services/api.ts` (`http://localhost:8080/api`).
