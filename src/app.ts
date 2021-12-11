import express from 'express'
import { isAuthenticated } from './middleware/authentication'
import { privateRouter, publicRouter } from './router/routes'

const app = express()

// global middleware
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }))

// public routes
app.use('/api', publicRouter)

// private routes
app.use('/api', isAuthenticated, privateRouter)

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`[SERVER] ⚡ Running on port ${PORT}`)
})

export default app
