"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ContactController {
    constructor(contactLogic, noteLogic) {
        this.contactLogic = contactLogic;
        this.noteLogic = noteLogic;
    }
    mapToContactResponse(contact) {
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
    mapToNoteResponse(note) {
        return {
            id: note.getId(),
            text: note.getText(),
            contactId: note.getContactId(),
            userId: note.getUserId(),
        };
    }
    getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const page = parseInt(req.query.page, 10) || 1;
                const pageSize = parseInt(req.query.pageSize, 10) || 10;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is missing' });
                }
                const contacts = yield this.contactLogic.getContactsByUserId(userId, page, pageSize);
                const contactResponses = contacts.map(this.mapToContactResponse);
                res.status(200).json(contactResponses);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to retrieve contacts', error });
            }
        });
    }
    getContactById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contactId } = req.params;
                const contact = yield this.contactLogic.getContactById(+contactId);
                if (!contact) {
                    return res.status(404).json({ error: 'Contact not found' });
                }
                const contactResponse = this.mapToContactResponse(contact);
                res.status(200).json(contactResponse);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to get contact' });
            }
        });
    }
    createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const contactData = Object.assign(Object.assign({}, req.body), { userId });
                const newContact = yield this.contactLogic.createContact(contactData);
                const contactResponse = this.mapToContactResponse(newContact);
                res.status(201).json(contactResponse);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to create contact' });
            }
        });
    }
    updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contactId } = req.params;
                const updatedContact = yield this.contactLogic.updateContact(+contactId, req.body);
                if (!updatedContact) {
                    return res.status(404).json({ error: 'Contact not found' });
                }
                const contactResponse = this.mapToContactResponse(updatedContact);
                res.status(200).json(contactResponse);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to update contact' });
            }
        });
    }
    createNoteForContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contactId } = req.params;
                const { userId } = req.user;
                const { text } = req.body;
                // Validar que `text` no esté vacío
                if (!text) {
                    return res.status(400).json({ error: 'Note text is required' });
                }
                const newNote = yield this.noteLogic.createNote(text, +contactId, userId);
                const noteResponse = this.mapToNoteResponse(newNote);
                res.status(201).json(noteResponse);
            }
            catch (error) {
                // Manejar el error de forma segura
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                res.status(500).json({ error: 'Failed to create note for contact', details: errorMessage });
            }
        });
    }
}
exports.default = ContactController;
