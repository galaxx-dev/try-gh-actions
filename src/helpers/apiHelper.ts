import { Response } from 'express'

interface ResStructure {
  statusCode: number
  errorCode?: string
  msg: string
  payload: any
}

const apiBaseResponse = (res: Response, asd: ResStructure): Response<any, Record<string, any>> => {
  return res.status(asd.statusCode).json(asd)
}

export { apiBaseResponse }
