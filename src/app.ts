import express from 'express'
import { isAuthenticated } from './middleware/authentication'
import { privateRouter, publicRouter } from './router/routes'

const app = express()

// Body parsing Middleware
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api', publicRouter)

app.use('/api', isAuthenticated, privateRouter)

export default app
