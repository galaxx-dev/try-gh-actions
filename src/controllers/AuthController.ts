import { Request, Response } from 'express'
// import jwt, { Algorithm, Secret } from 'jsonwebtoken'
// import passport from 'passport'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import prismaClient from '../helpers/prismaHelper'

const prisma = prismaClient

// TODO:
export default class AuthController {
  /**
   * login main page
   *
   * @param req Request from express
   * @param res Response from express
   * @returns Promise of Response
   */
  public static index = async (req: Request, res: Response): Promise<Response> => {
    try {
      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'Login page',
      })
    } catch (e) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.TEMPLATE_001,
        statusMessage: 'Something wrong...',
      })
    }
  }

  /**
   * post a login information
   *
   * @param req Request from express
   * @param res Response from express
   * @returns Promise of Response
   */
  public static store = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await prisma.user.findUnique({ where: { email: req.body.email } })

      if (!user) return apiResponse(res, { statusCode: 400, statusMessage: 'User not found.' })

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'User fetched success.',
        payload: user,
      })
    } catch (e) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.TEMPLATE_001,
        statusMessage: 'Something wrong...',
      })
    }
  }
}
