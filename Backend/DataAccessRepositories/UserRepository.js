const prisma = require('./Context/prismaContext').getInstance();

class UserRepository {
  async createUser(user) {
    return prisma.user.create({ data: user });
  }

  async getUserById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getUserByName(name) {
    return prisma.user.findUnique({ where: { name } });
  }

  async updateUser(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id) {
    return prisma.user.delete({ where: { id } });
  }
}

module.exports = UserRepository;