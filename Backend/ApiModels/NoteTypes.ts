import { Request, Response } from 'express';
import Note from '../Domain/Note';

export type NoteRequest = Request<{}, {}, Omit<Note, 'createdAt' | 'updatedAt'>>;
export type NoteResponse = Response<Note>;
