import jwt, { Secret } from 'jsonwebtoken'

export const signJwt = (payload: string | object | Buffer): string => {
  const secretKey = process.env.JWT_SECRET as Secret
  return jwt.sign(payload, secretKey, { expiresIn: '1m' })
}

export const verifyJwt = (token: string): string | jwt.JwtPayload => {
  const secretKey = process.env.JWT_SECRET as Secret
  return jwt.verify(token, secretKey)
}
