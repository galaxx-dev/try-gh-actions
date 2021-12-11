import { Prisma, User } from '.prisma/client'
import { Request, Response } from 'express'
import { determineValByExistence } from '../helpers/queryFilterHelper'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import prismaClient from '../helpers/prismaHelper'
import { hashPassword, verifyPassword } from '../helpers/passwordHelper'

const prisma = prismaClient

export default class UsersController {
  public static index = async (req: Request, res: Response): Promise<Response> => {
    // set default if not provided in query
    const cursor = determineValByExistence(req.query.cursor, 1)
    const take = determineValByExistence(req.query.take, 25)

    try {
      const users = await prisma.user.findMany({
        take,
        cursor: { id: cursor },
        select: {
          id: true,
          email: true,
          username: true,
          fullName: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!users) {
        return apiResponse(res, { statusCode: 400, statusMessage: 'Users empty.' })
      }

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: users.length < 1 ? 'Users empty.' : 'Users fetched success.',
        payload: {
          totalData: users.length,
          data: users,
        },
      })
    } catch (e) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.USRS_GET_001,
        statusMessage: 'Something wrong...',
      })
    }
  }

  public static store = async (req: Request, res: Response): Promise<Response> => {
    const { email, username, fullName, password } = req.body as User

    // data for insert
    const data: Prisma.UserCreateInput = {
      email,
      username,
      fullName,
      password: await hashPassword(password),
    }

    // select data back
    const select: Prisma.UserSelect = { id: true, email: true, fullName: true, username: true }

    try {
      const user = await prisma.user.create({ data, select })

      if (!user) {
        return apiResponse(res, { statusCode: 400, statusMessage: 'User is empty.' })
      }

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'User successfully created.',
        payload: user,
      })
    } catch (e) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.USRS_GET_001,
        statusMessage: 'Something wrong...',
      })
    }
  }

  public static show = async (req: Request, res: Response): Promise<Response> => {
    // set default if not provided in params (user start with id === 1, so 0 always empty)
    const userId = determineValByExistence(req.params.id, 0)

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) throw new Error('User not found.')

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'User fetched success.',
        payload: user,
      })
    } catch (e: any) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.USRS_GET_002,
        statusMessage: e.message || 'Something wrong...',
      })
    }
  }

  // public static update = async (req: Request, res: Response): Promise<Response> => {}
  // public static destroy = async (req: Request, res: Response): Promise<Response> => {}
}
