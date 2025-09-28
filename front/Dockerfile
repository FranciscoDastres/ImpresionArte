# Imagen base ligera para frontend JS
FROM node:22-alpine

WORKDIR /app

# Instalación de dependencias
COPY package*.json ./
RUN npm install --production

# Copia todo el código del frontend
COPY . .

# Build de la app (usa npm run build para React, Vite, etc.)
RUN npm run build

# Usa un server de archivos estáticos (sirve la build)
# Usando static-server, sirve dist o build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]  # usa "build" para React
