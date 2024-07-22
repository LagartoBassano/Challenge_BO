import { PrismaClient, Note } from '@prisma/client';
import PrismaClientSingleton from './Context/PrismaContext';

class NoteRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaClientSingleton;
  }

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    return this.prisma.note.create({ data: note });
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async getNotesByUserId(userId: number, page: number, pageSize: number): Promise<Note[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.note.findMany({
      where: { userId },
      skip,
      take,
    });
  }

  async updateNote(id: number, data: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async deleteNote(id: number): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}

export default NoteRepository;
