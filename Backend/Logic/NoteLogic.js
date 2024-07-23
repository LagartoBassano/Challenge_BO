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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = __importDefault(require("../Domain/Note"));
class NoteLogic {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    createNote(text, contactId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = new Note_1.default({
                id: 0,
                text,
                contactId,
                userId
            });
            return this.noteRepository.createNote(note);
        });
    }
    getNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.noteRepository.getNoteById(id);
        });
    }
    getNotesByUserId(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.noteRepository.getNotesByUserId(userId, page, pageSize);
        });
    }
    updateNote(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.noteRepository.updateNote(id, data);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.noteRepository.deleteNote(id);
        });
    }
}
exports.default = NoteLogic;
