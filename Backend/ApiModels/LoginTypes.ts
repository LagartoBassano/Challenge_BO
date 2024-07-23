import { Request, Response } from 'express';
import Login from '../Domain/Login';

export type LoginRequest = Request<{}, {}, Partial<Omit<Login, 'timestamp'>>>;
export class LoginResponse {
    id: string;
    userId: number;
    timestamp: Date;
    token?: string;
  
    constructor(login: {
      id: string;
      userId: number;
      timestamp: Date;
      token?: string;
    }) {
      this.id = login.id;
      this.userId = login.userId;
      this.timestamp = login.timestamp;
      this.token = login.token;
    }
  }