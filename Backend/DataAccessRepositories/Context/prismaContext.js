const { PrismaClient } = require('@prisma/client');

class PrismaClientSingleton {
  constructor() {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
  }

  getInstance() {
    return PrismaClientSingleton.instance;
  }
}

module.exports = new PrismaClientSingleton();
