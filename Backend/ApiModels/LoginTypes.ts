import { Request, Response } from 'express';
import Login from '../Domain/Login';

export type LoginRequest = Request<{}, {}, Omit<Login, 'timestamp'>>;
export type LoginResponse = Response<Login>;