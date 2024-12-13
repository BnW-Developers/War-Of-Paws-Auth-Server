import { config } from './config/config.js';
import express from 'express';
import router from './routes/index.router.js';
import errorHandlerMiddleware from './middlewares/error-handling.middleware.js';
import { initServer } from './init/initServer.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'https://html-classic.itch.zone',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization',
  }),
);

app.use(express.json());
app.use('/', router);
app.use(errorHandlerMiddleware);

initServer().then(() => {
  app.listen(config.server.port, config.server.host, () => {
    console.log(`SERVER ON - ${config.server.host}:${config.server.port}`);
  });
});
