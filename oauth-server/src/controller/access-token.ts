import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ResponseStatus } from '@/enums/api';
import { env } from '@/env';
import { Storage } from '@mondaycom/apps-sdk';

const AccessTokenController = async (req: Request, res: Response) => {
  // Get the authorization header
  const temporaryCode = req.body.temporary_code;
  const storageKey = req.body.storage_key;

  if (!temporaryCode || !storageKey) {
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: 'Missing temporary code',
    });
  }

  const jwtSecret = env.JWT_SECRET;

  try {
    jwt.verify(temporaryCode, jwtSecret);
  } catch (error) {
    console.error('Error verifying temporary code:', error);
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: 'Invalid temporary code',
    });
  }

  // get the main access token from env variables
  const accessToken = env.ACCESS_TOKEN;

  const storage = new Storage(accessToken);

  const { success, error, value } = await storage.get(storageKey);

  if (!success) {
    console.error('Error retrieving temporary code:', error);
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: 'Invalid temporary code',
    });
  } else {
    console.log('Retrieved access token:', value);

    const { success, error } = await storage.delete(storageKey);

    if (!success) {
      console.error('Error deleting temporary code:', error);
      return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete temporary code',
      });
    } else {
      return res.status(ResponseStatus.OK).json({
        access_token: value,
      });
    }
  }
};

export default AccessTokenController;
