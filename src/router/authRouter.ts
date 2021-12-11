import { Router } from 'express'
import { checkSchema } from 'express-validator'
import AuthController from '../controllers/AuthController'
import { validateSchema } from '../helpers/validateSchema'
import { storeUserSchema } from '../validation/schema/storeUsersSchema'

const authRouter = Router()

authRouter.route('/login').post(AuthController.login)

authRouter
  .route('/register')
  .post(checkSchema(storeUserSchema), validateSchema, AuthController.register)

export { authRouter }
