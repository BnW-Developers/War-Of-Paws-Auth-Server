import { config } from './config/config.js';
import express from 'express';
import router from './routes/index.router.js';
import errorHandlerMiddleware from './middlewares/error-handling.middleware.js';
import { initServer } from './init/initServer.js';

const app = express();

app.use(express.json());
app.use('/', router);
app.use(errorHandlerMiddleware);

initServer().then(() => {
  app.listen(config.server.port, config.server.host, () => {
    console.log(`SERVER ON - ${config.server.host}:${config.server.port}`);
  });
});
