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
const Login_1 = __importDefault(require("../Domain/Login"));
class LoginRepository {
    constructor() {
        this.prisma = PrismaContext_1.default;
    }
    mapToDomain(prismaLogin) {
        return new Login_1.default({
            id: prismaLogin.id,
            userId: prismaLogin.userId,
            timestamp: prismaLogin.timestamp,
            token: prismaLogin.token || ''
        });
    }
    mapToPrisma(login) {
        var _a;
        return {
            userId: login.getUserId(),
            token: (_a = login.getToken()) !== null && _a !== void 0 ? _a : ''
        };
    }
    createLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdLogin = yield this.prisma.login.create({
                data: this.mapToPrisma(login)
            });
            return this.mapToDomain(createdLogin);
        });
    }
    getLoginById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaLogin = yield this.prisma.login.findUnique({
                where: { id }
            });
            return prismaLogin ? this.mapToDomain(prismaLogin) : null;
        });
    }
    getLoginsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaLogins = yield this.prisma.login.findMany({
                where: { userId }
            });
            return prismaLogins.map(this.mapToDomain);
        });
    }
    deleteLogin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedLogin = yield this.prisma.login.delete({
                where: { id }
            });
            return this.mapToDomain(deletedLogin);
        });
    }
}
exports.default = LoginRepository;
