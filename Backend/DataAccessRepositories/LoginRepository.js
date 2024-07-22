const prisma = require('./Context/prismaContext').getInstance();

class LoginRepository {
    async createLogin(login) {
      return prisma.login.create({ data: login });
    }
  
    async getLoginById(id) {
      return prisma.login.findUnique({ where: { id } });
    }
  
    async getLoginsByUserId(userId) {
      return prisma.login.findMany({ where: { userId } });
    }
  
    async deleteLogin(id) {
      return prisma.login.delete({ where: { id } });
    }
  }
  
  module.exports = LoginRepository;