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
const Contact_1 = __importDefault(require("../Domain/Contact"));
const Note_1 = __importDefault(require("../Domain/Note"));
class ContactRepository {
    constructor() {
        this.prisma = PrismaContext_1.default;
    }
    mapToDomain(prismaContact) {
        return new Contact_1.default({
            id: prismaContact.id,
            name: prismaContact.name,
            address: prismaContact.address,
            email: prismaContact.email,
            cellphone: prismaContact.cellphone,
            profilePicture: prismaContact.profilePicture || undefined,
            userId: prismaContact.userId,
            notes: prismaContact.notes.map(note => new Note_1.default({
                id: note.id,
                text: note.text,
                contactId: note.contactId,
                userId: note.userId,
            })),
            createdAt: prismaContact.createdAt,
            updatedAt: prismaContact.updatedAt,
        });
    }
    mapToPrisma(contact) {
        return {
            name: contact.getName(),
            address: contact.getAddress(),
            email: contact.getEmail(),
            cellphone: contact.getCellphone(),
            profilePicture: contact.getProfilePicture() || null,
            userId: contact.getUserId()
        };
    }
    createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdContact = yield this.prisma.contact.create({
                data: this.mapToPrisma(contact)
            });
            return this.mapToDomain(createdContact);
        });
    }
    getContactById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaContact = yield this.prisma.contact.findUnique({
                where: { id },
                include: { notes: true }
            });
            return prismaContact ? this.mapToDomain(prismaContact) : null;
        });
    }
    getContactsByUserId(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const prismaContacts = yield this.prisma.contact.findMany({
                where: { userId },
                skip,
                take,
                include: { notes: true }
            });
            return prismaContacts.map(this.mapToDomain.bind(this));
        });
    }
    updateContact(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaData = {
                name: data.getName ? data.getName() : '',
                address: data.getAddress ? data.getAddress() : '',
                email: data.getEmail ? data.getEmail() : '',
                cellphone: data.getCellphone ? data.getCellphone() : '',
                profilePicture: (data.getProfilePicture ? data.getProfilePicture() : undefined) || null,
                userId: data.getUserId ? data.getUserId() : 0
            };
            const updatedContact = yield this.prisma.contact.update({
                where: { id },
                data: prismaData
            });
            return this.mapToDomain(updatedContact);
        });
    }
    deleteContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedContact = yield this.prisma.contact.delete({
                where: { id }
            });
            return this.mapToDomain(deletedContact);
        });
    }
}
exports.default = ContactRepository;
