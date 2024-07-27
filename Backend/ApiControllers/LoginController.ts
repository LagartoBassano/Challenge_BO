import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ILoginLogic from '../LogicInterfaces/ILoginLogic';
import {LoginResponse} from '../ApiModels/LoginTypes';

dotenv.config();

class LoginController {
  constructor(private loginLogic: ILoginLogic) {}

  public async createLogin(req: Request<{}, {}, { userId: number; }>, res: Response) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
      const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

      const newLogin = await this.loginLogic.createLogin(userId, token);

      const loginResponse = new LoginResponse({
        id: newLogin.getId(),
        userId: newLogin.getUserId(),
        timestamp: newLogin.getTimestamp(),
        token,
      });

      res.status(201).json(loginResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Failed to create login', details: errorMessage });
    }
  }
}

export default LoginController;
