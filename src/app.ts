import express, { NextFunction, Request, Response } from 'express'
// import passport from 'passport'
// import { getJwtStrategy, getLocalStrategy } from './middleware/passport'
import privateRouter from './router/private.routes'
import publicRouter from './router/public.routes'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('---')
  console.log('req')
  console.log(req.headers)
  next()
}

const app = express()

// Body parsing Middleware
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api', publicRouter)

// TODO:
// passport.use(getLocalStrategy())
// passport.use(getJwtStrategy())

app.use('/api', isAuthenticated, privateRouter)

export default app
