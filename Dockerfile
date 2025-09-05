FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .



EXPOSE 3000


CMD ["./wait-for-it.sh", "db:3306", "--timeout=60", "--strict", "--", "npm", "start"]
