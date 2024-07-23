import { Request, Response } from 'express';
import Note from '../Domain/Note';

export type NoteRequest = Request<{}, {}, Partial<Omit<Note, 'createdAt' | 'updatedAt'>>>;
export class NoteResponse {
    id: number;
    text: string;
    contactId: number;
    userId: number;
  
    constructor(note: {
      id: number;
      text: string;
      contactId: number;
      userId: number;
    }) {
      this.id = note.id;
      this.text = note.text;
      this.contactId = note.contactId;
      this.userId = note.userId;
    }
  }
