import { Response } from 'express'
import { Request } from 'express'
import { z } from 'zod'
import { logger } from '@/lib/logger'

const AuthCodeRequestQuerySchema = z.object({
  code: z.string().min(1),
  scope: z.string().optional(),
  state: z.string().optional(),
  region: z.string().optional()
})

const AuthCodeController = async (req: Request, res: Response) => {
  if ('error' in req.query) {
    return res.redirect(`task-trove-app://login?error=${req.query.error}`)
  }

  const parsedQuery = AuthCodeRequestQuerySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    logger.error('Invalid query parameters:', {
      issues: parsedQuery.error.issues.map((issue) => issue.message).join(', ')
    })

    return res.redirect('task-trove-app://login?error=invalid_query_parameters')
  }

  const { code, scope, state, region } = parsedQuery.data
  const authRedirectUri = new URL('task-trove-app://login')

  authRedirectUri.searchParams.set('code', code)
  scope && authRedirectUri.searchParams.set('scope', scope)
  state && authRedirectUri.searchParams.set('state', state)
  region && authRedirectUri.searchParams.set('region', region)

  return res.redirect(authRedirectUri.toString())
}

export default AuthCodeController
