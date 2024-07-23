import Login from '../Domain/Login';

interface ILoginLogic {
  createLogin(userId: number, token: string): Promise<Login>;
  getLoginById(id: string): Promise<Login | null>;
  getLoginsByUserId(userId: number): Promise<Login[]>;
  deleteLogin(id: string): Promise<Login>;
}

export default ILoginLogic;
