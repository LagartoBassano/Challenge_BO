// src/Controllers/NoteController.ts
import { Request, Response } from 'express';
import INoteLogic from '../LogicInterfaces/INoteLogic';
import { NoteRequest, NoteResponse } from '../ApiModels/NoteTypes';
import { AuthRequest } from '../Middleware/AuthMiddleware';

class NoteController {
  private noteLogic: INoteLogic;

  constructor(noteLogic: INoteLogic) {
    this.noteLogic = noteLogic;
  }

  public async getNotes(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      const notes = await this.noteLogic.getNotesByUserId(userId, page, pageSize);
      const noteResponses = notes.map(note => new NoteResponse({
        id: note.getId(),
        text: note.getText(),
        contactId: note.getContactId(),
        userId: note.getUserId(),
      }));

      res.status(200).json(noteResponses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve notes', error });
    }
  }

  public async getNoteById(req: Request<{ noteId: string }>, res: Response) {
    try {
      const { noteId } = req.params;
      const note = await this.noteLogic.getNoteById(+noteId);

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      const noteResponse = new NoteResponse({
        id: note.getId(),
        text: note.getText(),
        contactId: note.getContactId(),
        userId: note.getUserId(),
      });

      res.status(200).json(noteResponse);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve note', error });
    }
  }
}

export default NoteController;
