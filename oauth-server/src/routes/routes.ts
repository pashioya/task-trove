import { AuthCodeController, AccessTokenController, HealthCheckController } from '@/controller'
import { Application } from 'express'

const routes = (app: Application) => {
  app.get('/', HealthCheckController)
  app.post('/access-token', AccessTokenController)
  app.get('/auth-code', AuthCodeController)
}

export default routes
