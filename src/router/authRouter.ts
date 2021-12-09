import { Router } from 'express'
import notYetImplemented from '../controllers/NotYetImplementedController'
import AuthController from '../controllers/AuthController'

const authRouter = Router()

authRouter
  .route('/login')
  .get(AuthController.index)
  .post(AuthController.store)
  .put(notYetImplemented)
  .patch(notYetImplemented)
  .delete(notYetImplemented)

export { authRouter }
