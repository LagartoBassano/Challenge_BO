import { Request, Response, Router } from 'express';
import IUserLogic from '../LogicInterfaces/IUserLogic';
import { AuthRequest } from '../Middleware/AuthMiddleware';
import { UserResponse } from '../ApiModels/UserTypes';

class UserController {
  private userLogic: IUserLogic;

  constructor(userLogic: IUserLogic) {
    this.userLogic = userLogic;
  }

  public async getUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      const user = await this.userLogic.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userResponse = new UserResponse(user);

      res.status(200).json(userResponse);
    } catch (error) {
      console.error('Failed to retrieve user:', error);
      res.status(500).json({ message: 'Failed to retrieve user', error });
    }
  }
}

export default UserController;
