"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const ContactTypes_1 = require("./ContactTypes");
const NoteTypes_1 = require("./NoteTypes");
const LoginTypes_1 = require("./LoginTypes");
class UserResponse {
    constructor(user) {
        this.id = user.getId();
        this.name = user.getName();
        this.contacts = user.getContacts().map(contact => new ContactTypes_1.ContactResponse({
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
        this.notes = user.getNotes().map(note => new NoteTypes_1.NoteResponse({
            id: note.getId(),
            text: note.getText(),
            contactId: note.getContactId(),
            userId: note.getUserId(),
        }));
        this.logins = user.getLogins().map(login => new LoginTypes_1.LoginResponse({
            id: login.getId(),
            userId: login.getUserId(),
            timestamp: login.getTimestamp(),
            token: login.getToken(),
        }));
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
exports.UserResponse = UserResponse;
