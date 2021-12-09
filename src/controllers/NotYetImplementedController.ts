import { NextFunction, Request, Response } from 'express'

const notYetImplemented = (_: Request, res: Response, next: NextFunction) => {
  const message = 'Nothing to see here'

  res.json({
    statusCode: 404,
    statusMsg: message,
  })

  next(new Error(message))
}

export default notYetImplemented
