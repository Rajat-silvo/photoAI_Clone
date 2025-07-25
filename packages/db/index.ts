import { PrismaClient } from "./generated/prisma";

// convert this to a singleton for nextjs
export const prismaClient = new PrismaClient();
