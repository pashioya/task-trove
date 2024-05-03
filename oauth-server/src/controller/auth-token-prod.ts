import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { Storage } from '@mondaycom/apps-sdk'
import axios from 'axios'
import { ResponseStatus } from '@/enums/api'
import { Request } from 'express'
import { env } from '@/env'
import * as console from 'node:console'

const AuthTokenController = async (req: Request, res: Response) => {
  console.log('REQ_URL', req.query)
  // TODO:Add more logging
  // Extract authorization token from request
  const authorizationToken = req.query.code
  console.log('Authorization token:', authorizationToken)

  // Check if authorization token exists
  if (!authorizationToken) {
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      message: 'Missing authorization token: ' + req,
    })
  }

  // Get the client ID and client secret from env variables
  const clientId = env.MONDAY_CLIENT_ID
  const clientSecret = env.MONDAY_CLIENT_SECRET

  // get the main access token from env variables
  const accessToken = env.ACCESS_TOKEN

  try {
    // post request to monday to receive the access token using the authorization token
    const response = await axios({
      method: 'post',
      url: 'https://auth.monday.com/oauth2/token',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationToken,
        redirect_uri: env.MONDAY_REDIRECT_URI,
      },
    })

    console.log('Monday response status:', response.status)

    if (response.status === 401 || response.status === 403) {
      return res.status(ResponseStatus.UNAUTHORIZED).json({
        message: 'Invalid authorization token:' + response,
      })
    } else if (response.status !== 200) {
      return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to obtain access token: ' + response,
      })
    }

    const retrievedAccessToken = response.data.access_token

    // Create a new storage object
    const storage = new Storage(accessToken)

    // generate a small key to store the access token in storage
    const generatedKey = (Math.random() + 1).toString(36).substring(8)

    // generate a temporary code that expires in 1 shour
    const generatedToken = jwt.sign({ retrievedAccessToken }, env.JWT_SECRET, {
      expiresIn: '5m',
    })

    const { success, error } = await storage.set(generatedKey, retrievedAccessToken)
    if (!success) {
      console.error('Failed to store access token:', error)
      return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to store access token',
      })
    }

    return res.redirect('exp://127.0.0.1:8081/?token=' + generatedToken + '&key=' + generatedKey)
  } catch (error) {
    console.error('Error exchanging authorization token:', error)
    res.redirect('exp://127.0.0.1:8081?error=' + error)
  }
}

export default AuthTokenController
