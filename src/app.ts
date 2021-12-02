import express, { Request, Response } from 'express'

const app = express()

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', async (_: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: 'Hello World!' })
})

export default app
