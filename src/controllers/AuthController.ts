import { Prisma, User } from '.prisma/client'
import { Request, Response } from 'express'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { signJwt } from '../helpers/jwtHelper'
import { apiErrorLog } from '../helpers/loggerHelper'
import { hashPassword, verifyPassword } from '../helpers/passwordHelper'
import prisma from '../helpers/prismaHelper'

export default class AuthController {
  /**
   * Login and send token for stay logged in.
   *
   * @param req express.Request
   * @param res express.Response
   * @returns promise of Response (apiResponse helper)
   */
  public static login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body as User

    try {
      if (!username) throw new Error('Provide a valid username.')
      if (!password) throw new Error('Provide a password.')

      const user = await prisma.user.findUnique({
        where: { username },
        select: { id: true, username: true, fullName: true, password: true },
      })

      // username is not found
      if (!user) throw new Error('Wrong credentials.')

      // password didn't match
      if (!(await verifyPassword(user.password, password))) {
        throw new Error('Wrong credentials.')
      }

      // opt out password and cast to _, then grab the rest data
      const { password: _, ...restData } = user

      // sign jwt for auth
      const accessToken = signJwt({ user: restData })

      res.header('Authorization', 'Bearer ' + accessToken)

      console.log(accessToken)

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'User logged in.',
        payload: {
          user: { ...restData },
          accessToken,
        },
      })
    } catch (e: any) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.USRS_GET_001,
        statusMessage: e.message || 'Something wrong...',
      })
    }
  }

  public static register = async (req: Request, res: Response): Promise<Response> => {
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

      return apiResponse(res, {
        statusCode: 200,
        statusMessage: 'Register success. Please login.',
        payload: user,
      })
    } catch (e: any) {
      apiErrorLog(e)

      return apiResponse(res, {
        statusCode: 400,
        errorCode: ErrorCode.USRS_GET_001,
        statusMessage: e.message || 'Something wrong...',
      })
    }
  }
}
