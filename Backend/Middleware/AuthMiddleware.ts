import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define un tipo de Request que extiende Request de Express
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware para autenticar el token JWT
export const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded; // Añade el usuario decodificado a la request para usarlo en el controlador
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
