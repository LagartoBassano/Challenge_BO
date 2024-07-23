"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactResponse = void 0;
class ContactResponse {
    constructor(contact) {
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
}
exports.ContactResponse = ContactResponse;
