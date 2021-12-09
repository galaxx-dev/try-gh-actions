import { Router } from 'express'
import { usersRouter } from './usersRouter'

const privateRouter = Router()

privateRouter.use('/users', usersRouter)

export default privateRouter
