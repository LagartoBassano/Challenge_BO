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
const UserTypes_1 = require("../ApiModels/UserTypes");
class UserController {
    constructor(userLogic) {
        this.userLogic = userLogic;
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is missing' });
                }
                const user = yield this.userLogic.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const userResponse = new UserTypes_1.UserResponse(user);
                res.status(200).json(userResponse);
            }
            catch (error) {
                console.error('Failed to retrieve user:', error);
                res.status(500).json({ message: 'Failed to retrieve user', error });
            }
        });
    }
}
exports.default = UserController;
