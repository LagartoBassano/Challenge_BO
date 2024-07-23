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
      // Genera valores predeterminados para campos faltantes
      const defaultId = 0; // Establece un valor predeterminado, el ID real debería ser generado por la base de datos
      const defaultCreatedAt = new Date(); // Establece la fecha actual para createdAt
      const defaultUpdatedAt = new Date(); // Establece la fecha actual para updatedAt
      const defaultNotes: Note[] = []; // Asume que no hay notas al principio
  
      // Crea una instancia de Contact
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