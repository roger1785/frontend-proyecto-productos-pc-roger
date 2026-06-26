# Frontend Proyecto Productos PC

Aplicacion web de tienda online para explorar productos de computacion, filtrar catalogo, ver detalle, gestionar carrito y administrar productos.

## Stack

- React 19
- React Router DOM 7
- Vite
- CSS
- Vitest + Testing Library

## Scripts disponibles

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

Descripcion de scripts:

- `npm run dev`: inicia el frontend en modo desarrollo.
- `npm run build`: genera el build de produccion.
- `npm run preview`: levanta el build para probarlo en local.
- `npm run test`: ejecuta pruebas de componentes.
- `npm run lint`: revisa calidad de codigo con ESLint.

## Variables de entorno

Crear archivo `.env` en la raiz:

```env
VITE_API_URL=http://localhost:3000
```

Variable usada:

- `VITE_API_URL`: URL base del backend (auth, products, categories).

## Instalacion y ejecucion

1. Clona el repositorio.
2. Entra en la carpeta del proyecto.
3. Instala dependencias:

```bash
npm install
```

4. Configura `.env` con la URL de tu backend.
5. Inicia la app:

```bash
npm run dev
```

## Rutas principales

- `/`: inicio
- `/products`: catalogo de productos
- `/products/:id`: detalle de producto
- `/promotions`: productos en promocion
- `/offers`: ofertas (categoria gaming)
- `/cart`: carrito
- `/auth/register`: registro
- `/auth/login`: login
- `/admin`: dashboard admin
- `/admin/products`: gestion de productos (admin)

## Funcionalidades del frontend

### Home

- Muestra banner principal, categorias destacadas, carrusel y productos destacados.
- Desde categorias destacadas redirige al catalogo filtrado.

### Catalogo

- Lista productos con cards.
- Permite filtrar por:
  - texto (nombre/descripcion)
  - categoria
  - rango de precio
  - orden
- Si no hay resultados, muestra estado vacio.

### Detalle de producto

- Vista individual con imagen, descripcion, precio y stock.
- Boton para anadir al carrito.

### Carrito

- Agregar producto desde cards o detalle.
- Subir/bajar cantidad.
- Eliminar producto.
- Vaciar carrito.
- Calculo automatico de total.
- Persistencia en localStorage.

### Autenticacion

- Registro de usuario.
- Login de usuario.
- Logout.
- Guardado de token y usuario en localStorage.

### Administracion (admin)

- Acceso protegido por rol.
- Lista de productos en panel interno.
- Crear, editar y eliminar productos.
- Confirmacion de eliminacion en modal.

## Integracion con backend

Servicios que consume el frontend:

- Auth:
  - `POST /auth/register`
  - `POST /auth/login`

- Products:
  - `GET /products`
  - `GET /products/:id`
  - `POST /products` (admin)
  - `PUT /products/:id` (admin)
  - `DELETE /products/:id` (admin)

- Categories:
  - `GET /categories`

Comportamiento importante:

- El frontend soporta respuestas con IDs en `id` o `_id`.
- En operaciones admin envia token en `Authorization: Bearer <token>`.

## Resumen de permisos en frontend

- Publico:
  - Inicio, catalogo, detalle, promociones, ofertas, carrito, login y registro.

- Solo admin:
  - `/admin`
  - `/admin/products`

Si no hay sesion o no es admin, se redirige automaticamente.

## Estructura del proyecto

```text
src/
  assets/       recursos estaticos
  components/   componentes reutilizables
  context/      estado global (auth, cart, category)
  hooks/        hooks custom
  layouts/      layouts principal y admin
  loaders/      proteccion de rutas
  pages/        pantallas por ruta
  routes/       configuracion de rutas
  services/     llamadas al backend
  tests/        pruebas de componentes
  utils/        utilidades
```

## Testing

Comando:

```bash
npm run test
```

Actualmente hay pruebas para componentes clave del flujo de UI.

## Notas finales

- El proyecto esta preparado para seguir creciendo con checkout real y pagos.
- El flujo principal de compra y administracion ya esta implementado y funcional.
