import { PrismaClient } from '@prisma/client';

class PrismaClientSingleton {
  private static instance: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (PrismaClientSingleton.instance === null) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
    return PrismaClientSingleton.instance;
  }
}

export default PrismaClientSingleton.getInstance();
