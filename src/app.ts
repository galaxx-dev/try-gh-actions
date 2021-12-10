import express, { NextFunction, Request, Response } from 'express'
// import passport from 'passport'
// import { getJwtStrategy, getLocalStrategy } from './middleware/passport'
import { publicRouter, privateRouter } from './router/routes'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('isAuthenticated')
  // console.log('req')
  // console.log(req.headers)
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
