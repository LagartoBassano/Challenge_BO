import { Request, Response } from 'express';
import User from '../../Domain/User';

export type UserRequest = Request<{}, {}, Omit<User, 'createdAt' | 'updatedAt'>>;
export type UserResponse = Response<Omit<User, 'password'>>;