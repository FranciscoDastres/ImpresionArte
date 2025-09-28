# Usa la imagen base ligera y segura
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los package.json desde /back y instala dependencias
COPY back/package*.json ./
RUN npm install --production

# Copia el resto del código fuente backend
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]