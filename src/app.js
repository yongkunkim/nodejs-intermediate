import express from 'express';
import { router } from './routers/index.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';
import { needSignin } from './middlewares/need-signin.middleware.js';
import { SERVER_PORT } from '../constants/app.constant.js';
import { apiRouter } from './routers/index.js';

const app = express();
app.use(express.json());
app.use(needSignin);
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
