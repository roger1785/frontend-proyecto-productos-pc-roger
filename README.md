# Frontend Proyecto Productos PC

Aplicación web desarrollada con React para gestionar catálogo de productos, carrito de compra, autenticación y panel de administración.

---

# Características

- Catálogo de productos con filtros y búsqueda
- Vista de detalle por producto
- Carrito con persistencia en localStorage
- Registro e inicio de sesión
- Protección de rutas de administración
- CRUD de productos desde panel admin
- Secciones de promociones y ofertas
- Tests de componentes con Vitest

---

# 🛠 Tecnologías utilizadas

- React
- React Router DOM
- Vite
- CSS
- Vitest
- Testing Library
- ESLint

---

# Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd frontend-proyecto-productos-pc-roger
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando como referencia `.env.example` (si lo tienes) o directamente con este formato.

## .env.example

```env
VITE_API_URL=
```

## Ejemplo

```env
VITE_API_URL=http://localhost:3000
```

---

# Ejecutar en desarrollo

```bash
npm run dev
```

---

# Ejecutar en producción

```bash
npm run build
npm run preview
```

---

# Ejecutar tests

```bash
npm run test
```

---

# Cargar datos iniciales

En este frontend no hay seeder propio.
Los datos iniciales se gestionan en el backend conectado por `VITE_API_URL`.

---

# Endpoints

---

## Home

### GET /

Ruta principal del frontend.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Vista de inicio cargada correctamente"
}
```

---

# Autenticación

## Registro

### POST /auth/register

Registra un nuevo usuario (consumido desde frontend).

### Body

```json
{
  "name": "Roger",
  "email": "roger@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "message": "Usuario registrado correctamente"
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "El correo no es válido"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

## Login

### POST /auth/login

Inicia sesión y devuelve token + usuario.

### Body

```json
{
  "email": "roger@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "...",
    "name": "Roger",
    "email": "roger@example.com"
  }
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales inválidas"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

# Productos

## Obtener todos los productos

### GET /products

Devuelve los productos para el catálogo.

### Respuesta Exitosa

#### Status: 200 OK

```json
[
  {
    "_id": "...",
    "name": "Teclado mecánico",
    "price": 89.99,
    "stock": 10,
    "image": "https://..."
  }
]
```

#### Status: 500 Internal Server Error

```json
{
  "message": "No se pudieron cargar los productos"
}
```

---

## Obtener producto por ID

### GET /products/:id

Devuelve un producto por su ID.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "Teclado mecánico",
  "description": "Switch blue",
  "price": 89.99,
  "stock": 10,
  "image": "https://..."
}
```

### Posibles Errores

#### Status: 404 Not Found

```json
{
  "message": "Contenido no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

## Crear producto

### POST /products

Requiere autenticación de admin.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "name": "Mouse Gamer X",
  "category": "<categoryId>",
  "description": "Mouse ergonómico",
  "price": 59.9,
  "stock": 10,
  "image": "https://...",
  "featured": false
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "_id": "...",
  "name": "Mouse Gamer X",
  "price": 59.9,
  "stock": 10
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 422 Unprocessable Entity

```json
{
  "message": "Datos inválidos"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

## Actualizar producto

### PUT /products/:id

Requiere autenticación de admin.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "Mouse Gamer X Pro",
  "price": 69.9,
  "stock": 8
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Producto no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

## Eliminar producto

### DELETE /products/:id

Requiere autenticación de admin.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Producto eliminado correctamente"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Producto no encontrado"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error en la petición"
}
```

---

# Deploy

Frontend ejecutado en entorno local con Vite.

```txt
http://localhost:5173
```

---

# Estructura del proyecto

```txt
src/
│
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── loaders/
├── pages/
├── routes/
├── services/
├── tests/
│
└── utils/
```

---

# Autor

Proyecto desarrollado como práctica/entrega del Bootcamp Full Stack de Neoland.

Autor: Roger
