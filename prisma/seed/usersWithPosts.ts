import { PrismaClient } from '.prisma/client'

const usersWithPosts = async (prisma: PrismaClient) => {
  const users = []
  for (let i = 11; i < 21; i++) {
    const username = `user${i}`

    const user = await prisma.user.upsert({
      create: {
        email: `user${i}@1.com`,
        username: username,
        fullName: `User ke-${i}`,
        password: `123123`,
        posts: {
          createMany: {
            skipDuplicates: true,
            data: [
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `This is just an ordinary text, but it's wonderful! [1]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `This is just an ordinary text, but it's wonderful! [2]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `This is just an ordinary text, but it's wonderful! [3]`,
              },
              {
                title: `Wonderful Post Belongs to ${username}`,
                content: `This is just an ordinary text, but it's wonderful! [4]`,
              },
            ],
          },
        },
      },
      update: {},
      where: { email: `user${i}@1.com` },
    })

    users.push(user)
  }

  console.log(users)
}

export default usersWithPosts
