import { Request, Response } from 'express'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import prisma from '../helpers/prismaHelper'
import { determineValByExistence } from '../helpers/queryFilterHelper'
import AuthController from './AuthController'

export default class UsersController {
  /**
   * Get all user based on take number and cursor pointer.
   *
   * @param req express.Request
   * @param res express.Response
   * @returns promise of Response (apiResponse helper)
   */
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

  /**
   * Store a new user.
   *
   * @param req express.Request
   * @param res express.Response
   * @returns promise of Response (apiResponse helper)
   */
  public static store = async (req: Request, res: Response) => {
    // it is the same with register, so for the mean time we reuse register method here
    AuthController.register(req, res)
  }

  /**
   * Get one user by params.id.
   *
   * @param req express.Request
   * @param res express.Response
   * @returns promise of Response (apiResponse helper)
   */
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
