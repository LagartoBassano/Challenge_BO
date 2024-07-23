"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteResponse = void 0;
class NoteResponse {
    constructor(note) {
        this.id = note.id;
        this.text = note.text;
        this.contactId = note.contactId;
        this.userId = note.userId;
    }
}
exports.NoteResponse = NoteResponse;
