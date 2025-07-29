# 🚀 Guía de Despliegue - E-commerce

## 📋 Arquitectura del Proyecto
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + Express)
- **Base de datos**: Railway PostgreSQL

## 🔧 Paso 1: Desplegar Backend en Railway

### 1.1 Crear cuenta en Railway
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta con GitHub
3. Haz clic en "New Project"

### 1.2 Conectar repositorio
1. Selecciona "Deploy from GitHub repo"
2. Busca y selecciona tu repositorio
3. Railway detectará automáticamente que es un proyecto Node.js

### 1.3 Configurar variables de entorno
En Railway, ve a la pestaña "Variables" y agrega:

```env
# Base de datos (se configurará después)
DB_HOST=
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT Secret (cambia esto por una clave segura)
JWT_SECRET=tu-clave-secreta-super-segura-aqui-123456789

# Puerto del servidor
PORT=3001

# Entorno
NODE_ENV=production
```

## 🗄️ Paso 2: Configurar Base de Datos en Railway

### 2.1 Agregar servicio PostgreSQL
1. En tu proyecto de Railway, haz clic en "New Service"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente una base de datos

### 2.2 Conectar backend con la base de datos
1. Ve a la pestaña "Variables" de tu servicio backend
2. Railway habrá agregado automáticamente las variables de la base de datos
3. Verifica que tengas estas variables:
   - `DATABASE_URL` (Railway la agrega automáticamente)
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`

### 2.3 Ejecutar migración
1. Ve a la pestaña "Deployments" de tu backend
2. Haz clic en "Deploy" para ejecutar la migración
3. O ejecuta manualmente: `npm run migrate:prod`

## 🌐 Paso 3: Configurar Frontend en Vercel

### 3.1 Variables de entorno en Vercel
1. Ve a tu proyecto en Vercel
2. Ve a "Settings" → "Environment Variables"
3. Agrega:
   ```
   VITE_API_URL=https://tu-backend.railway.app/api
   ```

### 3.2 Re-desplegar frontend
1. Haz un commit y push a tu repositorio
2. Vercel se desplegará automáticamente

## ✅ Paso 4: Verificar el Despliegue

### 4.1 Probar backend
- URL: `https://tu-backend.railway.app`
- Debería mostrar: `{"message":"Backend funcionando correctamente","timestamp":"..."}`

### 4.2 Probar API
- URL: `https://tu-backend.railway.app/api/productos`
- Debería devolver un array de productos

### 4.3 Probar frontend
- Tu URL de Vercel debería cargar correctamente
- Los productos deberían aparecer desde la base de datos

## 🔧 Troubleshooting

### Error de conexión a la base de datos
- Verifica que las variables de entorno estén correctas
- Asegúrate de que la base de datos esté creada en Railway

### Error de CORS
- El backend ya tiene CORS configurado para aceptar todas las origenes

### Error de migración
- Verifica que la base de datos esté activa
- Revisa los logs en Railway

## 📊 URLs Finales
- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-backend.railway.app`
- **API**: `https://tu-backend.railway.app/api`

## 💰 Costos
- **Railway**: $5/mes de crédito gratuito (suficiente para proyectos pequeños)
- **Vercel**: Gratis para proyectos personales
- **Total**: $0/mes para proyectos pequeños 

## 🔗 Conectar Frontend (Vercel) con Backend (Render)

### Paso 1: Obtener la URL de tu backend en Render

1. **Ve a tu dashboard de Render**
2. **Busca la URL de tu servicio** (algo como `https://tu-backend.onrender.com`)
3. **Copia esa URL**

### Paso 2: Configurar la variable de entorno en Vercel

1. **Ve a tu proyecto en Vercel**
2. **Ve a "Settings" → "Environment Variables"**
3. **Agrega esta variable:**

```
VITE_API_URL=https://tu-backend.onrender.com/api
```

**Nota**: Reemplaza `tu-backend.onrender.com` con la URL real de tu backend en Render.

### Paso 3: Re-desplegar el frontend

1. **Haz un commit y push** a tu repositorio
2. **Vercel se desplegará automáticamente** con la nueva configuración

##  Verificar la conexión

Una vez configurado, tu frontend debería:
- ✅ Cargar productos desde la base de datos
- ✅ Mostrar las categorías
- ✅ Funcionar la búsqueda

## ¿Ya tienes la URL de tu backend en Render?

**Dime:**
- ¿Cuál es la URL de tu backend en Render?
- ¿Ya llegaste a la configuración de variables de entorno en Vercel?

Una vez que me confirmes, te ayudo a configurar todo paso a paso. 

## 🔍 El problema:

Tu frontend está usando la URL local (`localhost:3001`) en lugar de la URL de Render. Esto indica que la variable `VITE_API_URL` no está configurada correctamente en Vercel.

## 🔧 Solución con Render (no Railway):

### Paso 1: Verificar la variable de entorno en Vercel

1. **Ve a tu proyecto en Vercel**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Selecciona tu proyecto** `impresion-arte`
3. **Ve a "Settings" → "Environment Variables"**
4. **Verifica que tengas exactamente:**
   ```
   VITE_API_URL=https://backend-impresionarte.onrender.com/api
   ```

### Paso 2: Si no está configurada, agrégala

Si no ves la variable, agrégala:
- **Name**: `VITE_API_URL`
- **Value**: `https://backend-impresionarte.onrender.com/api`
- **Environment**: `Production`

### Paso 3: Re-desplegar

Una vez que agregues la variable:
1. **Haz un commit y push** a tu repositorio
2. **Vercel se desplegará automáticamente**

## 🤔 ¿Ya configuraste la variable de entorno en Vercel?

**La variable debe ser exactamente:**
```
VITE_API_URL=https://backend-impresionarte.onrender.com/api
```

¿Ya llegaste a la configuración de variables de entorno en Vercel? Si no sabes cómo llegar ahí, te guío paso a paso.

**¿Ya agregaste la variable `VITE_API_URL` en Vercel?** 

### Paso 2: Agregar base de datos PostgreSQL en Render

1. **Ve a tu dashboard de Render**
2. **Haz clic en "New +"**
3. **Selecciona "PostgreSQL"**
4. **Configura:**
   - **Name**: `impresionarte-db`
   - **Database**: `impresionarte`
   - **User**: `impresionarte_user`

### Paso 3: Conectar el backend con la base de datos

Una vez creada la base de datos:
1. **Ve a tu servicio backend en Render**
2. **Ve a "Settings" → "Environment Variables"**
3. **Agrega estas variables** (Render las proporcionará automáticamente):
   ```
   DATABASE_URL=postgresql://...
   DB_HOST=...
   DB_PORT=5432
   DB_NAME=impresionarte
   DB_USER=impresionarte_user
   DB_PASSWORD=...
   ```

### Paso 4: Ejecutar la migración

Una vez conectada la base de datos:
1. **Ve a tu servicio backend en Render**
2. **Ve a "Manual Deploy"**
3. **Haz clic en "Deploy latest commit"**

### Paso 5: Configurar el frontend

Una vez que el backend funcione:
1. **Ve a tu proyecto en Vercel**
2. **Ve a "Settings" → "Environment Variables"**
3. **Agrega:**
   ```
   VITE_API_URL=https://backend-impresionarte.onrender.com/api
   ```

## 🤔 ¿Ya creaste la base de datos PostgreSQL en Render?

**Dime:**
- ¿Ya agregaste el servicio PostgreSQL en Render?
- ¿Ya conectaste el backend con la base de datos?

Una vez que me confirmes, te ayudo con los siguientes pasos. 