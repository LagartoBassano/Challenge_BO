const prisma = require('./Context/prismaContext').getInstance();

class ContactRepository {
    async createContact(contact) {
      return prisma.contact.create({ data: contact });
    }
  
    async getContactById(id) {
      return prisma.contact.findUnique({ where: { id } });
    }
  
    async getContactsByUserId(userId, page, pageSize) {
      const skip = (page - 1) * pageSize;
      const take = pageSize;
      return prisma.contact.findMany({
        where: { userId },
        skip,
        take,
      });
    }
  
    async updateContact(id, data) {
      return prisma.contact.update({
        where: { id },
        data,
      });
    }
  
    async deleteContact(id) {
      return prisma.contact.delete({ where: { id } });
    }
  }
  
  module.exports = ContactRepository;