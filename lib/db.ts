import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Prevents making multiple connections to the database in development mode
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}
