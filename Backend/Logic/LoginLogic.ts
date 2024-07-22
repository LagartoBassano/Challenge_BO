import ILoginRepository from '../DataAccessInterfaces/ILoginRepository';
import Login from '../Domain/Login';

class LoginLogic {
  private loginRepository: ILoginRepository;

  constructor(loginRepository: ILoginRepository) {
    this.loginRepository = loginRepository;
  }

  async createLogin(userId: number, token: string): Promise<Login> {
    const login = new Login({
      id: '',
      userId,
      timestamp: new Date(),
      token
    });
    return this.loginRepository.createLogin(login);
  }

  async getLoginById(id: string): Promise<Login | null> {
    return this.loginRepository.getLoginById(id);
  }

  async getLoginsByUserId(userId: number): Promise<Login[]> {
    return this.loginRepository.getLoginsByUserId(userId);
  }

  async deleteLogin(id: string): Promise<Login> {
    return this.loginRepository.deleteLogin(id);
  }
}

export default LoginLogic;
