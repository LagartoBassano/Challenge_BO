import { PrismaClient, Contact as PrismaContact, Note as PrismaNote } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';
import IContactRepository from '../DataAccessInterfaces/IContactRepository';
import Contact from '../Domain/Contact';
import Note from '../Domain/Note';

class ContactRepository implements IContactRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  private mapToDomain(prismaContact: PrismaContact & { notes: PrismaNote[] }): Contact {
    return new Contact({
      id: prismaContact.id,
      name: prismaContact.name,
      address: prismaContact.address,
      email: prismaContact.email,
      cellphone: prismaContact.cellphone,
      profilePicture: prismaContact.profilePicture || undefined,
      userId: prismaContact.userId,
      notes: prismaContact.notes.map(note => new Note({
        id: note.id,
        text: note.text,
        contactId: note.contactId,
        userId: note.userId,
      })),
      createdAt: prismaContact.createdAt,
      updatedAt: prismaContact.updatedAt,
    });
  }

  private mapToPrisma(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'notes'>): Omit<PrismaContact, 'id' | 'createdAt' | 'updatedAt' | 'notes'> {
    return {
      name: contact.getName(),
      address: contact.getAddress(),
      email: contact.getEmail(),
      cellphone: contact.getCellphone(),
      profilePicture: contact.getProfilePicture() || null,
      userId: contact.getUserId()
    };
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'notes'>): Promise<Contact> {
    const createdContact = await this.prisma.contact.create({
      data: this.mapToPrisma(contact)
    });
    return this.mapToDomain(createdContact as PrismaContact & { notes: PrismaNote[] });
  }

  async getContactById(id: number): Promise<Contact | null> {
    const prismaContact = await this.prisma.contact.findUnique({
      where: { id },
      include: { notes: true }
    });
    return prismaContact ? this.mapToDomain(prismaContact) : null;
  }

  async getContactsByUserId(userId: number, page: number, pageSize: number): Promise<Contact[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const prismaContacts = await this.prisma.contact.findMany({
      where: { userId },
      skip,
      take,
      include: { notes: true }
    });
    return prismaContacts.map(this.mapToDomain.bind(this));
  }

  async updateContact(id: number, data: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'notes'>>): Promise<Contact> {
    const prismaData: Omit<PrismaContact, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.getName ? data.getName() : '',
      address: data.getAddress ? data.getAddress() : '',
      email: data.getEmail ? data.getEmail() : '',
      cellphone: data.getCellphone ? data.getCellphone() : '',
      profilePicture: (data.getProfilePicture ? data.getProfilePicture() : undefined) || null,
      userId: data.getUserId ? data.getUserId() : 0
    };

    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: prismaData
    });

    return this.mapToDomain(updatedContact as PrismaContact & { notes: PrismaNote[] });
  }

  async deleteContact(id: number): Promise<Contact> {
    const deletedContact = await this.prisma.contact.delete({
      where: { id }
    });
    return this.mapToDomain(deletedContact as PrismaContact & { notes: PrismaNote[] });
  }
}

export default ContactRepository;
