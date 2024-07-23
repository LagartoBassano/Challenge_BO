import { Request, Response } from 'express';
import IContactLogic from '../LogicInterfaces/IContactLogic';
import INoteLogic from '../LogicInterfaces/INoteLogic';
import { ContactRequest, ContactResponse } from '../ApiModels/ContactTypes';
import { NoteRequest, NoteResponse } from '../ApiModels/NoteTypes';

class ContactController {
  private contactLogic: IContactLogic;
  private noteLogic: INoteLogic;

  constructor(contactLogic: IContactLogic, noteLogic: INoteLogic) {
    this.contactLogic = contactLogic;
    this.noteLogic = noteLogic;
  }

   async getContacts(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing' });
      }

      const contacts = await this.contactLogic.getContactsByUserId(userId, page, pageSize);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve contacts', error });
    }
  }

  getContactById = async (req: ContactRequest, res: ContactResponse) => {
    try {
      const { contactId } = req.params;
      const contact = await this.contactLogic.getContactById(+contactId);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get contact' });
    }
  };

  createContact = async (req: ContactRequest, res: ContactResponse) => {
    try {
      const { userId } = req.user;
      const contactData = { ...req.body, userId };
      const newContact = await this.contactLogic.createContact(contactData);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  };

  updateContact = async (req: ContactRequest, res: ContactResponse) => {
    try {
      const { contactId } = req.params;
      const updatedContact = await this.contactLogic.updateContact(+contactId, req.body);
      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update contact' });
    }
  };

  createNoteForContact = async (req: NoteRequest, res: NoteResponse) => {
    try {
      const { contactId } = req.params;
      const { userId } = req.user;
      const noteData = { ...req.body }
      const newNote = await this.noteLogic.createNote(noteData, +contactId, userId);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note for contact' });
    }
  };
}

export default ContactController;
