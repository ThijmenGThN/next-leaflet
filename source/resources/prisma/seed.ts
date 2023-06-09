const bcrypt = require("bcrypt")
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@leaflet.app',
            password: await bcrypt.hash('admin', 10)
        }
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => await prisma.$disconnect())