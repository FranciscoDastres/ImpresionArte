# Usa la imagen base ligera, segura y actual
FROM node:22-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los manifests y instala dependencias
COPY package*.json ./
RUN npm install --production

# Copia el resto del código
COPY . .

# Expon el puerto de tu app
EXPOSE 3000

# Comando principal
CMD ["npm", "start"]
