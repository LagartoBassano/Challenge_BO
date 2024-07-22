import IUserRepository from '../DataAccessInterfaces/IUserRepository';
import User from '../Domain/User';

class UserLogic {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async getUserByName(name: string): Promise<User | null> {
    return this.userRepository.getUserByName(name);
  }

  async updateUser(id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.deleteUser(id);
  }
}

export default UserLogic;