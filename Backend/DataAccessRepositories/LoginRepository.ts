import { PrismaClient, Login } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';

class LoginRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  async createLogin(login: Omit<Login, 'id' | 'timestamp'>): Promise<Login> {
    return this.prisma.login.create({ data: login });
  }

  async getLoginById(id: string): Promise<Login | null> {
    return this.prisma.login.findUnique({ where: { id } });
  }

  async getLoginsByUserId(userId: number): Promise<Login[]> {
    return this.prisma.login.findMany({ where: { userId } });
  }

  async deleteLogin(id: string): Promise<Login> {
    return this.prisma.login.delete({ where: { id } });
  }
}

export default LoginRepository;
