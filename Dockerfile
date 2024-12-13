FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

COPY .dockerenv .env

EXPOSE ${PORT}

CMD ["node", "src/server.js"]