import { PrismaClient } from '.prisma/client'

/** prisma client so we don't have to instantiate it on every single use. */
const prisma = new PrismaClient()

export default prisma
