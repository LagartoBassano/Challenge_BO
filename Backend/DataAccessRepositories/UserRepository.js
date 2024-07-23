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
const User_1 = __importDefault(require("../Domain/User"));
const Contact_1 = __importDefault(require("../Domain/Contact"));
const Note_1 = __importDefault(require("../Domain/Note"));
const Login_1 = __importDefault(require("../Domain/Login"));
class UserRepository {
    constructor() {
        this.prisma = PrismaContext_1.default;
    }
    mapToDomain(prismaUser) {
        return new User_1.default({
            id: prismaUser.id,
            name: prismaUser.name,
            password: prismaUser.password,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
            contacts: prismaUser.contacts.map(contact => new Contact_1.default({
                id: contact.id,
                name: contact.name,
                address: contact.address,
                email: contact.email,
                cellphone: contact.cellphone,
                profilePicture: contact.profilePicture || '',
                userId: contact.userId,
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt
            })),
            notes: prismaUser.notes.map(note => new Note_1.default({
                id: note.id,
                text: note.text,
                contactId: note.contactId,
                userId: note.userId
            })),
            logins: prismaUser.logins.map(login => new Login_1.default({
                id: login.id,
                userId: login.userId,
                timestamp: login.timestamp,
                token: login.token || ''
            }))
        });
    }
    mapToPrisma(user) {
        var _a, _b;
        return {
            name: (_a = user.getName()) !== null && _a !== void 0 ? _a : '',
            password: (_b = user.getPassword()) !== null && _b !== void 0 ? _b : ''
        };
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.prisma.user.create({
                data: this.mapToPrisma(user),
                include: {
                    contacts: true,
                    notes: true,
                    logins: true
                }
            });
            return this.mapToDomain(createdUser);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.user.findUnique({
                where: { id },
                include: {
                    contacts: true,
                    notes: true,
                    logins: true
                }
            });
            return prismaUser ? this.mapToDomain(prismaUser) : null;
        });
    }
    getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.user.findUnique({
                where: { name },
                include: {
                    contacts: true,
                    notes: true,
                    logins: true
                }
            });
            return prismaUser ? this.mapToDomain(prismaUser) : null;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.user.update({
                where: { id },
                data: {
                    name: data.getName ? data.getName() : undefined,
                    password: data.getPassword ? data.getPassword() : undefined
                },
                include: {
                    contacts: true,
                    notes: true,
                    logins: true
                }
            });
            return this.mapToDomain(prismaUser);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.user.delete({
                where: { id },
                include: {
                    contacts: true,
                    notes: true,
                    logins: true
                }
            });
            return this.mapToDomain(prismaUser);
        });
    }
}
exports.default = UserRepository;
