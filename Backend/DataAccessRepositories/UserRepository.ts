import { PrismaClient, User as PrismaUser } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';
import IUserRepository from '../DataAccessInterfaces/IUserRepository';
import User from '../Domain/User';
import Contact from '../Domain/Contact';
import Note from '../Domain/Note';
import Login from '../Domain/Login';

class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  private mapToDomain(prismaUser: PrismaUser & { contacts: any[], notes: any[], logins: any[] }): User {
    return new User({
      id: prismaUser.id,
      name: prismaUser.name,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      contacts: prismaUser.contacts.map(contact => new Contact({
        id: contact.id,
        name: contact.name,
        address: contact.address,
        email: contact.email,
        cellphone: contact.cellphone,
        profilePicture: contact.profilePicture || '',
        userId: contact.userId,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt
      })),
      notes: prismaUser.notes.map(note => new Note({
        id: note.id,
        text: note.text,
        contactId: note.contactId,
        userId: note.userId
      })),
      logins: prismaUser.logins.map(login => new Login({
        id: login.id,
        userId: login.userId,
        timestamp: login.timestamp,
        token: login.token || ''
      }))
    });
  }



  private mapToPrisma(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'contacts' | 'notes' | 'logins'>): Omit<PrismaUser, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: user.getName() ?? '',
      password: this.simpleHashPass(user.getPassword()) ?? ''
    };
  }

  private simpleHashPass(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash.toString(16);
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'contacts' | 'notes' | 'logins'>): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: this.mapToPrisma(user),
      include: {
        contacts: true,
        notes: true,
        logins: true
      }
    });

    return this.mapToDomain(createdUser);
  }

  async getUserById(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        contacts: true,
        notes: true,
        logins: true
      }
    });
    return prismaUser ? this.mapToDomain(prismaUser) : null;
  }

  async getUserByName(name: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { name },
      include: {
        contacts: true,
        notes: true,
        logins: true
      }
    });
    return prismaUser ? this.mapToDomain(prismaUser) : null;
  }

  async updateUser(id: number, data: Partial<Omit<User, 'contacts' | 'notes' | 'logins'>>): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.getName ? data.getName() : undefined,
        password: data.getPassword ? data.getPassword() : undefined
      },
      include: {
        contacts: true,
        notes: true,
        logins: true
      }
    });
    return this.mapToDomain(prismaUser);
  }

  async deleteUser(id: number): Promise<User> {
    const prismaUser = await this.prisma.user.delete({
      where: { id },
      include: {
        contacts: true,
        notes: true,
        logins: true
      }
    });
    return this.mapToDomain(prismaUser);
  }
}

export default UserRepository;
