const prisma = require('./Context/prismaContext').getInstance();

class NoteRepository {
    async createNote(note) {
      return prisma.note.create({ data: note });
    }
  
    async getNoteById(id) {
      return prisma.note.findUnique({ where: { id } });
    }
  
    async getNotesByUserId(userId, page, pageSize) {
      const skip = (page - 1) * pageSize;
      const take = pageSize;
      return prisma.note.findMany({
        where: { userId },
        skip,
        take,
      });
    }
  
    async updateNote(id, data) {
      return prisma.note.update({
        where: { id },
        data,
      });
    }
  
    async deleteNote(id) {
      return prisma.note.delete({ where: { id } });
    }
  }
  
  module.exports = NoteRepository;