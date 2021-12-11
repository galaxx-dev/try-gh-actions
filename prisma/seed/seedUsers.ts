import { PrismaClient } from '.prisma/client'
import { hashPassword } from '../../src/helpers/passwordHelper'
import { SeedOpts } from './seed'

const seedUsers = async (prisma: PrismaClient, opts: SeedOpts) => {
  const users = []

  const finishAt = opts.startFrom + opts.totalData

  for (let i = opts.startFrom; i < finishAt; i++) {
    const user = await prisma.user.upsert({
      create: {
        email: `user${i}@1.com`,
        username: `user${i}`,
        fullName: `User ke-${i}`,
        password: await hashPassword(`123123`),
      },
      update: {},
      where: { email: `user${i}@1.com` },
    })

    users.push(user)
  }

  console.log(users)
}

export default seedUsers
