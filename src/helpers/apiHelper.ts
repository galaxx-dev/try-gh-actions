import { Response } from 'express'

/**
 *
 * Format (all must be caps):
 * rootEndpoint_reqMethod_numberOfError
 *
 */
export enum ErrorCode {
  'TEMPLATE_001' = 'TEMPLATE_001',
  'HLTH_GET_001' = 'HLTH_GET_001',
  'USRS_GET_001' = 'USRS_GET_001',
  'USRS_GET_002' = 'USRS_GET_002',
  'USRS_POST_001' = 'USRS_POST_001',
  'USRS_POST_002' = 'USRS_POST_002',
}

export interface ResStructure {
  statusCode: number
  statusMessage: string
  payload?: any
  errorCode?: ErrorCode
}

const apiResponse = (res: Response, resObj: ResStructure, hasToLog = false): Response<any, Record<string, any>> => {
  if (hasToLog) console.log(resObj)
  return res.status(resObj.statusCode).json(resObj)
}

export { apiResponse }
