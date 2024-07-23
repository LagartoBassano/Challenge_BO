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
const PrismaContext_1 = __importDefault(require("./Context/PrismaContext"));
const Note_1 = __importDefault(require("../Domain/Note"));
class NoteRepository {
    constructor() {
        this.prisma = PrismaContext_1.default;
    }
    mapToDomain(prismaNote) {
        return new Note_1.default({
            id: prismaNote.id,
            text: prismaNote.text,
            contactId: prismaNote.contactId,
            userId: prismaNote.userId
        });
    }
    mapToPrisma(note) {
        return {
            text: note.getText(),
            contactId: note.getContactId(),
            userId: note.getUserId()
        };
    }
    createNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdNote = yield this.prisma.note.create({
                data: this.mapToPrisma(note)
            });
            return this.mapToDomain(createdNote);
        });
    }
    getNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaNote = yield this.prisma.note.findUnique({
                where: { id }
            });
            return prismaNote ? this.mapToDomain(prismaNote) : null;
        });
    }
    getNotesByUserId(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const prismaNotes = yield this.prisma.note.findMany({
                where: { userId },
                skip,
                take
            });
            return prismaNotes.map(this.mapToDomain);
        });
    }
    updateNote(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure that data contains the necessary fields for Prisma
            const prismaData = {
                text: data.getText ? data.getText() : '',
                contactId: data.getContactId ? data.getContactId() : 0,
                userId: data.getUserId ? data.getUserId() : 0
            };
            const updatedNote = yield this.prisma.note.update({
                where: { id },
                data: prismaData
            });
            return this.mapToDomain(updatedNote);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedNote = yield this.prisma.note.delete({
                where: { id }
            });
            return this.mapToDomain(deletedNote);
        });
    }
}
exports.default = NoteRepository;
