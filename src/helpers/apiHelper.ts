import { Response } from 'express'

/**
 * Collection of error code for debugging purposes.
 *
 * Format (all must be caps):
 * rootEndpoint_reqMethod_numberOfError
 */
export enum ErrorCode {
  'TEMPLATE_001' = 'TEMPLATE_001',
  'HLTH_GET_001' = 'HLTH_GET_001',
  'USRS_GET_001' = 'USRS_GET_001',
  'USRS_GET_002' = 'USRS_GET_002',
  'USRS_POST_001' = 'USRS_POST_001',
  'USRS_POST_002' = 'USRS_POST_002',
}

/**
 * Response structure for sending it with API.
 */
export interface ResStructure {
  statusCode: number
  statusMessage: string
  payload?: any
  errorCode?: ErrorCode
}

/**
 * Standardized the response structure for sending it with API,
 * so it will be convenient and consistent to consume.
 *
 * @param res express.Response
 * @param resObj response object containing standard response for sending it with API
 * @param hasToLog has to log the response object or not
 * @returns status and json object contains resObj
 */
const apiResponse = (
  res: Response,
  resObj: ResStructure,
  hasToLog = false,
): Response<any, Record<string, any>> => {
  if (hasToLog) console.log(resObj)
  return res.status(resObj.statusCode).json(resObj)
}

export { apiResponse }
