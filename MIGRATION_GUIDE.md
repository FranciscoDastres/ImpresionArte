# Guía de Migración a Base de Datos

## 🎯 Objetivo
Migrar todos los productos hardcodeados en los componentes React a una base de datos PostgreSQL.

## 📋 Pasos Completados

### ✅ Backend
- [x] Configuración de Express y PostgreSQL
- [x] Rutas API para productos y categorías
- [x] Esquema de base de datos (`schema.sql`)
- [x] Script de migración (`migrate.js`)

### ✅ Frontend
- [x] Servicio API (`src/services/api.js`)
- [x] Hooks personalizados (`src/hooks/useProductos.js`)
- [x] Componente PopularProducts actualizado
- [x] Página ProductDetail actualizada
- [x] Componente RelatedProducts actualizado

## 🚀 Pasos para Ejecutar la Migración

### 1. Configurar Variables de Entorno
Crea un archivo `.env` en la carpeta `backend/` con las credenciales de tu base de datos:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

### 2. Ejecutar la Migración
```bash
cd backend
npm run migrate
```

### 3. Iniciar el Backend
```bash
cd backend
npm run dev
```

### 4. Iniciar el Frontend
```bash
npm run dev
```

## 📊 Estructura de la Base de Datos

### Tabla: categorias
- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR)
- `descripcion` (TEXT)
- `icono` (VARCHAR)
- `color_fondo` (VARCHAR)
- `color_icono` (VARCHAR)

### Tabla: productos
- `id` (SERIAL PRIMARY KEY)
- `titulo` (VARCHAR)
- `precio` (DECIMAL)
- `precio_anterior` (DECIMAL)
- `descripcion` (TEXT)
- `descuento` (VARCHAR)
- `imagen_principal` (VARCHAR)
- `imagenes_adicionales` (TEXT[])
- `categoria_id` (FOREIGN KEY)
- `stock` (INTEGER)
- `activo` (BOOLEAN)

## 🔄 Próximos Pasos

### ✅ Componentes Migrados Completamente
- [x] `PopularProducts` - Productos dinámicos por categoría
- [x] `ProductDetail` - Detalle de producto con API
- [x] `RelatedProducts` - Productos relacionados dinámicos
- [x] `CategoryCards` - Categorías dinámicas de la API
- [x] `HeroSection` - Slider con productos destacados
- [x] `Header` - Navegación dinámica por categorías
- [x] `ProductList` - Página completa de listado con filtros

### Funcionalidades Adicionales
- [ ] Búsqueda de productos
- [ ] Filtros por precio, categoría, etc.
- [ ] Paginación
- [ ] Carrito de compras con base de datos
- [ ] Sistema de usuarios y pedidos

## 🐛 Solución de Problemas

### Error de Conexión a la Base de Datos
1. Verifica que PostgreSQL esté corriendo
2. Confirma las credenciales en `.env`
3. Asegúrate de que la base de datos existe

### Error CORS
Si tienes problemas de CORS, verifica que el backend esté corriendo en el puerto 3001.

### Productos No Aparecen
1. Verifica que la migración se ejecutó correctamente
2. Revisa la consola del navegador para errores de API
3. Confirma que el backend esté respondiendo en `/api/productos`

## 📝 Notas Importantes

- Los productos ahora usan IDs numéricos en lugar de títulos para las URLs
- Las imágenes se almacenan como URLs en la base de datos
- El sistema maneja estados de carga y error automáticamente
- Los hooks personalizados facilitan la reutilización del código

## 🎉 Beneficios de la Migración

1. **Escalabilidad**: Fácil agregar nuevos productos sin tocar código
2. **Mantenibilidad**: Datos centralizados en la base de datos
3. **Rendimiento**: Consultas optimizadas y paginación
4. **Flexibilidad**: Filtros, búsqueda y categorización dinámica
5. **Consistencia**: Datos uniformes en toda la aplicación 