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
    return new ContactResponse({
      id: contact.getId(),
      name: contact.getName(),
      address: contact.getAddress(),
      email: contact.getEmail(),
      cellphone: contact.getCellphone(),
      profilePicture: contact.getProfilePicture(),
      userId: contact.getUserId(),
      createdAt: contact.getCreatedAt(),
      updatedAt: contact.getUpdatedAt(),
    });
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
      this.validateContactData(req.body);
      if (!req.user || !req.user.userId) {
        return res.status(400).json({ error: 'User ID is missing from request' });
      }
      
      const { userId } = req.user;
      const contactData = new ContactResponse({ ...req.body, userId: userId });
      const newContact = await this.contactLogic.createContact(contactData.toContact());
      const contactResponse = this.mapToContactResponse(newContact);
      res.status(201).json(contactResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Failed to create contact', details: errorMessage });
    }
  }

  public async updateContact(req: Request<{ contactId: string }>, res: Response) {
    try {
      this.validateContactData(req.body);
      const { contactId } = req.params;
      const responseType = new ContactResponse(req.body);
      const updatedContact = await this.contactLogic.updateContact(+contactId, responseType.toContact());
  
      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
  
      const contactResponse = this.mapToContactResponse(updatedContact);
  
      res.status(200).json(contactResponse);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Failed to update contact', details: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
  

  public async createNoteForContact(req: AuthRequest, res: Response) {
    try {
      this.validateNoteData(req.body);
      const { contactId } = req.params;
      const { userId } = req.user;
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Note text is required' });
      }

      const newNote = await this.noteLogic.createNote(text, +contactId, userId);
      const noteResponse = this.mapToNoteResponse(newNote);
      res.status(201).json(noteResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Failed to create note for contact', details: errorMessage });
    }
  }
  
  private validateContactData(body: any): void {
    if (typeof body.name !== 'string') {
      throw new Error('Invalid name. It must be a string.');
    }
    if (typeof body.address !== 'string') {
      throw new Error('Invalid address. It must be a string.');
    }
    if (typeof body.email !== 'string') {
      throw new Error('Invalid email. It must be a string.');
    }
    if (typeof body.cellphone !== 'string') {
      throw new Error('Invalid cellphone. It must be a string.');
    }
    if (body.profilePicture !== undefined && typeof body.profilePicture !== 'string') {
      throw new Error('Invalid profilePicture. It must be a string.');
    }
  }

  private validateNoteData(body: any): void {
    if (typeof body.text !== 'string') {
      throw new Error('Invalid text. It must be a string.');
    }
  }
}

export default ContactController;
