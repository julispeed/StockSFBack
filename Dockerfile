# Imagen base de Node.js
FROM node:18

# Crear y entrar al directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para arrancar la app
CMD ["node", "index.js"]
