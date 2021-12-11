import { PrismaClient } from '.prisma/client'
import seedUsers from './seedUsers'
import seedUsersWithPosts from './seedUsersWithPosts'

const main = async () => {
  const prisma = new PrismaClient()
  try {
    // ---list of seeds u wanna run
    await seedUsers(prisma, { startFrom: 1, totalData: 1000 })
    await seedUsersWithPosts(prisma, { startFrom: 1001, totalData: 1000 })
    // ---end of list
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

/**
 * Options so we can more dynamically manage seeders
 */
export interface SeedOpts {
  startFrom: number
  totalData: number
}
