import { PrismaClient, User } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByName(name: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { name } });
  }

  async updateUser(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}

export default UserRepository;
