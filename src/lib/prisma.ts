// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/postgres";
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = globalForPrisma.prisma as any;
    const value = client[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
