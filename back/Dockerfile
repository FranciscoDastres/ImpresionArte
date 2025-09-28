FROM node:22-alpine
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./
RUN npm install --production

# Copia el resto del backend
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
