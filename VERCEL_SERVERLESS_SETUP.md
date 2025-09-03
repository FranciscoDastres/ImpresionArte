# 🚀 Configuración del Backend Serverless en Vercel

## ✅ **Estado Actual:**
- ✅ Frontend optimizado (CSS reducido de 4MB a 11KB)
- ✅ Funciones serverless creadas para cada endpoint
- ✅ Configuración de Vercel actualizada
- ✅ Migración de base de datos simplificada

## 🔧 **Configuración en Vercel Dashboard:**

### **1. Variables de Entorno:**
Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

```
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_de_datos
JWT_SECRET=tu-clave-secreta-super-segura-para-jwt
CORS_ORIGIN=https://tu-proyecto.vercel.app
NODE_ENV=production
```

### **2. DATABASE_URL de Render:**
- Ve a tu base de datos en Render
- Settings → Connections
- Copia la "External Database URL"

### **3. JWT_SECRET:**
Genera una clave segura de al menos 32 caracteres:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📋 **Endpoints Disponibles:**

### **Productos:**
- `GET /api/productos` - Listar todos los productos
- `GET /api/producto?id=1` - Obtener producto por ID
- `POST /api/productos` - Crear producto (admin)
- `PUT /api/producto?id=1` - Editar producto (admin)
- `DELETE /api/producto?id=1` - Eliminar producto (admin)

### **Categorías:**
- `GET /api/categorias` - Listar todas las categorías

### **Productos Especiales:**
- `GET /api/productos/populares` - Productos con descuento
- `GET /api/productos/buscar?q=espada` - Buscar productos
- `GET /api/productos/categoria?categoria=armas-de-fantasia` - Por categoría

### **Autenticación:**
- `POST /api/auth` - Login/Register
  ```json
  {
    "action": "login",
    "email": "admin@demo.com",
    "password": "admin123"
  }
  ```

### **Test:**
- `GET /api/test-db` - Probar conexión a base de datos

## 🚀 **Deploy:**

### **1. Commit y Push:**
```bash
git add .
git commit -m "Add: Backend serverless functions for Vercel"
git push
```

### **2. En Vercel:**
- El deploy se hará automáticamente
- Verifica que todas las funciones se creen correctamente

### **3. Verificar Funcionamiento:**
- Test de base de datos: `https://tu-proyecto.vercel.app/api/test-db`
- Listar productos: `https://tu-proyecto.vercel.app/api/productos`
- Listar categorías: `https://tu-proyecto.vercel.app/api/categorias`

## 🔍 **Troubleshooting:**

### **Error: "Cannot find module 'pg'":**
- Asegúrate de que `pg` esté en `package.json` (ya está)

### **Error: "relation does not exist":**
- La migración se ejecutará automáticamente en la primera llamada
- Verifica que `DATABASE_URL` esté configurada correctamente

### **Error de CORS:**
- Verifica que `CORS_ORIGIN` esté configurada
- O usa `*` temporalmente para desarrollo

### **Error de JWT:**
- Verifica que `JWT_SECRET` esté configurada
- Debe tener al menos 32 caracteres

## 📊 **Credenciales de Demo:**

### **Usuario Admin:**
- Email: `admin@demo.com`
- Password: `admin123`

### **Base de Datos:**
- Se creará automáticamente con:
  - 5 categorías predefinidas
  - 5 productos de ejemplo
  - 1 usuario admin

## 🎯 **Próximos Pasos:**

1. **Configurar variables de entorno en Vercel**
2. **Hacer deploy**
3. **Verificar que la API funcione**
4. **Conectar frontend con la nueva API**
5. **Probar todas las funcionalidades**

## 💡 **Ventajas de esta Configuración:**

- ✅ **Gratis** - Sin costos mensuales
- ✅ **Escalable** - Serverless automático
- ✅ **Integrado** - Mismo dominio que el frontend
- ✅ **Rápido** - Sin cold starts para APIs simples
- ✅ **Seguro** - Variables de entorno protegidas

---

**¡Tu e-commerce estará completamente funcional en Vercel!** 🚀
