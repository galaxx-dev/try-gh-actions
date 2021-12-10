import { User } from '.prisma/client'
import { ParamSchema } from 'express-validator'
import prismaClient from '../../helpers/prismaHelper'

type StoreUsersSchema = Partial<Record<keyof User, ParamSchema>>

const prisma = prismaClient

const warnRequiredField = (fieldName: string) => `${fieldName} is required`
const warnInvalidField = (fieldName: string) => `${fieldName} is invalid`

const emailStr = 'E-mail'
const usernameStr = 'Username'
const fullNameStr = 'Full Name'
const passwordStr = 'Password'

/**
 * Every step sequence of this schema is important.
 *
 * Schema specification:
 *
 * - email:
 *   - trim
 *   - not empty
 *   - is valid email
 *   - unique
 *
 * - username:
 *   - trim
 *   - not empty
 *   - min length = 5
 *   - max length = 20
 *   - unique
 *
 * - fullname:
 *   - trim
 *   - not empty
 *   - min length = 2
 *   - max length = 50
 *
 * - password:
 *   - not empty
 *   - is strong password
 *     - min length     = 5
 *     - min upper case = 1
 *     - min lower case = 1
 *     - min numbers    = 1
 *     - min symbols    = 0
 */
export const storeUsersSchema: StoreUsersSchema = {
  email: {
    trim: true,
    notEmpty: {
      errorMessage: warnRequiredField(emailStr),
      bail: true,
    },
    isEmail: {
      errorMessage: warnInvalidField(emailStr),
      bail: true,
    },
    custom: {
      // if the same email found in db, throw error
      options: async email => {
        const user = await prisma.user.findFirst({ where: { email } })

        if (user) throw `${email} already in use.`
      },
      bail: true,
    },
  },
  username: {
    trim: true,
    notEmpty: {
      errorMessage: warnRequiredField(usernameStr),
      bail: true,
    },
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: `${usernameStr} must contains min 5 chars and max 20 chars`,
      bail: true,
    },
    custom: {
      // if the same username found in db, throw error
      options: async username => {
        const user = await prisma.user.findFirst({ where: { username } })

        if (user) throw `${username} already in use.`
      },
      bail: true,
    },
  },
  fullName: {
    trim: true,
    notEmpty: {
      errorMessage: warnRequiredField(fullNameStr),
      bail: true,
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: `${fullNameStr} must contains min 2 chars and max 50 chars`,
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: warnRequiredField(passwordStr),
      bail: true,
    },
    isStrongPassword: {
      options: {
        minLength: 5,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      },
      errorMessage: `${passwordStr} must be greater than 5 chars and contain at least one uppercase letter, one lowercase letter, and one number`,
      bail: true,
    },
  },
}
