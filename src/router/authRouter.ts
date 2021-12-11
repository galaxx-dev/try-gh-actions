import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const authRouter = Router()

authRouter.route('/login').post(AuthController.login)

// authRouter.route('/register').post(AuthController.register)

export { authRouter }
