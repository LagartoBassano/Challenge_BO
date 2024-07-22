import { PrismaClient, Note as PrismaNote } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';
import INoteRepository from '../DataAccessInterfaces/INoteRepository';
import Note from '../Domain/Note';

class NoteRepository implements INoteRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  private mapToDomain(prismaNote: PrismaNote): Note {
    return new Note({
      id: prismaNote.id,
      text: prismaNote.text,
      contactId: prismaNote.contactId,
      userId: prismaNote.userId
    });
  }

  private mapToPrisma(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Omit<PrismaNote, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      text: note.getText(),
      contactId: note.getContactId(),
      userId: note.getUserId()
    };
  }

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const createdNote = await this.prisma.note.create({
      data: this.mapToPrisma(note)
    });
    return this.mapToDomain(createdNote);
  }

  async getNoteById(id: number): Promise<Note | null> {
    const prismaNote = await this.prisma.note.findUnique({
      where: { id }
    });
    return prismaNote ? this.mapToDomain(prismaNote) : null;
  }

  async getNotesByUserId(userId: number, page: number, pageSize: number): Promise<Note[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const prismaNotes = await this.prisma.note.findMany({
      where: { userId },
      skip,
      take
    });
    return prismaNotes.map(this.mapToDomain);
  }

  async updateNote(id: number, data: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note> {
    // Ensure that data contains the necessary fields for Prisma
    const prismaData: Omit<PrismaNote, 'id' | 'createdAt' | 'updatedAt'> = {
      text: data.getText ? data.getText() : '',
      contactId: data.getContactId ? data.getContactId() : 0,
      userId: data.getUserId ? data.getUserId() : 0
    };

    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: prismaData
    });

    return this.mapToDomain(updatedNote);
  }

  async deleteNote(id: number): Promise<Note> {
    const deletedNote = await this.prisma.note.delete({
      where: { id }
    });
    return this.mapToDomain(deletedNote);
  }
}

export default NoteRepository;
