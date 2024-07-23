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
const LoginTypes_1 = require("../ApiModels/LoginTypes");
class LoginController {
    constructor(loginLogic) {
        this.loginLogic = loginLogic;
    }
    createLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, token } = req.body;
                if (!userId || !token) {
                    return res.status(400).json({ error: 'userId and token are required' });
                }
                const newLogin = yield this.loginLogic.createLogin(userId, token);
                const loginResponse = new LoginTypes_1.LoginResponse({
                    id: newLogin.getId(),
                    userId: newLogin.getUserId(),
                    timestamp: newLogin.getTimestamp(),
                    token: newLogin.getToken(),
                });
                res.status(201).json(loginResponse);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                res.status(500).json({ error: 'Failed to create login', details: errorMessage });
            }
        });
    }
}
exports.default = LoginController;
