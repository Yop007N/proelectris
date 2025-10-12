# Proelectris

## Descripcion

Sistema de gestion de inventario y clientes para una empresa electrica. Permite administrar productos, clientes y sus relaciones a traves de una interfaz web moderna.

## Stack Tecnologico

### Backend
- Node.js con TypeScript
- Express.js - Framework web
- Sequelize - ORM para PostgreSQL
- PostgreSQL - Base de datos
- CORS habilitado para comunicacion con frontend

### Frontend
- React 18 con TypeScript
- React Router DOM - Enrutamiento
- Axios - Cliente HTTP
- Create React App - Configuracion base

## Estructura del Proyecto

```
proelectris/
├── backend/           # API REST con Express y Sequelize
│   ├── src/
│   │   ├── config/    # Configuracion de base de datos
│   │   ├── models/    # Modelos Sequelize (Cliente, Producto, ClienteProducto)
│   │   ├── routes/    # Rutas de la API
│   │   └── controllers/ # Controladores de logica de negocio
│   └── package.json
├── front/             # Aplicacion React
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Paginas de la aplicacion
│   │   └── services/   # Servicios de API
│   └── package.json
└── proelectris.postman_collection.json  # Coleccion de endpoints para testing
```

## Modelos de Datos

### Cliente
- ID, nombre, direccion, telefono, email
- RUC (Registro Unico de Contribuyentes)
- CI (Cedula de Identidad)

### Producto
- ID, nombre, descripcion, codigo
- Precio

### ClienteProducto
- Relacion many-to-many entre clientes y productos

## Instalacion

### Prerequisitos
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### Backend

```bash
cd backend
npm install

# Configurar variables de entorno (crear archivo .env)
# DATABASE_URL=postgresql://user:password@localhost:5432/proelectris
# PORT=3000

# Ejecutar migraciones si es necesario
npm run build
npm start
```

### Frontend

```bash
cd front
npm install
npm start
```

## Uso

### Desarrollo

**Backend** (Puerto 3000):
```bash
cd backend
npm run dev
```

**Frontend** (Puerto 3000 default de React):
```bash
cd front
npm start
```

### API Endpoints

La coleccion de Postman incluida (`proelectris.postman_collection.json`) contiene todos los endpoints disponibles:

- `GET /api/clientes` - Listar todos los clientes
- `POST /api/clientes` - Crear nuevo cliente
- `GET /api/productos` - Listar todos los productos
- `POST /api/productos` - Crear nuevo producto
- Endpoints adicionales para relaciones cliente-producto

### Base de Datos

Se incluyen dumps SQL para restaurar datos de ejemplo:
- `dump-proelectris-202307241000.sql`
- `dump-proelectris-202307241001`

Para restaurar:
```bash
psql -U postgres -d proelectris < dump-proelectris-202307241000.sql
```

## Produccion

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd front
npm run build
# Servir la carpeta build/ con un servidor web (nginx, apache, etc)
```

## Testing

Importar `proelectris.postman_collection.json` en Postman para probar todos los endpoints de la API.

## Licencia

MIT

## Autor

Desarrollado para gestion de inventario y clientes en el sector electrico.
