import { Request, Response } from 'express';
import Contact from '../Domain/Contact';

export type ContactRequest = Request<{}, {}, Partial<Omit<Contact, 'createdAt' | 'updatedAt'>>>;
export class ContactResponse {
    id: number;
    name: string;
    address: string;
    email: string;
    cellphone: string;
    profilePicture?: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(contact: {
      id: number;
      name: string;
      address: string;
      email: string;
      cellphone: string;
      profilePicture?: string;
      userId: number;
      createdAt: Date;
      updatedAt: Date;
    }) {
      this.id = contact.id;
      this.name = contact.name;
      this.address = contact.address;
      this.email = contact.email;
      this.cellphone = contact.cellphone;
      this.profilePicture = contact.profilePicture;
      this.userId = contact.userId;
      this.createdAt = contact.createdAt;
      this.updatedAt = contact.updatedAt;
    }
  }