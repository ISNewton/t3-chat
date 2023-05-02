import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
async function main() {
    const example = await prisma.user.upsert({
        where: { email: 'example@example.com' },
        update: {},
        create: {
            email: 'example@example.com',
            password: await bcrypt.hashSync('password', 10),
            username: 'example'
        },
    })
    const example2 = await prisma.user.upsert({
        where: { email: 'exampl2e@example.com' },
        update: {},
        create: {
            email: 'example2@example.com',
            password: await bcrypt.hashSync('password', 10),
            username: 'example2'
        },
    })

    const example3 = await prisma.user.upsert({
        where: { email: 'example3@example.com' },
        update: {},
        create: {
            email: 'example3@example.com',
            password: await bcrypt.hashSync('password', 10),
            username: 'example3'
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
