import { PrismaClient, Contact as PrismaContact } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';
import IContactRepository from '../DataAccessInterfaces/IContactRepository';
import Contact from '../Domain/Contact';

class ContactRepository implements IContactRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  private mapToDomain(prismaContact: PrismaContact): Contact {
    return new Contact({
      id: prismaContact.id,
      name: prismaContact.name,
      address: prismaContact.address,
      email: prismaContact.email,
      cellphone: prismaContact.cellphone,
      profilePicture: prismaContact.profilePicture || undefined,
      userId: prismaContact.userId,
      notes: [], // Placeholder, will be populated separately if needed
      createdAt: prismaContact.createdAt,
      updatedAt: prismaContact.updatedAt,
    });
  }

  private mapToPrisma(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Omit<PrismaContact, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: contact.getName(),
      address: contact.getAddress(),
      email: contact.getEmail(),
      cellphone: contact.getCellphone(),
      profilePicture: contact.getProfilePicture() || null,
      userId: contact.getUserId()
    };
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const createdContact = await this.prisma.contact.create({
      data: this.mapToPrisma(contact)
    });
    return this.mapToDomain(createdContact);
  }

  async getContactById(id: number): Promise<Contact | null> {
    const prismaContact = await this.prisma.contact.findUnique({
      where: { id }
    });
    return prismaContact ? this.mapToDomain(prismaContact) : null;
  }

  async getContactsByUserId(userId: number, page: number, pageSize: number): Promise<Contact[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const prismaContacts = await this.prisma.contact.findMany({
      where: { userId },
      skip,
      take
    });
    return prismaContacts.map(this.mapToDomain);
  }

  async updateContact(id: number, data: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contact> {
    const prismaData: Omit<PrismaContact, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.getName ? data.getName() : '',
      address: data.getAddress ? data.getAddress() : '',
      email: data.getEmail ? data.getEmail() : '',
      cellphone: data.getCellphone ? data.getCellphone() : '',
      profilePicture: data.getProfilePicture ? (data.getProfilePicture() || null) : '',
      userId: data.getUserId ? data.getUserId() : 0
    };

    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: prismaData
    });

    return this.mapToDomain(updatedContact);
  }

  async deleteContact(id: number): Promise<Contact> {
    const deletedContact = await this.prisma.contact.delete({
      where: { id }
    });
    return this.mapToDomain(deletedContact);
  }
}

export default ContactRepository;
