# Impresionarte Backend

Este proyecto es el backend de Impresionarte, hecho con Node.js y Express.

## Scripts útiles (`package.json`)

- `"dev"`: Inicia el backend en modo desarrollo con autorestart usando **nodemon**
- `"start"`: Ejecuta el backend para producción (usa Node.js plano, sin reinicio automático)
- `"test-db"`: Prueba la conexión a la base de datos con el script `lib/test-db.js`

## Dependencias esenciales

- **bcrypt:** Hasheo de contraseñas para usuarios (seguridad)
- **cors:** Permite llamadas cross-origin entre backend y frontend
- **dotenv:** Carga variables de entorno desde `.env`
- **express:** Framework principal del servidor backend
- **jsonwebtoken:** Manejo de JWT para autenticación segura
- **pg:** Conexión con base de datos PostgreSQL

## Notas

- Las dependencias de frontend (react, vite, tailwind, etc.) NO están en este backend.
- Agrega nuevos scripts o dependencias aquí y explica para qué sirven si el proyecto crece.

