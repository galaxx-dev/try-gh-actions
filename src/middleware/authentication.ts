import { NextFunction, Request, Response } from 'express'
import { apiResponse } from '../helpers/apiHelper'
import { verifyJwt } from '../helpers/jwtHelper'
import { apiErrorLog } from '../helpers/loggerHelper'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.header('authorization')?.split(' ')[1]

    if (!accessToken) throw new Error('invalid signature')

    const { user } = verifyJwt(accessToken) as { user: {} } // force type defs, later must be declared separately

    if (!user) throw new Error('invalid payload')

    console.log(user)
    next()
  } catch (e: any) {
    apiErrorLog(e)

    apiResponse(res, {
      statusCode: 401, // unauthenticated
      statusMessage: e.message || 'invalid signature',
    })
  }
}
