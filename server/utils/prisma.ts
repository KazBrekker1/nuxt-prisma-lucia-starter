import prismaClient from '@prisma/client'

const { PrismaClient } = prismaClient

export const client = new PrismaClient()