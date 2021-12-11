import { Router } from 'express'
import { authRouter } from './authRouter'
import { healthRouter } from './healthRouter'
import { usersRouter } from './usersRouter'

//
// PUBLIC
//
const publicRouter = Router()
publicRouter.use('/health', healthRouter)
publicRouter.use('/auth', authRouter)

//
// PRIVATE
//
const privateRouter = Router()
privateRouter.use('/users', usersRouter)

export { publicRouter, privateRouter }
