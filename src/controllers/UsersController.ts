import { Prisma, User } from '.prisma/client'
import { Request, Response } from 'express'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import prismaClient from '../helpers/prismaHelper'

const prisma = prismaClient

export default class UsersController {
  public static index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await prisma.user.findMany()

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

    const data: Prisma.UserCreateInput = { email, username, fullName, password }
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
    const userId = Number(req.params.id)

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) throw Error('User not found.')

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

  public static update = async (req: Request, res: Response): Promise<Response> => {}
  public static destroy = async (req: Request, res: Response): Promise<Response> => {}
}
