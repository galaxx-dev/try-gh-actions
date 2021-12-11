import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { apiResponse } from './apiHelper'

/**
 * Validate schema and handle how to response
 * to the validation result using express-validator.
 *
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 * @returns promise of Response (apiResponse helper) or next() into next middleware
 */
export const validateSchema = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return apiResponse(res, {
      statusCode: 400,
      statusMessage: errors.array().length > 1 ? 'There are an errors' : 'There is an error',
      payload: { validationErr: errors.array() },
    })
  }

  return next()
}
