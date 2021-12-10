import { PrismaClient } from '.prisma/client'
import { SeedOpts } from './seed'

const seedUsersWithPosts = async (prisma: PrismaClient, opts: SeedOpts) => {
  const usersWithPosts = []

  const finishAt = opts.startFrom + opts.totalData

  for (let i = opts.startFrom; i < finishAt; i++) {
    const email = `user${i}@1.com`
    const username = `user${i}`
    const fullName = `User ke-${i}`
    const password = `123123`

    const user = await prisma.user.upsert({
      create: {
        email: email,
        username: username,
        fullName: fullName,
        password: password,
        posts: {
          createMany: {
            skipDuplicates: true,
            data: [
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `Hello, my name is ${fullName}. Nice to meet you! This is just an ordinary text, but it's wonderful! [1]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `Hello, my name is ${fullName}. Nice to meet you! This is just an ordinary text, but it's wonderful! [2]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `Hello, my name is ${fullName}. Nice to meet you! This is just an ordinary text, but it's wonderful! [3]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `Hello, my name is ${fullName}. Nice to meet you! This is just an ordinary text, but it's wonderful! [4]`,
              },
            ],
          },
        },
      },
      update: {},
      where: { email: `user${i}@1.com` },
    })

    usersWithPosts.push(user)
  }

  console.log(usersWithPosts)
}

export default seedUsersWithPosts
