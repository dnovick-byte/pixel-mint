import { PrismaClient } from '@prisma/client';

let prisma;

// In serverless environments, we must reuse PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Reuse Prisma client in development to avoid creating multiple instances
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

