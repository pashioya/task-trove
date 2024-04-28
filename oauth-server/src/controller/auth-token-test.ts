import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import { Storage } from '@mondaycom/apps-sdk';
import { ResponseStatus } from '@/enums/api';
import { env } from '@/env';
import * as console from 'node:console';

const AuthTokenController = async (req: Request, res: Response) => {
  console.log('Authorization token:', req.query);
  const accessToken = env.ACCESS_TOKEN;
  const retrievedAccessToken = accessToken;

  // Create a new storage object
  const storage = new Storage(accessToken);

  // generate a small key to store the access token in storage
  const generatedKey = (Math.random() + 1).toString(36).substring(8);

  const jwtSecret = env.JWT_SECRET;

  // generate a temporary code that expires in 1 hour
  const generatedToken = jwt.sign({ retrievedAccessToken }, jwtSecret, {
    expiresIn: '1h',
  });

  const { success, error } = await storage.set(generatedKey, retrievedAccessToken);
  if (!success) {
    console.error('Failed to store access token:', error);
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to store access token',
    });
  }

  return res.redirect(
    'http://localhost:8081/buffer/?token=' + generatedToken + '&key=' + generatedKey,
  );
};
export default AuthTokenController;
