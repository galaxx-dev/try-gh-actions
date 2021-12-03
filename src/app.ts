import { PrismaClient } from '.prisma/client'
import express, { Request, Response } from 'express'
import { multiUser } from './data/mockUser'
import { apiBaseResponse } from './helpers/apiHelper'
import { apiErrorLog } from './helpers/logger'

const app = express()
const prisma = new PrismaClient()

// Body parsing Middleware
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', async (_: Request, res: Response): Promise<Response> => {
  try {
    return apiBaseResponse(res, {
      statusCode: 200,
      msg: 'Hello World!',
      payload: null,
    })
  } catch (e) {
    apiErrorLog(e)

    return apiBaseResponse(res, {
      statusCode: 400,
      errorCode: 'HLTH_1_001',
      msg: 'Something wrong...',
      payload: null,
    })
  }
})

app.get('/users', async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.user.findMany().catch(e => console.error(e.message))

    if (users) {
      return apiBaseResponse(res, {
        statusCode: 200,
        msg: 'Users fetched success.',
        payload: users,
      })
    } else {
      return apiBaseResponse(res, {
        statusCode: 400,
        msg: 'Users empty.',
        payload: null,
      })
    }
  } catch (e) {
    apiErrorLog(e)

    return apiBaseResponse(res, {
      statusCode: 400,
      errorCode: 'USRS_1_001',
      msg: 'Something wrong...',
      payload: null,
    })
  }
})

app.post('/users', async (_: Request, res: Response): Promise<Response> => {
  try {
    await prisma.user.createMany(multiUser).catch(e => console.error(e.message))

    return apiBaseResponse(res, {
      statusCode: 201,
      msg: 'Users created.',
      payload: null,
    })
  } catch (e) {
    apiErrorLog(e)

    return apiBaseResponse(res, {
      statusCode: 400,
      errorCode: 'USRS_2_001',
      msg: 'Something wrong...',
      payload: null,
    })
  }
})

app.get('/user/:id', async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await prisma.user
      .findUnique({
        where: { id: Number(req.params.id) },
      })
      .catch(e => console.error(e.message))

    if (!user) throw 'User not found.'

    return apiBaseResponse(res, {
      statusCode: 200,
      msg: 'User fetched success.',
      payload: user,
    })
  } catch (e) {
    apiErrorLog(e)

    return apiBaseResponse(res, {
      statusCode: 400,
      errorCode: 'USER_1_001',
      msg: 'Something wrong...',
      payload: null,
    })
  }
})

app.post('/user', async (req: Request, res: Response): Promise<Response> => {
  const { email, name } = req.body

  try {
    const asd = await prisma.user.create({ data: { email, name } })

    return apiBaseResponse(res, {
      statusCode: 201,
      msg: 'User created.',
      payload: asd,
    })
  } catch (e) {
    apiErrorLog(e)

    return apiBaseResponse(res, {
      statusCode: 400,
      errorCode: 'USER_2_001',
      msg: 'Something wrong...',
      payload: null,
    })
  }
})

export default app
