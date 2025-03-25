import { PrismaClient } from '@prisma/client';

let prisma;

// Check if running in Vercel (Serverless)
if (process.env.VERCEL) {
    // In serverless environments, reuse Prisma client
    if (!global.prisma) {
        console.log("Creating new Prisma client");
        global.prisma = new PrismaClient();
    } else {
        console.log("Reusing Prisma client");
    }
    prisma = global.prisma;
} else {
    // In local development, create a new Prisma client
    console.log("Creating new Prisma client in development");
    prisma = new PrismaClient();
}

export default prisma;