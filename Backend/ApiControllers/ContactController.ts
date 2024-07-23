import { Request, Response } from 'express';
import IContactLogic from '../LogicInterfaces/IContactLogic';
import INoteLogic from '../LogicInterfaces/INoteLogic';
import { ContactRequest, ContactResponse } from '../ApiModels/ContactTypes';
import { NoteRequest, NoteResponse } from '../ApiModels/NoteTypes';
import { AuthRequest } from '../Middleware/AuthMiddleware';
import Contact from '../Domain/Contact';
import Note from '../Domain/Note';

class ContactController {
  private contactLogic: IContactLogic;
  private noteLogic: INoteLogic;

  constructor(contactLogic: IContactLogic, noteLogic: INoteLogic) {
    this.contactLogic = contactLogic;
    this.noteLogic = noteLogic;
  }

  private mapToContactResponse(contact: Contact): ContactResponse {
    return {
      id: contact.getId(),
      name: contact.getName(),
      address: contact.getAddress(),
      email: contact.getEmail(),
      cellphone: contact.getCellphone(),
      profilePicture: contact.getProfilePicture(),
      userId: contact.getUserId(),
      createdAt: contact.getCreatedAt(),
      updatedAt: contact.getUpdatedAt(),
    };
  }

  // Helper function to map a Note to NoteResponse
  private mapToNoteResponse(note: Note): NoteResponse {
    return {
      id: note.getId(),
      text: note.getText(),
      contactId: note.getContactId(),
      userId: note.getUserId(),
    };
  }

  public async getContacts(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      const contacts = await this.contactLogic.getContactsByUserId(userId, page, pageSize);
      const contactResponses = contacts.map(this.mapToContactResponse);

      res.status(200).json(contactResponses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve contacts', error });
    }
  }

  public async getContactById(req: Request<{ contactId: string }>, res: Response) {
    try {
      const { contactId } = req.params;
      const contact = await this.contactLogic.getContactById(+contactId);

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      const contactResponse = this.mapToContactResponse(contact);

      res.status(200).json(contactResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get contact' });
    }
  }

  public async createContact(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.user;
      const contactData = { ...req.body, userId } as Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;
      const newContact = await this.contactLogic.createContact(contactData);

      const contactResponse = this.mapToContactResponse(newContact);

      res.status(201).json(contactResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  }

  public async updateContact(req: Request<{ contactId: string }>, res: Response) {
    try {
      const { contactId } = req.params;
      const updatedContact = await this.contactLogic.updateContact(+contactId, req.body);

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      const contactResponse = this.mapToContactResponse(updatedContact);

      res.status(200).json(contactResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update contact' });
    }
  }

  public async createNoteForContact(req: AuthRequest, res: Response) {
    try {
      const { contactId } = req.params;
      const { userId } = req.user;
      
      const { text } = req.body;
      
      const newNote = await this.noteLogic.createNote(text, +contactId, userId);
      
      const noteResponse = this.mapToNoteResponse(newNote);
      
      res.status(201).json(noteResponse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note for contact', details: error.message });
    }
  }
  
}

export default ContactController;
