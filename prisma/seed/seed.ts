import { PrismaClient } from '.prisma/client'
import generateUsers from './users'
import usersWithPosts from './usersWithPosts'

const main = async () => {
  const prisma = new PrismaClient()
  try {
    // ---list of seeds u wanna run
    await generateUsers(prisma)
    await usersWithPosts(prisma)
    // ---end of list
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
