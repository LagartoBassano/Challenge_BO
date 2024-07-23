import { Request, Response } from 'express';
import User from '../Domain/User';
import { ContactResponse } from './ContactTypes';
import { NoteResponse } from './NoteTypes';
import { LoginResponse } from './LoginTypes';

export type UserRequest = Request<{}, {}, Partial<Omit<User, 'createdAt' | 'updatedAt'>>>;
export class UserResponse {
    id: number;
    name: string;
    contacts?: ContactResponse[];
    notes?: NoteResponse[];
    logins?: LoginResponse[];
    createdAt: Date;
    updatedAt: Date;
  
    constructor(user: User) {
      this.id = user.getId();
      this.name = user.getName();
      this.contacts = user.getContacts().map(contact => new ContactResponse({
        id: contact.getId(),
        name: contact.getName(),
        address: contact.getAddress(),
        email: contact.getEmail(),
        cellphone: contact.getCellphone(),
        profilePicture: contact.getProfilePicture(),
        userId: contact.getUserId(),
        createdAt: contact.getCreatedAt(),
        updatedAt: contact.getUpdatedAt(),
      }));
      this.notes = user.getNotes().map(note => new NoteResponse({
        id: note.getId(),
        text: note.getText(),
        contactId: note.getContactId(),
        userId: note.getUserId(),
      }));
      this.logins = user.getLogins().map(login => new LoginResponse({
        id: login.getId(),
        userId: login.getUserId(),
        timestamp: login.getTimestamp(),
        token: login.getToken(),
      }));
      this.createdAt = user.getCreatedAt();
      this.updatedAt = user.getUpdatedAt();
    }
  }