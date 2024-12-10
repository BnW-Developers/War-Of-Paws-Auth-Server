FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

COPY .dockerenv .env

EXPOSE ${PORT}

CMD ["node", "src/server.js"]