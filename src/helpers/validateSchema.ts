import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { apiResponse } from './apiHelper'

export const validateSchema = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return apiResponse(res, {
      statusCode: 400,
      statusMessage: 'There is/are error(s)',
      payload: { validationErr: errors.array() },
    })
  }

  return next()
}
