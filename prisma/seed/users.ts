import { PrismaClient } from '.prisma/client'

const generateUsers = async (prisma: PrismaClient) => {
  const users = []
  for (let i = 1; i < 11; i++) {
    const user = await prisma.user.upsert({
      create: {
        email: `user${i}@1.com`,
        username: `user${i}`,
        fullName: `User ke-${i}`,
        password: `123123`,
      },
      update: {},
      where: { email: `user${i}@1.com` },
    })

    users.push(user)
  }

  console.log(users)
}

export default generateUsers
