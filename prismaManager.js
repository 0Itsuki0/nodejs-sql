import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PrismaManager {
    async insertUser(username) {
        const userCreated = await prisma.users.create({
            data: {
                name: username
            },
        })
        console.log(userCreated)
        return userCreated
    }

    async queryUsers() {
        const users = await prisma.users.findMany()
        return users
    }
}