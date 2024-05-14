import { Request, Response } from 'express'
import { z } from 'zod'
import axios from 'axios'
import { env } from '@/env'
import { ResponseStatus } from '@/enums/api'

const AccessTokenRequestBodySchema = z.object({
  code: z.string().min(1),
  state: z.string().optional()
})

const MONDAY_TOKEN_ENDPOINT = 'https://auth.monday.com/oauth2/token'

const AccessTokenController = async (req: Request, res: Response) => {
  const parsedBody = AccessTokenRequestBodySchema.safeParse(req.body)

  if (!parsedBody.success) {
    // TODO: Implement logging
    console.error('Invalid query parameters:', parsedBody.error.issues.map((issue) => issue.message).join(', '))

    return res.status(400).json({
      message: 'Invalid query parameters',
      errors: parsedBody.error.issues.map((issue) => issue.message).join(', ')
    })
  }

  const { code } = parsedBody.data

  try {
    const url = MONDAY_TOKEN_ENDPOINT
    const data = {
      client_id: env.MONDAY_CLIENT_ID,
      client_secret: env.MONDAY_CLIENT_SECRET,
      code,
      redirect_uri: env.MONDAY_REDIRECT_URI
    }

    const response = await axios.post(url, data)

    return res.status(ResponseStatus.OK).json(response.data)
  } catch (error) {
    // TODO: Implement logging & improve error handling
    console.error('Failed to obtain access token:', error)
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to obtain access token'
    })
  }
}

export default AccessTokenController
