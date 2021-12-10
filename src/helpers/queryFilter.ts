/**
 * Determine value by it's existence and by it's type.
 *
 * @param reqQuery request.query child property to be parsed
 * @param defaultValue fallback to this if the reqQuery is bad
 * @param shouldBeType what kind of type that we want to be compared
 * @returns number of value that useful
 */
export const determineValByExistence = (reqQuery: any, defaultValue: number): number => {
  let queryValue = reqQuery ? Number(reqQuery) : undefined

  // change value to default if queryValue type is not 'number'
  if (typeof queryValue !== 'number') queryValue = defaultValue

  return queryValue
}
