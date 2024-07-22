import { PrismaClient, Login as PrismaLogin } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';
import ILoginRepository from '../DataAccessInterfaces/ILoginRepository';
import Login from '../Domain/Login';

class LoginRepository implements ILoginRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  private mapToDomain(prismaLogin: PrismaLogin): Login {
    return new Login({
      id: prismaLogin.id,
      userId: prismaLogin.userId,
      timestamp: prismaLogin.timestamp,
      token: prismaLogin.token || ''
    });
  }

  private mapToPrisma(login: Omit<Login, 'id' | 'timestamp'>): Omit<PrismaLogin, 'id' | 'timestamp'> {
    return {
      userId: login.getUserId(),
      token: login.getToken() ?? ''
    };
  }

  async createLogin(login: Omit<Login, 'id' | 'timestamp'>): Promise<Login> {
    const createdLogin = await this.prisma.login.create({
      data: this.mapToPrisma(login)
    });
    return this.mapToDomain(createdLogin);
  }

  async getLoginById(id: string): Promise<Login | null> {
    const prismaLogin = await this.prisma.login.findUnique({
      where: { id }
    });
    return prismaLogin ? this.mapToDomain(prismaLogin) : null;
  }

  async getLoginsByUserId(userId: number): Promise<Login[]> {
    const prismaLogins = await this.prisma.login.findMany({
      where: { userId }
    });
    return prismaLogins.map(this.mapToDomain);
  }

  async deleteLogin(id: string): Promise<Login> {
    const deletedLogin = await this.prisma.login.delete({
      where: { id }
    });
    return this.mapToDomain(deletedLogin);
  }
}

export default LoginRepository;
