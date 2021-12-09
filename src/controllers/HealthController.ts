import { Request, Response } from 'express'
import { apiResponse, ErrorCode } from '../helpers/apiHelper'
import { apiErrorLog } from '../helpers/loggerHelper'

export default class HealthController {
  public static get = async (_: Request, res: Response): Promise<Response> => {
    try {
      return apiResponse(
        res,
        {
          statusCode: 200,
          statusMessage: 'Server health is good! 🔥',
        },
        true,
      )
    } catch (e) {
      apiErrorLog(e)

      return apiResponse(
        res,
        {
          statusCode: 400,
          errorCode: ErrorCode.HLTH_GET_001,
          statusMessage: 'Server health is bad! 🤮',
        },
        true,
      )
    }
  }
}
