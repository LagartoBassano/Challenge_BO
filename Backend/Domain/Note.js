"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Note {
    constructor({ id, text, contactId, userId }) {
        this.id = id;
        this.text = text;
        this.contactId = contactId;
        this.userId = userId;
    }
    // Getters
    getId() { return this.id; }
    getText() { return this.text; }
    getContactId() { return this.contactId; }
    getUserId() { return this.userId; }
    toString() {
        return `Note [id=${this.id}, text=${this.text}, contactId=${this.contactId}]`;
    }
}
exports.default = Note;
