# 🚀 Guía Completa de Despliegue - E-commerce

## 📋 Arquitectura del Proyecto
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Base de datos**: Render PostgreSQL

## 🎯 Resumen del Despliegue Exitoso

✅ **Backend**: https://backend-impresionarte.onrender.com  
✅ **Frontend**: https://impresion-arte.vercel.app  
✅ **Base de datos**: PostgreSQL en Render  
✅ **Estado**: Funcionando completamente  

---

## 🔧 Paso 1: Preparar el Backend para Render

### 1.1 Configurar package.json
```json
{
  "scripts": {
    "start": "node migrate.js && node index.js",
    "dev": "nodemon index.js",
    "migrate": "node migrate.js"
  }
}
```

### 1.2 Configurar conexión a base de datos (db.js)
```javascript
const { Pool } = require("pg");
require("dotenv").config();

// Usar DATABASE_URL si está disponible, sino usar configuración individual
const config = process.env.DATABASE_URL 
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    };

const pool = new Pool(config);
module.exports = pool;
```

### 1.3 Crear Dockerfile para el backend
```dockerfile
# Usar Node.js 18 como imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
```

### 1.4 Crear .dockerignore
```
node_modules
npm-debug.log
.env
.env.local
.env.example
.git
.gitignore
README.md
Dockerfile
.dockerignore
```

---

## 🗄️ Paso 2: Crear Base de Datos en Render

### 2.1 Crear servicio PostgreSQL
1. **Ve a [render.com](https://render.com)**
2. **Haz clic en "New +"**
3. **Selecciona "PostgreSQL"**
4. **Configura:**
   - **Name**: `impresionarte-db`
   - **Database**: `impresionarte`
   - **User**: `impresionarte_user`

### 2.2 Obtener credenciales
1. **Ve a tu servicio PostgreSQL**
2. **Ve a "Settings" → "Connections"**
3. **Copia la URL de conexión externa**

---

## ⚙️ Paso 3: Desplegar Backend en Render

### 3.1 Crear Web Service
1. **Ve a [render.com](https://render.com)**
2. **Haz clic en "New +"**
3. **Selecciona "Web Service"**
4. **Conecta tu repositorio de GitHub**

### 3.2 Configurar el servicio
- **Name**: `backend-impresionarte`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: `Node`

### 3.3 Configurar variables de entorno
```
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_de_datos
DB_HOST=tu-host.render.com
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu-clave-secreta-super-segura
PORT=3001
NODE_ENV=production
```

### 3.4 Ejecutar migración
El script `start` ahora ejecuta automáticamente:
```bash
node migrate.js && node index.js
```

---

## 🌐 Paso 4: Desplegar Frontend en Vercel

### 4.1 Conectar repositorio
1. **Ve a [vercel.com](https://vercel.com)**
2. **Importa tu repositorio de GitHub**
3. **Vercel detectará automáticamente** que es un proyecto React

### 4.2 Configurar variables de entorno
1. **Ve a "Settings" → "Environment Variables"**
2. **Agrega:**
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```

### 4.3 Configurar API service (src/services/api.js)
```javascript
// URL base de la API - cambiar en producción
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## 🔗 Paso 5: Conectar Frontend con Backend

### 5.1 Verificar que el backend funciona
- **Health check**: https://tu-backend.onrender.com/
- **API productos**: https://tu-backend.onrender.com/api/productos
- **API categorías**: https://tu-backend.onrender.com/api/categorias

### 5.2 Verificar que el frontend funciona
- **Frontend**: https://tu-app.vercel.app
- **Debería mostrar** productos y categorías desde la base de datos

---

## 🛠️ Solución de Problemas Comunes

### Error: SSL/TLS required
**Solución**: Agregar configuración SSL en db.js
```javascript
ssl: {
  rejectUnauthorized: false
}
```

### Error: relation "productos" does not exist
**Solución**: Ejecutar migración automáticamente
```json
"start": "node migrate.js && node index.js"
```

### Error: localhost:3001 connection refused
**Solución**: Configurar VITE_API_URL en Vercel
```
VITE_API_URL=https://tu-backend.onrender.com/api
```

### Error: DATABASE_URL mal configurada
**Solución**: Usar URL completa con usuario y contraseña
```
postgresql://usuario:contraseña@host:puerto/base_de_datos
```

---

## 📊 URLs Finales del Proyecto

- **Frontend**: https://impresion-arte.vercel.app
- **Backend**: https://backend-impresionarte.onrender.com
- **API**: https://backend-impresionarte.onrender.com/api

---

## 💰 Costos del Despliegue

- **Render**: $7/mes (incluye backend + base de datos)
- **Vercel**: Gratis para proyectos personales
- **Total**: $7/mes para el proyecto completo

---

## 🎯 Lecciones Aprendidas

### ✅ Lo que funcionó bien:
1. **Render** es excelente para Node.js + PostgreSQL
2. **Vercel** es perfecto para React/Vite
3. **SSL es obligatorio** para PostgreSQL en Render
4. **La migración debe ejecutarse** al iniciar el backend
5. **Las variables de entorno** son cruciales

### ⚠️ Problemas comunes:
1. **SSL/TLS required** - Agregar configuración SSL
2. **Tablas no existen** - Ejecutar migración automáticamente
3. **localhost en frontend** - Configurar VITE_API_URL
4. **URL de base de datos incompleta** - Incluir usuario y contraseña

### 🔧 Configuraciones clave:
1. **DATABASE_URL** con SSL
2. **Script start** con migración
3. **Variables de entorno** en ambos servicios
4. **Root Directory** en Render

---

## 🚀 Para Futuros Proyectos

### Checklist de Despliegue:
- [ ] Configurar package.json con migración automática
- [ ] Configurar db.js con SSL
- [ ] Crear base de datos PostgreSQL en Render
- [ ] Configurar variables de entorno en backend
- [ ] Desplegar backend en Render
- [ ] Configurar VITE_API_URL en Vercel
- [ ] Desplegar frontend en Vercel
- [ ] Verificar que todo funciona

### Comandos útiles:
```bash
# Verificar conexión a base de datos
curl https://tu-backend.onrender.com/test-db

# Verificar API
curl https://tu-backend.onrender.com/api/productos

# Verificar frontend
curl https://tu-app.vercel.app
```

---

## 🎉 ¡Despliegue Exitoso!

Tu e-commerce está completamente desplegado y funcionando:
- ✅ Backend con base de datos
- ✅ Frontend conectado
- ✅ APIs funcionando
- ✅ Productos cargándose desde la base de datos

**¡Felicidades por el despliegue exitoso!** 🚀 