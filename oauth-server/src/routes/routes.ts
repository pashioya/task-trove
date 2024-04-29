import AccessTokenController from '@/controller/access-token';
import AuthTokenController from '@/controller/auth-token-prod';
import { ResponseStatus } from '@/enums/api';
import { Application, Request, Response } from 'express';

const routes = (app: Application) => {
  app.get('/', (_req: Request, res: Response) =>
    res.status(ResponseStatus.OK).json('OAuth Server is running!'),
  );
  // ! Remove Test Controller ASAP
  app.get('/auth-token', AuthTokenController);
  app.post('/access-token', AccessTokenController);
};

export default routes;
