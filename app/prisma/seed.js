const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  const hash = await bcrypt.hash('password', 10)
  const userAdd = await prisma.user.upsert({
    where: { userName: 'testuser' },
    update: {},
    create: {
      userName: 'testuser',
      email: 'ckapquake@gmail.com',
      passwordHash: hash,
      firstName: 'Pierce',
      lastName: 'Brosnan'
    }
  })

  const orgAdd = await prisma.organization.upsert({
    where: { name: 'North Hockey Hockey Society' },
    update: {},
    create: {
      name: 'North Hockey Hockey Society'
    }
  })

  console.log({ userAdd, orgAdd })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
