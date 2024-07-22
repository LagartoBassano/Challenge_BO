import User from '../Domain/User';

interface IUserRepository {
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByName(name: string): Promise<User | null>;
  updateUser(id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User>;
  deleteUser(id: number): Promise<User>;
}

export default IUserRepository;