import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Storage } from '@mondaycom/apps-sdk';
import axios from 'axios';
import { ResponseStatus } from '@/enums/api';
import { Request } from 'express';
import { env } from '@/env';
import * as console from 'node:console';

const AuthTokenController = async (req: Request, res: Response) => {
  // TODO:Add more logging
  // Extract authorization token from request
  const authorizationToken = req.query.code;
  console.log('Authorization token:', authorizationToken);

  // Check if authorization token exists
  if (!authorizationToken) {
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: 'Missing authorization token',
    });
  }

  // Get the client ID and client secret from env variables
  const clientId = env.MONDAY_CLIENT_ID;
  const clientSecret = env.MONDAY_CLIENT_SECRET;

  // get the main access token from env variables
  const accessToken = env.ACCESS_TOKEN;

  try {
    // post request to monday to receive the access token using the authorization token
    const response = await axios({
      method: 'post',
      url: 'https://auth.monday.com/oauth2/token',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationToken,
        redirect_uri: 'https://1e4e-151-248-53-93.ngrok-free.app/auth-token',
      },
    });

    console.log('Monday response status:', response.status);

    if (response.status === 401 || response.status === 403) {
      return res.status(ResponseStatus.UNAUTHORIZED).json({
        message: 'Invalid authorization token',
      });
    } else if (response.status !== 200) {
      return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to obtain access token',
      });
    }

    const retrievedAccessToken = response.data.access_token;

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
      'exp://127.0.0.1:8081/buffer/?token=' + generatedToken + '&key=' + generatedKey,
    );
  } catch (error) {
    console.error('Error exchanging authorization token:', error);
    res.redirect('exp://127.0.0.1:8081?error=' + 'InvalidAuthorizationToken');
  }
};

export default AuthTokenController;
