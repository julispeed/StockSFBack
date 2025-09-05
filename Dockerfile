FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY wait-for-it.sh ./

# Dar permisos de ejecución al script
RUN chmod +x wait-for-it.sh

EXPOSE 3000

# Usamos bash para ejecutar el script
CMD ["bash", "db:3306", "--timeout=60", "--strict", "--", "npm", "start"]
