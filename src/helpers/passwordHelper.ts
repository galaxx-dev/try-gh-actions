import argon2 from 'argon2'

/**
 * Hash input password to securely stored on DB.
 *
 * @param rawString plain password to be hashed
 * @returns hashed password to store on DB
 */
export const hashPassword = async (rawString: string): Promise<string> => {
  return await argon2.hash(rawString, { type: 2 })
}

/**
 * Verify input password match the hashed password on DB or not.
 *
 * @param hashed hashed password
 * @param rawString plain password to be checked
 * @returns match or not
 */
export const verifyPassword = async (hashed: string, rawString: string): Promise<boolean> => {
  return await argon2.verify(hashed, rawString, { type: 2 })
}
