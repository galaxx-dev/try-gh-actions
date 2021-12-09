import { Router } from 'express'
// import { authRouter } from './authRouter'
import { healthRouter } from './healthRouter'

const publicRouter = Router()

publicRouter.use('/health', healthRouter)
// TODO:
// publicRouter.use('/auth', authRouter)

export default publicRouter
