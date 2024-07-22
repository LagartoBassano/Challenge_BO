import { PrismaClient } from '@prisma/client';

class PrismaClientSingleton {
  private static instance: PrismaClient | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): PrismaClient {
    if (PrismaClientSingleton.instance === null) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
    return PrismaClientSingleton.instance;
  }
}

// Export the singleton instance
export default PrismaClientSingleton.getInstance();
