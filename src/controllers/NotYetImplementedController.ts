import { NextFunction, Request, Response } from 'express'

/**
 * Just some random function to fill the emptiness of not yet implemented routes.
 *
 * @param _ express.Request
 * @param res express.Response
 * @param next express.NextFunction
 * @returns promise of Response (apiResponse helper)
 */
const notYetImplemented = (_: Request, res: Response, next: NextFunction) => {
  const message = 'Nothing to see here'

  res.json({
    statusCode: 404,
    statusMsg: message,
  })

  next(new Error(message))
}

export default notYetImplemented
