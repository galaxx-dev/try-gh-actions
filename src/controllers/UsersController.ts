import { User } from '.prisma/client'
import { Request, Response } from 'express'
import { body, ValidationChain, validationResult } from 'express-validator'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import prismaClient from '../helpers/prismaHelper'

const prisma = prismaClient

export default class UsersController {
  /**
   * validate method
   *
   * @param req Request from express
   * @param res Response from express
   * @returns Promise of Response
   */
  public static validate = (method: any): ValidationChain[] => {
    if (method === 'store') {
      const email = 'email'
      const name = 'name'
      return [
        body(email, 'E-mail is required').exists().trim(),
        body(email, 'E-mail is invalid').isEmail(),
        body(name, 'Name is required').exists().trim(),
        body(name, 'Name is min 2 char').isLength({ min: 2 }),
        body(name, 'Name is max 50 char').isLength({ max: 50 }),
      ]
    }

    return []
  }

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

  // fo the remaining of time, this method will act as playground for validating data using express-validator
  public static store = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return apiResponse(res, {
        statusCode: 400,
        statusMessage: 'There is/are error(s)',
        payload: errors.array(),
      })
    }

    const { email, name } = req.body as User

    try {
      const users = await prisma.user.findMany()

      if (!users) {
        return apiResponse(res, { statusCode: 400, statusMessage: 'Users empty.' })
      }

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'Users fetched success.',
        payload: { email, name },
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
