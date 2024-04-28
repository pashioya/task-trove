import AccessTokenController from '@/controller/access-token';
import AuthTokenController from '@/controller/auth-token-test';
import { ResponseStatus } from '@/enums/api';
import { Application, Request, Response } from 'express';

const routes = (app: Application) => {
  app.get('/', (_req: Request, res: Response) =>
    res.status(ResponseStatus.OK).json('OAuth Server is running!'),
  );
  // ! SWITCH BACK TO NONE TEST CONTROLLER
  app.get('/auth-token', AuthTokenController);
  app.post('/access-token', AccessTokenController);
};

export default routes;
