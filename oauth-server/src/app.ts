import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './env';
import routes from './routes/routes';
const app = express();

app.use(
  express.json(),
  /** Express middleware */
  cors({
    origin: '*',
  }),
  helmet(), // security-related HTTP headers
);

app.disable('x-powered-by');

routes(app);

app.listen(env.PORT, () => console.log('Starting ExpressJS server on Port ' + env.PORT));

export default app;
