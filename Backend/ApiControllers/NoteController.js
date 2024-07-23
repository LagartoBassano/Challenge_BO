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
const NoteTypes_1 = require("../ApiModels/NoteTypes");
class NoteController {
    constructor(noteLogic) {
        this.noteLogic = noteLogic;
    }
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const page = parseInt(req.query.page, 10) || 1;
                const pageSize = parseInt(req.query.pageSize, 10) || 10;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is missing' });
                }
                const notes = yield this.noteLogic.getNotesByUserId(userId, page, pageSize);
                const noteResponses = notes.map(note => new NoteTypes_1.NoteResponse({
                    id: note.getId(),
                    text: note.getText(),
                    contactId: note.getContactId(),
                    userId: note.getUserId(),
                }));
                res.status(200).json(noteResponses);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to retrieve notes', error });
            }
        });
    }
    getNoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { noteId } = req.params;
                const note = yield this.noteLogic.getNoteById(+noteId);
                if (!note) {
                    return res.status(404).json({ message: 'Note not found' });
                }
                const noteResponse = new NoteTypes_1.NoteResponse({
                    id: note.getId(),
                    text: note.getText(),
                    contactId: note.getContactId(),
                    userId: note.getUserId(),
                });
                res.status(200).json(noteResponse);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to retrieve note', error });
            }
        });
    }
}
exports.default = NoteController;
