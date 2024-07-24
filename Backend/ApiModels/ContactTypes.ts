import { Request, Response } from 'express';
import Contact from '../Domain/Contact';
import Note from '../Domain/Note';

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

    public toContact(): Contact {
      const defaultId = 0;
      const defaultCreatedAt = new Date();
      const defaultUpdatedAt = new Date();
      const defaultNotes: Note[] = [];
  
      return new Contact({
        id: defaultId,
        name: this.name,
        address: this.address,
        email: this.email,
        cellphone: this.cellphone,
        profilePicture: this.profilePicture,
        userId: this.userId,
        notes: defaultNotes,
        createdAt: defaultCreatedAt,
        updatedAt: defaultUpdatedAt,
      });
  }
}