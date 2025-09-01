# Guía de Deployment en Vercel

## 🚀 Configuración para Vercel

Tu proyecto ya está configurado para funcionar en Vercel. Sigue estos pasos para hacer el deploy:

### 1. Preparación

1. **Instalar Vercel CLI** (opcional):
   ```bash
   npm i -g vercel
   ```

2. **Crear cuenta en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con tu cuenta de GitHub

### 2. Variables de Entorno

Antes del deploy, necesitas configurar las variables de entorno en Vercel:

#### Variables Requeridas:
- `DATABASE_URL`: URL de tu base de datos PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (mínimo 32 caracteres)
- `NODE_ENV`: `production`
- `CORS_ORIGIN`: URL de tu frontend (ej: `https://tu-proyecto.vercel.app`)

#### Variables Opcionales:
- `VITE_API_URL`: URL de tu API (se configurará automáticamente)

### 3. Base de Datos

Para la base de datos, puedes usar:
- **Neon** (recomendado): [neon.tech](https://neon.tech)
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)

### 4. Deploy

#### Opción A: Desde GitHub (Recomendado)
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente la configuración
3. Configura las variables de entorno en el dashboard de Vercel
4. Haz el deploy

#### Opción B: Desde CLI
```bash
# En la raíz del proyecto
vercel

# Para producción
vercel --prod
```

### 5. Configuración Post-Deploy

1. **Configurar variables de entorno** en el dashboard de Vercel:
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega todas las variables mencionadas arriba

2. **Ejecutar migraciones** (si es necesario):
   - Puedes ejecutar las migraciones manualmente o
   - Configurar un script de post-deploy

### 6. Estructura del Proyecto

```
tu-proyecto/
├── api/
│   └── index.js          # Backend para Vercel
├── backend/              # Backend original
├── src/                  # Frontend React
├── vercel.json           # Configuración de Vercel
└── package.json          # Dependencias del frontend
```

### 7. URLs

Después del deploy, tendrás:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **API**: `https://tu-proyecto.vercel.app/api`

### 8. Troubleshooting

#### Error de conexión a la base de datos:
- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos permita conexiones externas

#### Error de CORS:
- Verifica que `CORS_ORIGIN` esté configurada con la URL correcta
- O usa `*` para desarrollo (no recomendado para producción)

#### Error de build:
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel

### 9. Comandos Útiles

```bash
# Ver logs en tiempo real
vercel logs

# Ver variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add DATABASE_URL

# Redeploy
vercel --prod
```

### 10. Monitoreo

- Usa el dashboard de Vercel para monitorear:
  - Performance
  - Errores
  - Logs
  - Analytics

### 11. Dominio Personalizado (Opcional)

1. Ve a Settings → Domains en Vercel
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

---

## ✅ Checklist de Deployment

- [ ] Variables de entorno configuradas
- [ ] Base de datos configurada y accesible
- [ ] Repositorio conectado a Vercel
- [ ] Deploy exitoso
- [ ] API funcionando (`/api/test-db`)
- [ ] Frontend funcionando
- [ ] Autenticación funcionando
- [ ] CORS configurado correctamente

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica las variables de entorno
3. Prueba la conexión a la base de datos
4. Revisa la configuración de CORS

¡Tu proyecto está listo para Vercel! 🎉
