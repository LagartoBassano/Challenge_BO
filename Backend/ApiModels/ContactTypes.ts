import { Request, Response } from 'express';
import Contact from '../Domain/Contact';

export type ContactRequest = Request<{}, {}, Omit<Contact, 'createdAt' | 'updatedAt'>>;
export type ContactResponse = Response<Contact>;