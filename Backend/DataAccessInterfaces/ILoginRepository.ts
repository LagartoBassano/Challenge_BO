import Login from '../Domain/Login';

interface ILoginRepository {
  createLogin(login: Omit<Login, 'id' | 'timestamp'>): Promise<Login>;
  getLoginById(id: string): Promise<Login | null>;
  getLoginsByUserId(userId: number): Promise<Login[]>;
  deleteLogin(id: string): Promise<Login>;
}

export default ILoginRepository;
