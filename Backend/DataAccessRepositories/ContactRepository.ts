import { PrismaClient, Contact } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext'

class ContactRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    return this.prisma.contact.create({ data: contact });
  }

  async getContactById(id: number): Promise<Contact | null> {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async getContactsByUserId(userId: number, page: number, pageSize: number): Promise<Contact[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.contact.findMany({
      where: { userId },
      skip,
      take,
    });
  }

  async updateContact(id: number, data: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contact> {
    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async deleteContact(id: number): Promise<Contact> {
    return this.prisma.contact.delete({ where: { id } });
  }
}

export default ContactRepository;