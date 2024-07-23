import User from '../Domain/User';

export default interface IUserLogic {
  createUser(user: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByName(name: string): Promise<User | null>;
  updateUser(id: number, userData: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): Promise<User>;
  deleteUser(id: number): Promise<User>;
}
