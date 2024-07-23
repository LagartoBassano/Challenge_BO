import { Request, Response } from 'express';
import ILoginLogic from '../LogicInterfaces/ILoginLogic';
import { LoginRequest, LoginResponse } from '../ApiModels/LoginTypes';

class LoginController {
  private loginLogic: ILoginLogic;

  constructor(loginLogic: ILoginLogic) {
    this.loginLogic = loginLogic;
  }

  public async createLogin(req: Request<{}, {}, { userId: number; token: string }>, res: Response) {
    try {
      const { userId, token } = req.body;

      if (!userId || !token) {
        return res.status(400).json({ error: 'userId and token are required' });
      }

      const newLogin = await this.loginLogic.createLogin(userId, token);

      const loginResponse = new LoginResponse({
        id: newLogin.getId(),
        userId: newLogin.getUserId(),
        timestamp: newLogin.getTimestamp(),
        token: newLogin.getToken(),
      });

      res.status(201).json(loginResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create login', details: error.message });
    }
  }
}

export default LoginController;
